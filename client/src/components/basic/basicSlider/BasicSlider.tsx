"use client";
import React, { useState, useEffect, useMemo} from "react";
import styles from "./BasicSlider.module.scss";
import ArrowRightBasicSlider from "../../../../public/assets/svg/ArrowRightBasicSlider";
import ArrowLeftBasicSlider from "../../../../public/assets/svg/ArrowLeftBasicSlider";
import Cuba from "../../../../public/assets/png/Cuba-city 1.png";
import Parise from "../../../../public/assets/png/Paris-City.png";
import Japan from "../../../../public/assets/png/japan.png";
import Image from "next/image";
const slideElements = [
  { src: Cuba.src, content: "Cuba City" },
  { src: Parise.src, content: "Paris" },
  { src: Japan.src, content: "Japan" },
  { src: Cuba.src, content: "Cuba City" },
  { src: Parise.src, content: "Paris" },
  { src: Japan.src, content: "Cuba City" },
  { src: Cuba.src, content: "Cuba City" },
];

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [slideWidth, setSlideWidth] = useState(0);
  const [gap, setGap] = useState(104);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getTransformValue = () => {
    if (typeof window === "undefined") {
      return "translateX(0px)";
    }
    const width = window.innerWidth;
    if (width < 413) {
      return `translateX(-${currentIndex * slideWidth * 1.45}px)`;
    }
    return `translateX(-${currentIndex * (slideWidth + gap)}px)`;
  };

  const transformValue = useMemo(() => getTransformValue(), [currentIndex, slideWidth, gap]);

  useEffect(() => {
    const updateGap = () => {
      const width = window.innerWidth;
      if (width <= 830) {
        setGap(105);
      } else {
        setGap(104);
      }
    };

    updateGap();
    window.addEventListener("resize", updateGap);

    return () => {
      window.removeEventListener("resize", updateGap);
    };
  }, []);

  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width <= 830) {
      setSlidesPerView(1);
    } 
    else if (width <= 1019) {
      setSlidesPerView(2);
    } 
    else if (width <= 1401) {
      setSlidesPerView(1);
    } 
    else if (width <= 1866) {
      setSlidesPerView(2);
    } 
    else {
      setSlidesPerView(3);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  useEffect(() => {
    const updateSlideWidth = () => {
      const sliderContainer = document.querySelector(`.${styles.sliderWrapper}`);
      if (sliderContainer) {
        const containerWidth = (sliderContainer as HTMLElement).offsetWidth;
        setSlideWidth((containerWidth - gap * (slidesPerView - 1)) / slidesPerView);
      }
    };

    updateSlideWidth();
    window.addEventListener("resize", updateSlideWidth);

    return () => {
      window.removeEventListener("resize", updateSlideWidth);
    };
  }, [gap, slidesPerView]);

  const totalSlides = slideElements.length;

  const nextSlide = () => {
    if (currentIndex < totalSlides - slidesPerView) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };
  interface ArrowsProps {
    className: string,
    onClick: any,
    disabled: any,
    icon: JSX.Element
  }
  const arrows: ArrowsProps[] = [
    {
      className: styles.left,
      onClick: prevSlide,
      disabled: currentIndex === 0,
      icon: <ArrowLeftBasicSlider />
    },
    {
      className: styles.right,
      onClick: nextSlide,
      disabled: currentIndex >= totalSlides - slidesPerView,
      icon: <ArrowRightBasicSlider />
    },
  ]
  return (
    <div className={styles.slider}>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.sliderItems}
          style={{
            transform: isClient ? transformValue : "translateX(0px)",
            transition: isClient ? "transform 0.5s ease" : "none",
          }}
        >
          {slideElements.map((slide: any, index: number) => (
            <div
              key={index}
              className={styles.sliderItem}
              style={{
                width: `${slideWidth}px`,
                marginRight: index < totalSlides - 1 ? `${gap}px` : "0",
              }}
            >
              <Image src={slide.src} alt={slide.content} width={330} height={400}/>
              <div className={styles.caption}>{slide.content}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.arrowsBasicSlider}>
        {arrows.map((item: any,index:number) => {
          return (
            <button key={index} className={`${styles.arrow} ${item.className}`}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.icon}
            </button>
          )
        })}
        <div className={styles.lineArrowBasicSlider}></div>
        <h3>{String(currentIndex + 1).padStart(2, "0")}</h3>
      </div>
    </div>
  );
};

export default Slider;
