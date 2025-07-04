"use client";
import styles from "./HeadLogin.module.scss";
import LinearLogo from "../../../public/assets/svg/LinearLogoHome";
import Container from "../basic/container/Container";
import Link from "next/link";

export default function HeadLogin({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  interface ButtonsProps {
    className: string,
    onClick: () => void,
    text: string
  }
  const buttons: ButtonsProps[] = [
    {
      className: styles.activeButton,
      onClick: () => setIsLogin(true),
      text: "Log In"
    },
    {
      className: styles.defaultButton,
      onClick: () => setIsLogin(false),
      text: "Register"
    },
  ]
  return (
    <Container>
      <div className={styles.parentDiv}>
        <div className={styles.contentHeadLogin}>
          <div className={styles.logo}>
            <Link href="/">
              <LinearLogo />
            </Link>
          </div>
          <div className={styles.btnsHead}>
            {buttons.map((item: any,index:number) => {
                return <button className={item.className} onClick={item.onClick} key={index}>{item.text}</button>
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
