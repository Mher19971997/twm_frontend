import React, { useState, useEffect } from "react";
import styles from "./Post.module.scss";
import LikeAndComment from "../likeAndComment/LikeAndComment";
import MorePost from "../morePost/MorePost";

interface PostProps {
  comment: string;
  imagesContent: JSX.Element[] | null;
  videoContent: JSX.Element | null;
  src: string;
  alt: string;
  userName: string;
  when: string;
}

export default function Post({
  videoContent,
  comment,
  imagesContent,
  src,
  alt,
  userName,
  when,
}: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

  const maxLength = 100;
  const firstPart = comment.slice(0, maxLength);
  const remainingPart = comment.length > maxLength ? comment.slice(maxLength) : "";

  const toggleTextExpansion = () => setIsExpanded(!isExpanded);

  const openImageModal = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc);
    setCurrentSlide(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowGallery(false);
    document.body.style.overflow = "";
  };

  const handleGalleryNavigation = (direction: "next" | "prev") => {
    if (imagesContent) {
      setCurrentSlide((prev) => {
        const newIndex =
          direction === "next"
            ? (prev + 1) % imagesContent.length
            : (prev - 1 + imagesContent.length) % imagesContent.length;
        setSelectedImage(imagesContent[newIndex].props.src);
        return newIndex;
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 470);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (showGallery || selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showGallery, selectedImage]);
  return (
    <div className={styles.post}>
      <div className={styles.topPost}>
        <div className={styles.authorPost}>
          <img src={src} alt={alt} width={45} height={45} />
          <div className={styles.info}>
            <h2>{userName}</h2>
            <p>{when}</p>
          </div>
        </div>
        <MorePost />
      </div>

      <div className={styles.contentPost}>
        {videoContent && <div className={styles.video}>{videoContent}</div>}

        {comment && (
          <div className={styles.hiddenText}>
            <p>
              {firstPart}
              {remainingPart && isExpanded && (
                <span className={styles.expandedText}>{remainingPart}</span>
              )}
              {remainingPart && (
                <span
                  onClick={toggleTextExpansion}
                  className={`${styles.toggleButton} ${
                    isExpanded ? styles.expandedButton : ""
                  }`}
                >
                  {isExpanded ? "See Less" : "See More"}
                </span>
              )}
            </p>
          </div>
        )}

        {imagesContent && imagesContent.length > 0 && (
          <div className={styles.images}>
            {imagesContent.slice(0, isMobileView ? 1 : 2).map((child: any, index: number) => (
              React.cloneElement(child, {
                onClick: () => openImageModal(child.props.src, index),
                className: styles.thumbnail,
                key: index,
              })
            ))}

            {imagesContent.length > (isMobileView ? 1 : 2) && (
              <div className={styles.viewAll} onClick={() => setShowGallery(true)}>
                <p>{`+${imagesContent.length - (isMobileView ? 1 : 2)}`}</p>
              </div>
            )}
          </div>
        )}

        {selectedImage && (
          <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modalLargeImage} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
              <div className={styles.imageSlider}>
                  <img
                    src={selectedImage}
                    alt="Expanded view"
                    className={styles.largeImage}
                  />
                {imagesContent && imagesContent.length > 1 && (
                  <>
                    <button
                      className={styles.prevButton}
                      onClick={() => handleGalleryNavigation("prev")}
                    >
                      &#10094;
                    </button>
                    <button
                      className={styles.nextButton}
                      onClick={() => handleGalleryNavigation("next")}
                    >
                      &#10095;
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {showGallery && imagesContent && (
          <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
              <div className={styles.galleryContainer}>
                    <div className={styles.activeImage}>
                      <img
                        src={imagesContent[currentSlide].props.src}
                        alt={`Gallery image ${currentSlide}`}
                        className={styles.largeImage}
                      />
                    </div>
                {imagesContent.length > 1 && (
                  <>
                    <button
                      className={styles.prevButton}
                      onClick={() => handleGalleryNavigation("prev")}
                    >
                      &#10094;
                    </button>
                    <button
                      className={styles.nextButton}
                      onClick={() => handleGalleryNavigation("next")}
                    >
                      &#10095;
                    </button>
                  </>
                )}
              </div>
              <div className={styles.galleryImages}>
                {imagesContent.map((child: any, index: number) => (
                  <img
                    src={child.props.src}
                    alt={`Gallery image ${index}`}
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`${styles.thumbnail} ${
                      currentSlide === index ? styles.activeThumbnail : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <LikeAndComment />
      </div>
    </div>
  );
}
