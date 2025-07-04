"use client";
import React, { useState } from "react";
import styles from "./ProfileComponent.module.scss";
import Avatar from "../../../public/assets/png/firstUserRequest.png";
import Post from "../basic/post/Post";
import Video from "../video/Video"
import Container from "../basic/container/Container";
export default function ProfileComponent() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(1024);

  interface UserProps {
    username: string;
    avatar: string;
    bio: string;
    following: number;
    posts: JSX.Element[];
  }

  const postsContent = [
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem inventore magnam consectetur animi asperiores illo minus temporibus architecto dolore, eius soluta? Voluptas nostrum optio nisi in deleniti tempora enim cumque.",
      imagesContent: null,
      videoContent: null,
      src: Avatar.src,
      alt: "FirstUserAuthor",
      userName: "Hurin Seary",
      when: "3 hours ago",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem inventore magnam consectetur animi asperiores illo minus temporibus architecto dolore, eius soluta? Voluptas nostrum optio nisi in deleniti tempora enim cumque.",
      imagesContent: null,
      videoContent: <Video />,
      src: Avatar.src,
      alt: "SecondUserAuthor",
      userName: "Hurin Seary",
      when: "2 hours ago",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem inventore magnam consectetur animi asperiores illo minus temporibus architecto dolore, eius soluta? Voluptas nostrum optio nisi in deleniti tempora enim cumque.",
      imagesContent: null,
      videoContent: null,
      src: Avatar.src,
      alt: "SecondUserAuthor",
      userName: "Hurin Seary",
      when: "2 hours ago",
    },
  ];

  const user: UserProps = {
    username: "Hurin Seary",
    avatar: Avatar.src,
    bio: "Travel enthusiast ✈️ | Photographer 📸 | Food lover 🍔",
    following: 250,
    posts: postsContent.map((content, index) => (
      <Post
        key={index}
        comment={content.comment}
        imagesContent={content.imagesContent}
        videoContent={content.videoContent}
        src={content.src}
        alt={content.alt}
        userName={content.userName}
        when={content.when}
      />
    )),
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowers((prev) => (isFollowing ? prev - 1 : prev + 1));
  };

  const stats: { number: number; text: string }[] = [
    {
      number: user.posts.length,
      text: "Posts",
    },
    {
      number: followers,
      text: "Followers",
    },
    {
      number: user.following,
      text: "Following",
    },
  ];

  return (
    <Container>
        <div className={styles.profileContainer}>
        <div className={styles.header}>
            <img
            src={user.avatar}
            alt={`${user.username}'s avatar`}
            className={styles.avatar}
            />
            <div className={styles.userInfo}>
            <h2 className={styles.username}>{user.username}</h2>
            <div className={styles.stats}>
                {stats.map((item: any, index: number) => (
                <span key={index}>
                    <strong>{item.number}</strong> {item.text}
                </span>
                ))}
            </div>
            <h2 className={styles.bio}>{user.bio}</h2>
            <button
                className={`${styles.followButton} ${
                isFollowing ? styles.following : ""
                }`}
                onClick={toggleFollow}
            >
                {isFollowing ? "Following" : "Follow"}
            </button>
            </div>
        </div>
        {user.posts.length > 0 ? (
            <div className={styles.grid}>
            {user.posts.map((post: any, index: number) => (
                <div key={index} className={styles.gridItem}>
                {post}
                </div>
            ))}
            </div>
        ) : (
            <h2>Публикации пока нет</h2>
        )}
        </div>
    </Container>
  );
}
