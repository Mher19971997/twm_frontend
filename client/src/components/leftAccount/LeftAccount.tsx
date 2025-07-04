"use client";
import { useState, useEffect } from "react";
import styles from "./LeftAccount.module.scss";
import UserContentItem from "../userContentItem/UserContentItem";
import UserRequestItem from "../userRequest/UserRequest";
import SuggestGroupItem from "../suggestGroup/SuggestGroup";
import Modal from "../modal/Modal";
import FirstUserRequest from "../../../public/assets/png/firstUserRequest.png";
import SecondUserRequest from "../../../public/assets/png/secondUserRequest.png";
import ThirdUserRequest from "../../../public/assets/png/thirdUserRequest.png";
import LastApplyUser from "../../../public/assets/png/lastUserApply.png";
import SuggestGroupImg from "../../../public/assets/png/suggestGroupImg.png";
import MyFavoriteOrganizations from "../../../public/assets/svg/MyFavoriteOrganizations";
import Posts from "../../../public/assets/svg/Posts";
import Title from "../basic/title/Title";

export const userContentItem = [
  { icon: <MyFavoriteOrganizations />, text: "My Favorite Organizations" },
  { icon: <Posts />, text: "My Posts" },
];

export default function LeftAccount() {
  const [userRequests, setUserRequests] = useState([
    { src: FirstUserRequest.src, alt: "FirstUserRequest", name: "Anthony Daugloi", friends: "12 mutual friends" },
    { src: SecondUserRequest.src, alt: "SecondUserRequest", name: "Mohannad Zitoun", friends: "12 mutual friends" },
    { src: ThirdUserRequest.src, alt: "ThirdUserRequest", name: "Mohannad Zitoun", friends: "12 mutual friends" },
    { src: ThirdUserRequest.src, alt: "ThirdUserRequest", name: "Mohannad Zitoun", friends: "12 mutual friends" },
    { src: ThirdUserRequest.src, alt: "ThirdUserRequest", name: "Mohannad Zitoun", friends: "12 mutual friends" },
    { src: ThirdUserRequest.src, alt: "ThirdUserRequest", name: "Mohannad Zitoun", friends: "12 mutual friends" },
    { src: ThirdUserRequest.src, alt: "ThirdUserRequest", name: "Mohannad Zitoun", friends: "12 mutual friends" },
    { src: ThirdUserRequest.src, alt: "ThirdUserRequest", name: "Mohannad Zitoun", friends: "12 mutual friends" },
    { src: ThirdUserRequest.src, alt: "ThirdUserRequest", name: "Mohannad Zitoun", friends: "12 mutual friends" },
    { src: ThirdUserRequest.src, alt: "ThirdUserRequest", name: "Mohannad Zitoun", friends: "12 mutual friends" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuggestGroupModalOpen, setIsSuggestGroupModalOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const applyUsers = [
    { src: FirstUserRequest.src, alt: "FirstUserRequest" },
    { src: SecondUserRequest.src, alt: "SecondUserRequest" },
    { src: ThirdUserRequest.src, alt: "ThirdUserRequest" },
    { src: LastApplyUser.src, alt: "LastApplyUser" },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openSuggestGroupModal = () => setIsSuggestGroupModalOpen(true);
  const closeSuggestGroupModal = () => setIsSuggestGroupModalOpen(false);

  const updateUserRequests = (index: number) => {
    setUserRequests((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (userRequests.length === 0) {
      setIsModalOpen(false);
    }
  }, [userRequests]);

  const contentStyle: React.CSSProperties = {
    position: isFixed ? "fixed" : "relative",
    top: isFixed ? "20px" : "auto",
  };

  return (
    <div className={styles.parentLeftAccount}>
      <div className={styles.contentLeftAccount} style={contentStyle}>
        <div className={styles.userContent}>
          {userContentItem.map((item: any, index: number) => (
            <UserContentItem key={index} icon={item.icon} text={item.text} />
          ))}
        </div>

        {userRequests.length > 0 && (
          <div className={styles.userRequest}>
            <Title onClick={openModal} title="Friend Request" />
            <div className={styles.usersBlock}>
              {userRequests.map((item: any, index:number) => (
                <UserRequestItem
                  key={index}
                  {...item}
                  onConfirm={() => updateUserRequests(index)}
                  onDelete={() => updateUserRequests(index)}
                />
              ))}
            </div>
          </div>
        )}

        <div className={styles.suggestGroup}>
          <Title onClick={openSuggestGroupModal} title="Suggest Group" />
          <SuggestGroupItem groupImgSrc={SuggestGroupImg.src} applyUsers={applyUsers} />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="All Friend Requests">
        <div className={styles.modalUserList}>
          {userRequests.map((item: any, index: number) => (
            <UserRequestItem
              key={index}
              {...item}
              onConfirm={() => updateUserRequests(index)}
              onDelete={() => updateUserRequests(index)}
            />
          ))}
        </div>
      </Modal>

      <Modal isOpen={isSuggestGroupModalOpen} onClose={closeSuggestGroupModal} title="All Suggested Groups">
        <SuggestGroupItem groupImgSrc={SuggestGroupImg.src} applyUsers={applyUsers} />
      </Modal>
    </div>
  );
}
