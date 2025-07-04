import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Calendar.module.scss";
import ArrowLeftCalendar from "../../../public/assets/svg/ArrowLeftCalendar";
import ArrowRightCalendar from "../../../public/assets/svg/ArrowRightCalendar";

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  closeCalendar: () => void;
}

export default function Calendar({ selectedDate, onSelectDate, closeCalendar }: CalendarProps) {
  const [displayedMonth, setDisplayedMonth] = useState(selectedDate.getMonth());
  const [displayedYear, setDisplayedYear] = useState(selectedDate.getFullYear());
  const [formattedWeek, setFormattedWeek] = useState<string>("");
  const calendarRef = useRef<HTMLDivElement>(null);

  const today = new Date();

  const getStartOfWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = day === 0 ? -6 : 1 - day; 
    startOfWeek.setDate(startOfWeek.getDate() + diff);
    return startOfWeek;
  };

  const getDaysInMonth = () => {
    const startOfMonth = new Date(displayedYear, displayedMonth, 1);
    const endOfMonth = new Date(displayedYear, displayedMonth + 1, 0);
    const days: Date[] = [];

    let firstDay = getStartOfWeek(startOfMonth);
    while (firstDay <= endOfMonth) {
      days.push(new Date(firstDay));
      firstDay.setDate(firstDay.getDate() + 1); 
    }

    return days;
  };

  const isSelectableDay = (day: Date) => {
    return day >= today;
  };

  const getWeekNumber = (date: Date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((date.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
    return `${date.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    setFormattedWeek(getWeekNumber(selectedDate));
  }, [selectedDate]);

  const changeMonth = useCallback((direction: number) => {
    let newMonth = displayedMonth + direction;

    if (newMonth < today.getMonth() && displayedYear === today.getFullYear()) {
      return; 
    }

    if (newMonth > 11) {
      newMonth = 0;
      setDisplayedYear(displayedYear + 1);
    } else if (newMonth < 0) {
      newMonth = 11;
      setDisplayedYear(displayedYear - 1);
    }

    setDisplayedMonth(newMonth);
  }, [displayedMonth, displayedYear]);
  interface SpanProps {
    onClick: () => void,
    className: string,
    icon: JSX.Element
  }
  const spans: SpanProps[] = [
    {
      onClick: () => changeMonth(-1),
      className: `${styles.prev} ${displayedYear === today.getFullYear() && displayedMonth === today.getMonth() ? styles.disabledArrow : ""}`,
      icon: <ArrowLeftCalendar />
    },
    {
      onClick: () => changeMonth(1),
      className: styles.next,
      icon: <ArrowRightCalendar />
    },
  ]
  const weekDays: string[] = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ]
  return (
    <div className={styles.calendarContainer} ref={calendarRef}>
      <div className={styles.calendarHeader}>
        <span className={styles.monthAndYear}>
          {new Date(displayedYear, displayedMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <div className={styles.spansCalendar}>
          {spans.map((item:any, index:number) => {
            return <span key={index} onClick={item.onClick} className={item.className}>
              {item.icon}
            </span>
          })}
        </div>
      </div>
      <div className={styles.calendarGrid}>
        {weekDays.map((day: string) => (
          <div key={day} className={styles.weekday}>{day}</div>
        ))}
        {getDaysInMonth().map((day: any, index: number) => {
          const isDaySelectable = isSelectableDay(day);

          return (
            <div
              key={index}
              onClick={() => {
                if (isDaySelectable) {
                  onSelectDate(day);
                  closeCalendar(); 
                }
              }}
              className={`${styles.day} ${!isDaySelectable ? styles.disabledDay : ""}`}
            >
              <span>{day.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
