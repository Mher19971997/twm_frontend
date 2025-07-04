"use client";
import styles from "./Contacts.module.scss";
import User from "../../../../public/assets/png/firstUserRequest.png";
import { useState } from "react";
import Image from "next/image";

export default function Contacts() {
  const [currentSection, setCurrentSection] = useState<"users" | "pages" | "groups">("users");

  interface Users {
    image: string;
    alt: string;
    userName: string;
    icon: JSX.Element;
  }

  type Pages = {
    groupText: string;
    userName: string;
    className: string;
    icon: JSX.Element;
  }

  type Groups = Pages;

  const users: Users[] = [
    {
      image: User.src,
      alt: "User",
      userName: "Hurin Seary",
      icon: <div className={styles.iconOnline}></div>,
    },
  ];

  const pages: Pages[] = [
    {
      groupText: "UD",
      userName: "Armany Seary",
      className: styles.firstGroup,
      icon: <div className={styles.iconOnline}></div>,
    },
  ];

  const groups: Groups[] = [
    {
      groupText: "UD",
      userName: "Studio Express",
      className: styles.firstGroup,
      icon: (
        <div className={styles.lastOnline}>
          <p>2 min</p>
        </div>
      ),
    },
  ];

  const switchSection = (section: "users" | "pages" | "groups") =>
    setCurrentSection(section);

  const getCurrentData = () => {
    switch (currentSection) {
      case "pages":
        return pages;
      case "groups":
        return groups;
      default:
        return users;
    }
  };

  const btns: { click: () => void; text: string }[] = [
    { click: () => switchSection("users"), text: " Users" },
    { click: () => switchSection("groups"), text: "Groups" },
    { click: () => switchSection("pages"), text: "Pages" },
  ];

  return (
    <div className={styles.contactsList}>
      <div className={styles.sectionButtons}>
        {btns.map((item: any, index: number) => (
          <button key={index} onClick={item.click}>
            <p>{item.text}</p>
          </button>
        ))}
      </div>
      <div className={styles.users}>
        {getCurrentData().map((item: any, index: number) => {
          if ("image" in item) {
            return (
              <div className={styles.contact} key={index}>
                <div className={styles.userAndName}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={35}
                    height={35}
                  />
                  <h4>{item.userName}</h4>
                </div>
                {item.icon}
              </div>
            );
          } else {
            return (
              <div className={styles.contact} key={index}>
                <div className={styles.userAndName}>
                  <div
                    className={`${styles.groupAvatar} ${item.className}`}
                  >
                    <p>{item.groupText}</p>
                  </div>
                  <h4>{item.userName}</h4>
                </div>
                {item.icon}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
