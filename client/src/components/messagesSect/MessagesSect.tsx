"use client";
import { useState, useEffect } from "react";
import styles from "./MessagesSect.module.scss";
import Avatar from "../../../public/assets/png/firstUserRequest.png";
import AvatarTwo from "../../../public/assets/png/secondUserRequest.png";
import Png from "../../../public/assets/png/imageIcon.png";
import Image from "next/image";
interface Message {
  id: number;
  text: string;
  type: "sent" | "received";
  time: string;
  image?: string;
  video?: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  messages: Message[];
  pinned: boolean;
}

export default function MessagesSect() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Иван", avatar: Avatar.src, messages: [], pinned: false },
    { id: 2, name: "Анна", avatar: AvatarTwo.src, messages: [], pinned: false },
    { id: 3, name: "Ваня", avatar: Avatar.src, messages: [], pinned: false },
    { id: 4, name: "Ася", avatar: AvatarTwo.src, messages: [], pinned: false },
    { id: 5, name: "Валера", avatar: Avatar.src, messages: [], pinned: false },
    { id: 6, name: "Инна", avatar: AvatarTwo.src, messages: [], pinned: false },
    { id: 7, name: "Роберт", avatar: Avatar.src, messages: [], pinned: false },
    { id: 8, name: "Милана", avatar: AvatarTwo.src, messages: [], pinned: false,},
    { id: 9, name: "Владимир", avatar: Avatar.src, messages: [], pinned: false,},
    { id: 10, name: "Аня", avatar: AvatarTwo.src, messages: [], pinned: false },
    { id: 11, name: "Вася", avatar: Avatar.src, messages: [], pinned: false },
    { id: 12, name: "Соня", avatar: AvatarTwo.src, messages: [], pinned: false,},
  ]);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const selectedUser = users.find((user) => user.id === selectedUserId);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 695;
      setIsMobile(mobile);
      if (!mobile && selectedUserId === null) {
        setSelectedUserId(users[0].id);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [selectedUserId, users]);

  const handleSend = () => {
    if ((inputValue.trim() !== "" || imageFile || videoFile) && selectedUser) {
      const currentTime = new Date();
      const timeString = `${currentTime.getHours()}:${currentTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === selectedUserId) {
            const newMessage: Message = {
              id: Date.now(),
              text: inputValue,
              type: "sent",
              time: timeString,
            };

            if (imageFile) {
              newMessage.image = URL.createObjectURL(imageFile);
              setImageFile(null);
            }

            if (videoFile) {
              newMessage.video = URL.createObjectURL(videoFile);
              setVideoFile(null);
            }

            return {
              ...user,
              messages: [...user.messages, newMessage],
            };
          }
          return user;
        })
      );
      setInputValue("");
    }
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType === "image") {
        setImageFile(file);
        setVideoFile(null);
      } else if (fileType === "video") {
        setVideoFile(file);
        setImageFile(null);
      }
    }
  };

  const handleCloseChat = () => {
    if (isMobile) {
      setSelectedUserId(null);
      setIsSidebarOpen(true);
    }
  };

  const handleRightClick = (e: React.MouseEvent, userId: number) => {
    e.preventDefault();
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, pinned: !user.pinned } : user
      )
    );
  };

  const sortedUsers = [...users].sort(
    (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
  );

  return (
    <div className={styles.container}>
      <div
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.openSidebar : styles.closedSidebar
        }`}
      >
        {sortedUsers.map((user: any) => (
          <div
            key={user.id}
            className={
              user.id === selectedUserId
                ? styles.activeUserContainer
                : styles.userContainer
            }
            onClick={() => handleSelectUser(user.id)}
            onContextMenu={(e) => handleRightClick(e, user.id)} 
          >
            <button className={styles.userButton}>
              <Image
                src={user.avatar}
                alt={user.name}
                width={70}
                height={70}
                className={styles.avatar}
              />
              <div className={styles.userName}>
                {user.name}
                {user.pinned && <div className={styles.pinnedIcon}>Pinned</div>}
              </div>
            </button>
          </div>
        ))}
      </div>

      {isMobile && !selectedUserId ? (
        <div className={styles.null}></div>
      ) : (
        <div className={styles.chatContainer}>
          {selectedUser && (
            <>
              <header className={styles.header}>
                <div className={styles.userInfo}>
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className={styles.headerAvatar}
                  />
                  <h2>{selectedUser.name}</h2>
                </div>
                {isMobile && (
                  <button
                    className={styles.closeButton}
                    onClick={handleCloseChat}
                  >
                    X
                  </button>
                )}
              </header>
              <div className={styles.messagesContainer}>
                {selectedUser.messages.map((message: any) => (
                  <div
                    key={message.id}
                    className={`${styles.message} ${
                      message.type === "sent" ? styles.sent : styles.received
                    }`}
                  >
                    <div>{message.text}</div>
                    {message.image && (
                      <img
                        src={message.image}
                        alt="sent image"
                        className={styles.messageImage}
                      />
                    )}
                    {message.video && (
                      <video controls className={styles.messageVideo}>
                        <source src={message.video} />
                      </video>
                    )}
                    <div className={styles.messageTime}>{message.time}</div>
                  </div>
                ))}
              </div>

              <footer className={styles.footer}>
                <div className={styles.firstPartFooter}>
                  <label htmlFor="fileChose">
                    <Image src={Png.src} alt="png" width={32} height={32} />
                  </label>
                  <input
                    id="fileChose"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Введите сообщение..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                  />
                </div>
                <button className={styles.sendButton} onClick={handleSend}>
                  Отправить
                </button>
              </footer>
            </>
          )}
        </div>
      )}
    </div>
  );
}
