"use client";
import React, { useState } from "react";
import styles from "./AuthSlider.module.scss";
import Image from "next/image";
import PinkAuthor from "../../../public/assets/png/pinkAuthor.png";
import RedAuthor from "../../../public/assets/png/redAuthor.png";
import PurpleAuthor from "../../../public/assets/png/purpleAuthor.png";
import YellowAuthor from "../../../public/assets/png/yellowAuthor.png";
import BlueAuthor from "../../../public/assets/png/blueAuthor.png";
import YellowManAuthor from "../../../public/assets/png/yellowManAuthor.png";
import GreenAuthor from "../../../public/assets/png/greenAuthor.png";
interface SliderProps {
  slides: JSX.Element[];
}
interface AuthorsProps {
  src: string;
  alt: string;
  id: number
}
const leftAuthors: AuthorsProps[] = [
  { src: PinkAuthor.src, alt: "PinkAuthor", id: 1 },
  { src: RedAuthor.src, alt: "RedAuthor", id: 2 },
  { src: PurpleAuthor.src, alt: "PurpleAuthor", id: 3 },
  { src: YellowAuthor.src, alt: "YellowAuthor", id: 4 },
];

const rightAuthors: AuthorsProps[] = [
  { src: BlueAuthor.src, alt: "BlueAuthor", id: 6 },
  { src: YellowManAuthor.src, alt: "YellowManAuthor", id: 5 },
  { src: GreenAuthor.src, alt: "GreenAuthor", id: 7 },
];
const AuthSlider: React.FC<SliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleDots = 4;
  const startIndex = Math.max(0, currentIndex - Math.floor(visibleDots / 2));
  const endIndex = Math.min(slides.length, startIndex + visibleDots);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleImageClick = (id: number) => {
    setCurrentIndex(id);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.leftAuthors}>
        {leftAuthors.map((author) => (
          <Image
            key={author.id}
            src={author.src}
            alt={author.alt}
            width={125}
            height={125}
            onClick={() => handleImageClick(author.id)}
          />
        ))}
      </div>
      <div className={styles.rightAuthors}>
        {rightAuthors.map((author) => (
          <Image
            key={author.id}
            src={author.src}
            alt={author.alt}
            width={125}
            height={125}
            onClick={() => handleImageClick(author.id)}
          />
        ))}
      </div>
      <div className={styles.sliderTrackWrapper}>
        <div
          className={styles.sliderTrack}
          style={{
            transform: `translateX(-${currentIndex * 690}px)`,
          }}
        >
          {slides.map((slide: any, index: number) => (
            <div key={index} className={styles.sliderItem}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dots}>
        {slides.slice(startIndex, endIndex).map((_, index) => {
          const actualIndex = startIndex + index;
          return (
            <button
              key={actualIndex}
              className={`${styles.dot} ${actualIndex === currentIndex ? styles.active : ""
                }`}
              onClick={() => handleDotClick(actualIndex)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AuthSlider;
