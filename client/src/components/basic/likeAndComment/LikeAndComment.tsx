"use client";
import { useState, useEffect } from "react";
import styles from "./LikeAndComment.module.scss";
import Like from "../../../../public/assets/svg/Like";
import Heart from "../../../../public/assets/svg/Heart";
import Comment from "../../../../public/assets/svg/Comment";
import Share from "../../../../public/assets/svg/Share";
import CommentSection from "../../comments/Comments";

export default function LikeAndComment() {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [likeCount, setLikeCount] = useState(0); 
  const [userLiked, setUserLiked] = useState(false); 

  const handleLike = () => {
    if (userLiked) {
      setLikeCount((prev) => prev - 1);
      setUserLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setUserLiked(true);
    }
  };

  const formatLikeCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(count % 1000 >= 100 ? 1 : 0) + "k";
    }
    return count.toString();
  };

  const handleShare = async () => {
    const shareData = {
      title: "Check this out!",
      text: "This is a great post I want to share with you.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Sharing not supported on this device/browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 416);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const blocks = [
    {
      blockClassName: styles.heartBlock,
      iconClassName: styles.heart,
      icon: <Heart />,
      text: `${formatLikeCount(likeCount)} Like${likeCount !== 1 ? "s" : ""}`,
      onClick: handleLike,
    },
    {
      blockClassName: styles.commentBlock,
      iconClassName: styles.comment,
      icon: <Comment />,
      text: isMobileView
        ? `${comments.length}`
        : `${comments.length} Comment`,
      onClick: () => setIsCommentOpen((prev) => !prev),
    },
  ];

  return (
    <div className={styles.likeAndComment}>
      <div className={styles.leftContent}>
        <div
          className={`${styles.like} ${userLiked ? styles.liked : ""}`}
          onClick={handleLike}
        >
          <Like />
        </div>
        {blocks.map((item: any, index: number) => (
          <div
            key={index}
            className={item.blockClassName}
            onClick={item.onClick}
          >
            <div className={item.iconClassName}>{item.icon}</div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <CommentSection
        isOpen={isCommentOpen}
        setIsOpen={setIsCommentOpen}
        comments={comments}
        setComments={setComments}
      />

      <div
        className={styles.share}
        onClick={handleShare}
        style={{ cursor: "pointer" }}
      >
        <Share />
        <p>Share</p>
      </div>
    </div>
  );
}
