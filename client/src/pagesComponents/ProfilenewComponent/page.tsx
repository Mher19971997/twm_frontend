import ProfileComponent from "@/components/profileComponent/ProfileComponent";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import NotificationIcon from "../../../public/assets/svg/NotificationIcon";
import MessagesIcon from "../../../public/assets/svg/MessagesIcon";
import SettingsIcon from "../../../public/assets/svg/SettingsIcon";


export default function ProfilenewComponent () {
    type LinkType = {
        href: string;
        icon: JSX.Element;
        text: string;
        isContacts?: boolean;
        isFavorites?: boolean;
        isFriendRequest?: boolean;
        isVisible: boolean;
      };
    
      const LinksHead: LinkType[] = [
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
      ];
    return (
    <div style={{overflowX: "hidden"}}>
        <HeaderAccount LinksHead={LinksHead}/>
        <ProfileComponent/>
    </div>
    ) 
}