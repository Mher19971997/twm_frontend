"use client";
import styles from "./HomeHeader.module.scss";
import Container from "../basic/container/Container";
import Logo from "../../../public/assets/svg/Logo";
import Link from "next/link";
import { JSX, useState } from "react";
import Language from "../../../public/assets/svg/Language";
import User from "../../../public/assets/svg/User";
interface iconsProps {
  svg: JSX.Element;
  className: string;
  href: string;
}

const token = useCookieValue("authToken");

export const icons: iconsProps[] = [
  {
    svg: <LocaleSwitcher />, className: styles.language, href: "/"
  },
  { svg: <User />, className: styles.user, href: token ? "/profile" : "/auth" },
  { svg: <Search />, className: styles.search, href: "/" },
];
import Search from "../../../public/assets/svg/Search";
import Menu from "../hamburger/Hamburger";
import { useCookieValue } from "@/helpers/getCookieInfo";
import LocaleSwitcher from "../languageSwitcher/LanguageSwitcher";
import { useTranslations } from "next-intl";
export default function HomeHeader() {
  const t = useTranslations('Home');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ulMenu: { text: string; href: string }[] = [
    { text: t("destination"), href: "/" },
    { text: t("offer"), href: "/offer" },
    { text: t("tour"), href: "/tours" },
    { text: t("blog"), href: "/" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <Container>
      <div className={styles.responsiveNav}>
        <nav className={styles.nav}>
          <div className={styles.logoBlock}>
            <Link href="/">
              <Logo fill="white" fillText="white" />
            </Link>
          </div>
          <ul>
            {ulMenu.map((item: any, index: number) => {
              return (
                <li key={index}>
                  <Link href={item.href}>{item.text}</Link>
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
        </nav>
        <Menu />
      </div>
    </Container>
  );
}
