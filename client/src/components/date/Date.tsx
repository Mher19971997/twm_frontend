import { useState, useEffect, useRef } from "react";
import styles from "./Date.module.scss";
import Calendar from "../calendar/Calendar";
import CalendarIcon from "../../../public/assets/svg/CalendarIcon";

const getStartOfWeek = (date: Date) => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  startOfWeek.setDate(startOfWeek.getDate() + diff);
  return startOfWeek;
};

const formatWeek = (date: Date) => {
  const startOfWeek = getStartOfWeek(date);
  return startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [calendarPosition, setCalendarPosition] = useState<"top" | "bottom">("bottom");
  const datePickerRef = useRef<HTMLDivElement>(null);
  const calendarWrapperRef = useRef<HTMLDivElement>(null);

  const formattedDate = formatWeek(selectedDate);

  const closeCalendar = () => {
    setCalendarOpen(false);
  };

  const toggleCalendar = () => setCalendarOpen((prev) => !prev);

  const updateCalendarPosition = () => {
    if (!datePickerRef.current || !calendarWrapperRef.current) return;

    const rect = datePickerRef.current.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    setCalendarPosition(spaceBelow >= 350 || spaceAbove < 350 ? "bottom" : "top");
  };

  const handleScroll = () => {
    if (isCalendarOpen) {
      updateCalendarPosition();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isCalendarOpen]);

  useEffect(() => {
    if (isCalendarOpen) {
      updateCalendarPosition();
    }
  }, [isCalendarOpen]);

  return (
    <div className={styles.datePicker} ref={datePickerRef}>
      <h2>Check In</h2>
      <div className={styles.dateDisplay} onClick={toggleCalendar}>
        <span>{formattedDate}</span>
        <CalendarIcon />
      </div>

      {isCalendarOpen && (
        <div
          ref={calendarWrapperRef}
          className={`${styles.calendarWrapper} ${calendarPosition === "bottom" ? styles.bottom : styles.top}`}
        >
          <Calendar closeCalendar={closeCalendar} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </div>
      )}
    </div>
  );
}
