"use client"
import { useState } from "react";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import BottomAcount from "@/components/bottomAccount/BottomAcount";
import NotificationIcon from "../../../public/assets/svg/NotificationIcon";
import MessagesIcon from "../../../public/assets/svg/MessagesIcon";
import SettingsIcon from "../../../public/assets/svg/SettingsIcon";
import ContactIcon from "../../../public/assets/svg/ContactIcon";
import FavoritesIcon from "../../../public/assets/svg/FavoritesIcon";
import FriendRequestIcon from "../../../public/assets/svg/FriendRequestIcon";

export default function Account() {
  const [isFriendRequestVisible, setIsFriendRequestVisible] = useState(true);

  const LinksHead = [
    {
      href: "/notifications",
      icon: <NotificationIcon />,
      text: "Notifications",
      isVisible: true,
    },
    {
      href: "/messages",
      icon: <MessagesIcon />,
      text: "Messages",
      isVisible: true,
    },
    {
      href: "/settings",
      icon: <SettingsIcon />,
      text: "Settings",
      isVisible: true,
    },
    {
      href: "/account",
      icon: <ContactIcon />,
      text: "Contacts",
      isContacts: true,
      isVisible: true,
    },
    {
      href: "/account",
      icon: <FavoritesIcon />,
      text: "Favorites",
      isFavorites: true,
      isVisible: true,
    },
    {
      href: "/account",
      icon: <FriendRequestIcon />,
      text: "Friend Request",
      isFriendRequest: true,
      isVisible: isFriendRequestVisible,
    },
  ];
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]); // Manage blocked users list

  const handleBlockUser = (userName: string) => {
    setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, userName]);
  };

  return (
    <>
      <HeaderAccount LinksHead={LinksHead}/>
      <BottomAcount />
    </>
  );
}
