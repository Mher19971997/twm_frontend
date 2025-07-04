import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import ArrowDownIcon from "../../../public/assets/svg/ArrowDownIcon";

export default function Dropdown() {
  const [selected, setSelected] = useState("Arab Egypt");
  const [options, setOptions] = useState([
    "Paris", "Erevan", "Moscow", "London", "New York", "Tokyo", "Berlin", "Dubai"
  ]);
  const [isOpen, setIsOpen] = useState(false); 
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleSelect = (index: number) => {
    const newOptions = [...options];
    const previousSelected = selected;
  
    setSelected(newOptions[index]);
    newOptions[index] = previousSelected;
    setOptions(newOptions);
  
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      } else if (listRef.current && listRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
  
    window.addEventListener("click", handleClick);
  
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const adjustDropdownPosition = () => {
    if (dropdownRef.current && listRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const listHeight = listRef.current.scrollHeight;
      const spaceBelow = window.innerHeight - dropdownRect.bottom;
      const spaceAbove = dropdownRect.top;

      if (spaceBelow >= listHeight) {
        listRef.current.style.top = "10px";
        listRef.current.style.bottom = "auto";
      } else if (spaceAbove >= listHeight) {
        listRef.current.style.top = "auto";
        listRef.current.style.bottom = "40px";
      } else {
        listRef.current.style.top = "10px";
        listRef.current.style.bottom = "auto";
      }
    }
  };

  useEffect(() => {
    adjustDropdownPosition();
  }, [isOpen]); 

  return (
    <div className={styles.dropDown} ref={dropdownRef}>
      <h2>Destinations</h2>
      <div className={styles.details} onClick={() => setIsOpen((prev) => !prev)}>
        <summary className={styles.summary}>
          {selected}
          <ArrowDownIcon />
        </summary>
        {isOpen && (
          <ul ref={listRef} className={styles.list}>
            {options.map((option: string, index: number) => (
              <li key={index} onClick={() => handleSelect(index)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
