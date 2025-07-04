import { useState, useRef, useEffect } from "react";
import styles from "./Comments.module.scss";
import Png from "../../../public/assets/png/imageIcon.png";
import Image from "next/image";

interface Comment {
  id: number;
  text: string;
  replies: Comment[];
  media?: string;
}

interface CommentSectionProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export default function CommentSection({
  isOpen,
  setIsOpen,
  comments,
  setComments,
}: CommentSectionProps) {
  const [commentInput, setCommentInput] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [media, setMedia] = useState<File | string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePostComment = () => {
    if ((commentInput.trim() || media) && (commentInput.trim() || media)) {
      setComments((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: commentInput.trim(),
          replies: [],
          media: media ? (typeof media === "string" ? media : URL.createObjectURL(media)) : undefined,
        },
      ]);
      setCommentInput("");
      setMedia(null);
    } else {
      alert("Please enter either a comment or upload an image/video.");
    }
  };

  const handlePostReply = () => {
    if (commentInput.trim() || media) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === activeReplyId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Date.now(),
                    text: commentInput.trim(),
                    replies: [],
                    media: media ? (typeof media === "string" ? media : URL.createObjectURL(media)) : undefined,
                  },
                ],
              }
            : comment
        )
      );
      setCommentInput("");
      setActiveReplyId(null);
      setMedia(null);
    } else {
      alert("Please enter either a reply or upload an image/video.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds the maximum allowed size (50MB).");
        return;
      }

      const fileType = file.type.split("/")[0];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileType === "image" && (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "gif")) {
        setMedia(file);
        setCommentInput(""); 
      } else {
        alert("Please upload only images");
        setMedia(null);
      }
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  const handleDeleteReply = (commentId: number, replyId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.filter((reply) => reply.id !== replyId),
            }
          : comment
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveReplyId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const isPostEnabled = (commentInput.trim() || media) && (commentInput.trim() || media);
  return (
    <div ref={sectionRef} className={`${styles.commentSection} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.header}>
        <h3>Comments</h3>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>&times;</button>
      </div>
      <div className={styles.commentInput}>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder={activeReplyId ? "Write a reply..." : "Add a comment..."}
        />
        <label htmlFor="file-upload" className={styles.cameraIcon} onClick={handleImageClick}>
          <Image src={Png.src} alt="Png" width={32} height={32} />
        </label>
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept="image/*,video/*"
          className={styles.fileInput}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button onClick={activeReplyId ? handlePostReply : handlePostComment} disabled={!isPostEnabled}>
          {activeReplyId ? "Post Reply" : "Post Comment"}
        </button>
      </div>
      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <span className={styles.username}>User:</span>
              <span className={styles.commentText}>{comment.text}</span>
              {comment.media && (
                <div className={styles.media}>
                  <img src={comment.media} alt="Comment media" />
                </div>
              )}
              <button
                className={styles.replyButton}
                onClick={() => {
                  setActiveReplyId((prevId) => (prevId === comment.id ? null : comment.id));
                }}
              >
                Reply
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteComment(comment.id)}
              >
                Delete Comment
              </button>
              <div className={styles.replies}>
                {comment.replies.map((reply) => (
                  <div key={reply.id} className={styles.replyItem}>
                    <span className={styles.username}>Admin:</span>
                    <span className={styles.commentText}>{reply.text}</span>
                    {reply.media && (
                      <div className={styles.media}>
                        <img src={reply.media} alt="Reply media" />
                      </div>
                    )}
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteReply(comment.id, reply.id)}
                    >
                      Delete Reply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
