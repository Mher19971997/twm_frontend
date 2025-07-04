"use client";

import { useState, useEffect } from "react";
import styles from "./RightAccount.module.scss";
import User from "../../../../public/assets/png/firstUserRequest.png";
import Image from "next/image";
import Groups from "@/components/groups/Groups";
import Pages from "@/components/pages/Page";
import Link from "next/link";

interface Users {
  image: string;
  alt: string;
  userName: string;
  icon: JSX.Element;
}

export const users: Users[] = [
  {
    image: User.src,
    alt: "User",
    userName: "Hurin Seary",
    icon: (
      <div className={styles.icon}>
        <p>2</p>
      </div>
    ),
  },
  {
    image: User.src,
    alt: "User",
    userName: "Victor Exrixon",
    icon: <div className={styles.iconOnline}></div>,
  },
  {
    image: User.src,
    alt: "User",
    userName: "Surfiya Zakir",
    icon: <div className={styles.iconOfline}></div>,
  },
  {
    image: User.src,
    alt: "User",
    userName: "Goria Coast",
    icon: <div className={styles.iconOnline}></div>,
  },
  {
    image: User.src,
    alt: "User",
    userName: "Hurin Seary",
    icon: (
      <div className={styles.lastOnline}>
        <p>4:09 pm</p>
      </div>
    ),
  },
  {
    image: User.src,
    alt: "User",
    userName: "David Goria",
    icon: (
      <div className={styles.lastOnline}>
        <p>2 days</p>
      </div>
    ),
  },
  {
    image: User.src,
    alt: "User",
    userName: "Seary Victor",
    icon: <div className={styles.iconOnline}></div>,
  },
  {
    image: User.src,
    alt: "User",
    userName: "Ana Seary",
    icon: <div className={styles.iconOnline}></div>,
  },
];

const UserItem = ({
  image,
  alt,
  userName,
  icon,
  onClick,
  isBlocked, // новый пропс для проверки блокировки
}: Users & {
  onClick: (userName: string, type: "user" | "group" | "page") => void;
  isBlocked: boolean; // добавляем флаг заблокированности
}) => {
  if (isBlocked) return null; // Если пользователь заблокирован, не рендерим его

  return (
    <div className={styles.contact} onClick={() => onClick(userName, "user")}>
      <div className={styles.userAndName}>
        <Image src={image} alt={alt} width={35} height={35} />
        <h4>{userName}</h4>
      </div>
      {icon}
    </div>
  );
};

interface RightAccountProps {
  scrollThreshold: number;
  initialPosition: "static" | "relative" | "fixed";
}

export default function RightAccount({
  scrollThreshold,
  initialPosition,
}: RightAccountProps) {
  const [position, setPosition] = useState<"static" | "relative" | "fixed">(
    initialPosition
  );
  const [topPosition, setTopPosition] = useState<string>("0px");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<"user" | "group" | "page" | null>(null);
  const [message, setMessage] = useState<string>("");

  const [showAccountOptions, setShowAccountOptions] = useState(false);

  const [blockedPeople, setBlockedPeople] = useState<string[]>([]);
  const [groups, setGroups] = useState(["Studio Express", "Armany Design", "De fabous"]);
  const [pages, setPages] = useState(["Armany Seary", "Entropio Inc"]);

  useEffect(() => {
    const handleScroll = () => {
      if (initialPosition !== "static" && window.scrollY > 100) {
        setPosition("fixed");
        setTopPosition("20px");
      } else {
        setPosition(initialPosition);
        setTopPosition("0px");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollThreshold, initialPosition]);

  const openModal = (name: string, type: "user" | "group" | "page") => {
    setSelectedUser(name);
    setSelectedItemType(type);
    setShowAccountOptions(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setSelectedItemType(null);
    setMessage("");
    setShowAccountOptions(false);
  };

  const handlePostMessage = () => {
    if (message.trim()) {
      console.log(`Message to ${selectedUser}: ${message}`);
      setMessage("");
      closeModal();
    }
  };

  const handleGoToUserAccount = () => {
    console.log(`Navigating to ${selectedUser}'s account`);
    closeModal();
  };

  const blockUser = (userName: string) => {
    if (!userName) return;
    setBlockedPeople((prev) => [...prev, userName]);
    closeModal();
  };

  const leaveGroupOrPage = (name: string, type: "group" | "page") => {
    if (type === "group") {
      setGroups((prev) => prev.filter((group) => group !== name));
    } else if (type === "page") {
      setPages((prev) => prev.filter((page) => page !== name));
    }
    closeModal();
  };

  const buttons: { href?: string; text: string; className: string; onClick: () => void }[] = [
    ...(showAccountOptions
      ? [
        {
          className: styles.goToAccountButton,
          onClick: handleGoToUserAccount,
          href: "/profile",
          text: `Go to ${selectedUser}'s Account`,
        },
        {
          className: styles.sendMessageButton,
          onClick: () => setShowAccountOptions(false),
          text: `Send a Message`,
        },
      ]
      : [
        {
          className: styles.postButton,
          onClick: handlePostMessage,
          text: "Post",
        },
        ...(selectedItemType === "user" && selectedUser
          ? [
            {
              className: styles.blockButton,
              onClick: () => blockUser(selectedUser!),
              text: "Block",
            },
          ]
          : []),
        ...(selectedItemType === "group" || selectedItemType === "page"
          ? [
            {
              className: styles.leaveButton,
              onClick: () => {
                if (selectedItemType) {
                  leaveGroupOrPage(selectedUser!, selectedItemType);
                }
              },
              text: `Leave`,
            },
          ]
          : []),
      ]),
  ];

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const filteredUsers = users.filter((user) => !blockedPeople.includes(user.userName));
  const filteredGroups = groups.filter((group) => !blockedPeople.includes(group)); // Используем блокированные имена для исключения
  const filteredPages = pages.filter((page) => !blockedPeople.includes(page)); // То же для страниц

  return (
    <div className={styles.parentRightAccount}>
      <div
        className={styles.contentRightAccount}
        style={{ position: position, top: topPosition }}
      >
        {filteredUsers.length > 0 && (
          <div className={styles.contacts}>
            <h2>CONTACTS</h2>
            <div className={styles.users}>
              {filteredUsers.map((user: any, index: number) => (
                <UserItem
                  key={index}
                  {...user}
                  onClick={openModal}
                  isBlocked={blockedPeople.includes(user.userName)}
                />
              ))}
            </div>
          </div>
        )}

        {filteredGroups.length > 0 && <Groups groups={filteredGroups} onClick={openModal} />}

        {filteredPages.length > 0 && <Pages pagesItem={filteredPages} onClick={openModal} />}
      </div>

      {isModalOpen && selectedUser && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={handleModalClick}>
            <div className={styles.headerModalContent}>
              <button className={styles.closeButton} onClick={closeModal}>
                X
              </button>
              <h2>
                {showAccountOptions
                  ? `Choose an action for ${selectedUser}`
                  : selectedItemType === "user"
                    ? `Message to ${selectedUser}`
                    : `Message to ${selectedUser}`}
              </h2>

            </div>

            {!showAccountOptions && (
              <textarea
                placeholder="Type your message..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.textarea}
              />
            )}

            <div className={styles.modalActions}>
              {buttons.map((item: any, index: number) => (
                item.text.includes("Go to") ? (
                  <Link className={item.className} href={`/profile`} key={index}>
                    {item.text}
                  </Link>
                ) : (
                  <button
                    className={item.className}
                    key={index}
                    onClick={item.onClick}
                  >
                    {item.text}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
