import MessagesSect from "@/components/messagesSect/MessagesSect";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import NotificationIcon from "../../../public/assets/svg/NotificationIcon";
import MessagesIcon from "../../../public/assets/svg/MessagesIcon";
import SettingsIcon from "../../../public/assets/svg/SettingsIcon";
import ContactIcon from "../../../public/assets/svg/ContactIcon";
import FavoritesIcon from "../../../public/assets/svg/FavoritesIcon";
import FriendRequestIcon from "../../../public/assets/svg/FriendRequestIcon";

export const LinksHead = [
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
    href: "/profile",
    icon: <ContactIcon />,
    text: "Contacts",
    isContacts: true,
    isVisible: false,
  },
  {
    href: "/profile",
    icon: <FavoritesIcon />,
    text: "Favorites",
    isFavorites: true,
    isVisible: false,
  },
  {
    href: "/profile",
    icon: <FriendRequestIcon />,
    text: "Friend Request",
    isFriendRequest: true,
    isVisible: false,
  },
];

export default function MessagesPage() {
  interface LinkType {
    href: string;
    icon: JSX.Element;
    text: string;
    isVisible?: boolean;
    isContacts?: boolean;
    isFavorites?: boolean;
    isFriendRequest?: boolean;
  }

  return (
    <>
      <HeaderAccount LinksHead={LinksHead} />
      <MessagesSect />
    </>
  );
}
