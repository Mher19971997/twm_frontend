"use client";
import styles from "./HeadRegister.module.scss";
import Container from "../basic/container/Container";
import Link from "next/link";
import LinearLogo from "../../../public/assets/svg/LinearLogoHome";
export default function HeadRegister({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  interface ButtonsProps {
    className: string,
    onClick: () => void,
    text: string
  }
  const buttons: ButtonsProps[] = [
    {
      className: styles.defaultButton,
      onClick: () => setIsLogin(true),
      text: "Log In"
    },
    {
      className: styles.activeButton,
      onClick: () => setIsLogin(false),
      text: "Register"
    },
  ]
    return (
      <Container>
        <div className={styles.contentHeadRegister}>
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
      </Container>
    );
  }