"use client";
import { useState } from "react";
import styles from "./SettingsAccordion.module.scss";
import SettingsHome from "../../../public/assets/svg/SettingsHome";
import CardSettings from "../../../public/assets/svg/CardSettings";
import PasswordSettings from "../../../public/assets/svg/PasswordSettings";
import HelpSettings from "../../../public/assets/svg/HelpSettings";
import LogOut from "../../../public/assets/svg/LogOut";
import AccordionIconSettings from "../../../public/assets/svg/AccordionIconSettings";
import Link from "next/link";
import ContentFirstAccordion from "../contentFirstAccordion/ContentFirstAccordion";
import { destroyCookie } from "nookies";
export default function SettingsAccordion({ onPhotoChange }: { onPhotoChange: (url: string) => void }) {

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleLogOut = () => {
        destroyCookie(null, "authToken");
        destroyCookie(null, "refreshToken");
        destroyCookie(null, "userType");
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    };
    const [rightAccount, setRightAccount] = useState<string[]>([]);

    const blockPerson = (person: string) => {
        setRightAccount((prevRightAccount) => {
            if (!prevRightAccount.includes(person)) {
                return [...prevRightAccount, person];
            }
            return prevRightAccount;
        });
    };
    interface MenuItemsProps {
        title: string,
        content: string | JSX.Element,
        className: string,
        svg: JSX.Element
    }
    const menuItems: MenuItemsProps[] = [
        {
            title: "Account Information",
            content: <ContentFirstAccordion onPhotoChange={onPhotoChange} />,
            className: styles.userIcon,
            svg: <SettingsHome />,
        },
        {
            title: "My Cards",
            content: "Content",
            className: styles.greenIcon,
            svg: <CardSettings />,
        },
        {
            title: "Password",
            content:
                "Travel has helped us to understand the meaning of life and it has helped us become better people. Each time we travel, we see the world with new eyes.",
            className: styles.headPhone,
            svg: <PasswordSettings />,
        },
        {
            title: "Help",
            content:
                "Travel has helped us to understand the meaning of life and it has helped us become better people. Each time we travel, we see the world with new eyes.",
            className: styles.headPhone,
            svg: <HelpSettings />,
        },
        {
            title: "Logout",
            content: (
                <Link href="/" passHref>
                    <button onClick={handleLogOut} className={styles.logOut}>Log Out</button>
                </Link>
            ),
            className: styles.headPhone,
            svg: <LogOut />,
        },
    ];

    return (
        <div className={styles.accordionContainer}>
            {menuItems.map((item: any, index: number) => (
                <div className={styles.accordion} key={index}>
                    <div
                        className={styles.headAccordion}
                        onClick={() => handleToggle(index)}
                    >
                        <button
                            className={`${styles.menuButton} ${openIndex === index ? styles.open : ""
                                }`}
                        >
                            <div className={styles.textAndIcon}>
                                <div className={styles.svgWithBackground}>{item.svg}</div>
                                <h4>{item.title}</h4>
                            </div>
                            <div className={styles.accordionIconSettings}>
                                <AccordionIconSettings />
                            </div>
                        </button>
                    </div>

                    <div
                        className={styles.content}
                        style={{
                            maxHeight: openIndex === index ? "200px" : "0",
                            padding: openIndex === index ? "10px 20px" : "0 20px",
                        }}
                    >
                        <div>{item.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
