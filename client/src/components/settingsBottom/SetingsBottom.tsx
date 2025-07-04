"use client"
import { useState } from "react";
import styles from "./SettingsBottom.module.scss";
import ProfileImg from "../../../public/assets/png/profileImg.png"
import Image from "next/image";
import SettingsAccordion from "../settingsAccordion/SettingsAccordion";
export const p: string[] = [
    "vinijr@gmail.com", "+374 77 77 77 77", "São Gonçalo (Río de Janeiro, Brazil)", "Подписки - 0", "Подписчики - 0"
]
export default function SettingsBottom() {
    const [profilePhoto, setProfilePhoto] = useState(ProfileImg.src);
  
    return (
      <div className={styles.settingsParent}>
        <div className={styles.infoAboutProfile}>
          <Image src={profilePhoto} alt="ProfileImg" width={162} height={162} />
          <div className={styles.textsInfo}>
            <h2>Vinicius JR</h2>
            <div className={styles.pDiv}>
              {p.map((item: string, index: number) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>
        <SettingsAccordion onPhotoChange={setProfilePhoto} />
      </div>
    );
  }
  