"use client";
import { useState, useEffect } from "react";
import styles from "./Hamburger.module.scss";
import Link from "next/link";
import { icons } from "../homeHeader/HomeHeader";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const ul: string[] = ["Destination", "Offer", "Tour", "Blog"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; 
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div>
      <button
        className={`${styles.hamburgerButton} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
      {Array.from({ length: 3 }).map((_, index) => (
        <span key={index} className={styles.hamburgerLine}></span>
      ))}
      </button>

      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.ul}>
          {ul.map((item: string, index: number) => {
            return (
              <li key={index}>
                <Link href="/">{item}</Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.icons}>
          {icons.map((item: any, index: number) => {
            return (
              <Link key={index} href={item.href} className={item.className}>
                {item.svg}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
