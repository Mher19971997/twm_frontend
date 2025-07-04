"use client";
import React, { useRef, useState, useEffect } from 'react';
import styles from "./Video.module.scss";
import Play from "../../../public/assets/png/playBtn.png";
import Pause from '../../../public/assets/svg/Pause';
import Image from 'next/image';

const CustomVideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      if (videoRef.current) {
        setShowControls(true);
        videoRef.current.controls = true;

        clearTimeout(videoRef.current.dataset.hideTimeout as unknown as number);
        const timeoutId = setTimeout(() => {
          setShowControls(false);
          videoRef.current!.controls = false;
        }, 2000);

        videoRef.current.dataset.hideTimeout = timeoutId as unknown as string;
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={styles.videoContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/assets/video/Заново.mp4" type="video/mp4" />
        Ваш браузер не поддерживает элемент video.
      </video>

      {isHovered && showControls && (
        <div className={styles.playButton} onClick={togglePlayPause}>
          <div className={styles.playIcon}>
            {isPlaying ? (
              <Pause />
            ) : (
              <Image
                src={Play.src}
                alt="Play"
                width={27}
                height={30}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
