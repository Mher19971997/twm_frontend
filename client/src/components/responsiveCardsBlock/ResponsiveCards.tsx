"use client"
import React, { useState} from "react";
import styles from "./ResponsiveCards.module.scss";
import { cards } from "../cardsBlock/Cards";
import Card from "../basic/card/Card";
const ResponsiveCardsBlock = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  return (
    <div className={styles.slider}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {cards.map((item: any, index: number) => {
            return <div className={styles.slide} key={index}>
                <Card img={item.img} title={item.title} alt={item.title} />
            </div>
        })}
      </div>

      <div className={styles.navigation}>
        {Array.from({ length: totalSlides }).map((_, index: number) => (
          <button
            key={index}
            className={`${styles.navButton} ${
              currentSlide === index ? styles.active : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveCardsBlock;