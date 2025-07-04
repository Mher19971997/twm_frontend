"use client";
import { useState } from "react";
import styles from "./CenterAccount.module.scss";
import Image from "next/image";
import ProfileBackground from "../../../public/assets/png/profileBackground.png";
import ProfileImg from "../../../public/assets/png/profileImg.png";
import CreatePost from "../createPost/CreatePost";
import Post from "../basic/post/Post";
import FirstImagePost from "../../../public/assets/png/postFirstImg.png";
import SecondImagePost from "../../../public/assets/png/postSecondImg.png";
import FirstUserAuthor from "../../../public/assets/png/firstUserRequest.png";
import SecondUserAuthor from "../../../public/assets/png/secondUserRequest.png";
import Video from "../video/Video";
export default function CenterAccount() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  const [posts, setPosts] = useState<any[]>([]);

  const toggleImages = () => {
    setShowAllImages((prev) => !prev);
  };

  const handleZoom = (src: string) => {
    setZoomedImage(src);
    setIsZoomed(true);
    document.body.style.overflow = "hidden";
  };

  const closeZoom = () => {
    setIsZoomed(false);
    setZoomedImage(null);
    document.body.style.overflow = "";
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const imagesPosts: { src: string; alt: string }[] = [
    { src: FirstImagePost.src, alt: "FirstImagePost" },
    { src: SecondImagePost.src, alt: "SecondImagePost" },
    { src: SecondImagePost.src, alt: "SecondImagePost" },
    { src: SecondImagePost.src, alt: "SecondImagePost" },
    { src: FirstImagePost.src, alt: "FirstImagePost" },
  ];

  const handleNewPost = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  const postsContent = [
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem inventore magnam consectetur animi asperiores illo minus temporibus architecto dolore, eius soluta? Voluptas nostrum optio nisi in deleniti tempora enim cumque.",
      imagesContent: null,
      videoContent: null,
      src: FirstUserAuthor.src,
      alt: "FirstUserAuthor",
      userName: "Surfiya Zakir",
      when: "3 hours ago",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem inventore magnam consectetur animi asperiores illo minus temporibus architecto dolore, eius soluta? Voluptas nostrum optio nisi in deleniti tempora enim cumque.",
      imagesContent: null,
      videoContent: <Video />,
      src: SecondUserAuthor.src,
      alt: "SecondUserAuthor",
      userName: "Goria Coast",
      when: "2 hours ago",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem inventore magnam consectetur animi asperiores illo minus temporibus architecto dolore, eius soluta? Voluptas nostrum optio nisi in deleniti tempora enim cumque.",
      imagesContent: null,
      videoContent: null,
      src: SecondUserAuthor.src,
      alt: "SecondUserAuthor",
      userName: "Goria Coast",
      when: "2 hours ago",
    },
  ];
  const p = [
    "vinijr@gmail.com",
    "São Gonçalo (Río de Janeiro, Brazil)",
    "Подписки - 0",
    "Подписчики - 0",
  ]
  return (
    <div className={styles.contentCenterAccount}>
      <div className={styles.aboutProfile}>
        {isZoomed && (
          <div className={styles.zoomModal} onClick={closeZoom}>
            <button
              className={styles.closeZoomButton}
              onClick={(e) => {
                e.stopPropagation();
                closeZoom();
              }}
            >
              &times;
            </button>
            <img
              src={zoomedImage!}
              alt="Zoomed Image"
              className={styles.zoomedImg}
            />
          </div>
        )}
        <div className={styles.backgroundProfile}>
          <Image
            src={ProfileBackground.src}
            alt="ProfileBackground"
            width={900}
            height={216}
            onClick={() => handleZoom(ProfileBackground.src)}
          />
        </div>
        <div className={styles.profileImgAndInfo}>
          <Image
            src={ProfileImg.src}
            alt="ProfileImg"
            width={162}
            height={162}
            onClick={() => handleZoom(ProfileImg.src)}
          />
          <div className={styles.infoProfile}>
              <h2>Vinicius JR</h2>
              {p.map((item:any, index: number) => {
                return <p key={index}>{item}</p>
              })}
          </div>
        </div>
      </div>
      <div className={styles.posts}>
        <CreatePost onPostSubmit={handleNewPost} />
        {postsContent.concat(posts).map((item: any, index: number) => (
          <Post
            key={index}
            comment={item.comment}
            imagesContent={item.imagesContent}
            videoContent={item.videoContent}
            src={item.src}
            alt={item.alt}
            userName={item.userName}
            when={item.when}
          />
        ))}
      </div>
      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {imagesPosts.map((item, index) => (
              <Image
                key={index}
                src={item.src}
                alt={item.alt}
                width={200}
                height={200}
              />
            ))}
            <button
              className={styles.closeModalButton}
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

