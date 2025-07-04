"use client";
import { useState } from "react";
import styles from "./Accordion.module.scss"
import UserAccordion from "../../../public/assets/svg/UserAccordion";
import GreenIconAccardion from "../../../public/assets/svg/greenIconAccordion";
import HeadPhone from "../../../public/assets/svg/Headphone";
export default function Accordion () {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    interface MenuItemsProps {
      title: string,
      content: string,
      className: string,
      svg: JSX.Element
    }

    const menuItems: MenuItemsProps[] = [
      {
        title: "Best Travel Guide Always For Your Services",
        content: "Travel has helped us to understandsa the meaning of life and it has helped us become better people. Each time we travel, we see the world with new eyes. Travel has helped us to understand the meaning of life",
        className: styles.userIcon,
        svg: <UserAccordion/>
      },
      {
        title: "World Class Services Provide For You",
        content: "Travel has helped us to understandsa the meaning of life and it has helped us become better people. Each time we travel, we see the world with new eyes. Travel has helped us to understand the meaning of life",
        className: styles.greenIcon,
        svg: <GreenIconAccardion/>
      },
      {
        title: "24/7 Strong Customer Support",
        content: "Travel has helped us to understandsa the meaning of life and it has helped us become better people. Each time we travel, we see the world with new eyes. Travel has helped us to understand the meaning of life",
        className: styles.headPhone,
        svg: <HeadPhone/>
      },
    ];
    return (
        <div className={styles.accordionContainer}>
        {menuItems.map((item:any, index: number) => (
          <div className={styles.accordion} key={index}>
            <div className={styles.headAccordion} onClick={() => handleToggle(index)} >
            <span className={`${item.className} ${styles.icon}`}>{item.svg}</span>
            <button
              className={`${styles.menuButton} ${
                openIndex === index ? styles.open : ""
              }`}
            >
              <h4>{item.title}</h4>
            </button>
            </div>

            <div
              className={styles.content}
              style={{
                maxHeight: openIndex === index ? "200px" : "0", 
                padding: openIndex === index ? "10px 20px" : "0 20px", 
              }}
            >
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    )
}