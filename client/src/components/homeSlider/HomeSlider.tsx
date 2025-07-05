"use client";
import { useState, useRef, useCallback } from "react";
import styles from "./HomeSlider.module.scss";
import Container from "../basic/container/Container";
import ArrowLeftHome from "../../../public/assets/svg/ArrowLeft";
import ArrowRightHome from "../../../public/assets/svg/ArrowRight";
import EgyptLandscape from "../../../public/assets/png/egyptLandscape.png";
import SecondImage from "../../../public/assets/png/bg.png";
import ThirdImg from "../../../public/assets/png/20200125110231_Priroda_10-344.jpg";
import ForImg from "../../../public/assets/png/priroda.jpg";
import FiveImg from "../../../public/assets/png/www.fonstola.ru.1687828675.2414.jpg";
import SixImg from "../../../public/assets/png/gallery-3.jpg";
import Discover from "../discover/Discover";
import HomeHeader from "../homeHeader/HomeHeader";

export default function HomeSlider() {
  const slides = [
    { id: "slide_1", content: "It’s Time To Explore The World", background: EgyptLandscape.src },
    { id: "slide_2", content: "It’s Time To Explore The World", background: SecondImage.src },
    { id: "slide_3", content: "It’s Time To Explore The World", background: ThirdImg.src },
    { id: "slide_4", content: "It’s Time To Explore The World", background: ForImg.src },
    { id: "slide_5", content: "It’s Time To Explore The World", background: FiveImg.src },
    { id: "slide_6", content: "It’s Time To Explore The World", background: SixImg.src },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState<string>(slides[0].background);
  const [isLoaded, setIsLoaded] = useState(true);
  const isTransitioning = useRef(false);

  const changeSlide = useCallback(
    (direction: "next" | "prev") => {
      if (isTransitioning.current) return;

      isTransitioning.current = true;
      setIsLoaded(false);

      const nextIndex =
        direction === "next"
          ? (activeSlide + 1) % slides.length
          : (activeSlide - 1 + slides.length) % slides.length;

      const img = new Image();
      img.src = slides[nextIndex].background;
      img.onload = () => {
        setBackgroundImage(slides[nextIndex].background);
        setActiveSlide(nextIndex);

        setTimeout(() => {
          setIsLoaded(true);
          isTransitioning.current = false;
        }, 1200);
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${slides[nextIndex]?.background}`);
        isTransitioning.current = false;
      };
    },
    [activeSlide, slides]
  );

  return (
    <div
      className={`${styles.slider} ${isLoaded ? styles.loaded : styles.loading}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <HomeHeader />
      <div className={styles.content}>
        <p className={styles.text}>{slides[activeSlide].content}</p>
      </div>

      <Container>
        <div className={styles.arrowAndDiscover}>
          <div className={styles.arrowParentDiv}>
            <div className={styles.arrows}>
              <button
                className={styles.prev}
                onClick={() => changeSlide("prev")}
                aria-label="Previous slide"
                disabled={isTransitioning.current}
              >
                <ArrowLeftHome className={styles.arrow} />
              </button>
              <button
                className={styles.next}
                onClick={() => changeSlide("next")}
                aria-label="Next slide"
                disabled={isTransitioning.current}
              >
                <ArrowRightHome className={styles.arrow} />
              </button>
            </div>
            <div className={styles.line}></div>
            <h2>{(activeSlide + 1).toString().padStart(2, "0")}</h2>
          </div>
          <div className={styles.discover}>
            <Discover />
          </div>
        </div>
      </Container>
    </div>
  );
}
