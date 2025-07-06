"use client"
import styles from "./HeaderAccount.module.scss";
import Container from "../../components/basic/container/Container";
import Link from "next/link";
import LinearLogo from "../../../public/assets/svg/LinearLogoHome";
import HomeIcon from "../../../public/assets/svg/HomeIcon";
import Video from "../../../public/assets/svg/Video";
import NotificationIcon from "../../../public/assets/svg/NotificationIcon";
import MessagesIcon from "../../../public/assets/svg/MessagesIcon";
import SettingsIcon from "../../../public/assets/svg/SettingsIcon";
import AccountHeadImage from "../../../public/assets/png/accountHeadImage.png";
import Image from "next/image";
import HamburgerAccount from "../basicHamburger/HamburgerAccount";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { profileOrganisation } from "@/redux/actions/profileOrganisation";
import { profileIndividual } from "@/redux/actions/profileIndividual";
import { profileClient } from "@/redux/actions/profileClient";
import { getTours } from "@/redux/actions/toursAction";
import { useAppDispatch, useAppSelector } from "@/redux/types/types";
import { useCookieValue } from "@/helpers/getCookieInfo";
import { useRouter } from "next/navigation";
export type LinkType = {
  href: string;
  icon: JSX.Element;
  text: string;
  isVisible: boolean;
  isContacts?: boolean;
  isFavorites?: boolean;
  isFriendRequest?: boolean;
};
export const iconsWithBackground: JSX.Element[] = [<HomeIcon />, <Video />];

interface HeaderAccountProps {
  LinksHead: any[];
}

type LinksProps = {
  href: string;
  icon: JSX.Element;
};
const links: LinksProps[] = [
  {
    href: "/notifications",
    icon: <NotificationIcon />,
  },
  {
    href: "/messages",
    icon: <MessagesIcon />,
  },
  {
    href: "/settings",
    icon: <SettingsIcon />,
  },
];

export default function HeaderAccount({ LinksHead }: any) {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const userType = useCookieValue("userType");
  const token = useCookieValue("authToken");
  const profileClientData = useAppSelector((state) => state.profileClient.data);
  const profileIndividualData = useAppSelector(
    (state) => state.profileIndividual.data
  );
  const profileOrganisationData = useAppSelector(
    (state) => state.profileOrganisation.data
  );

  const profile: any =
    userType === "auth_organisation"
      ? profileOrganisationData
      : userType === "auth_individual"
        ? profileIndividualData
        : profileClientData;


  useEffect(() => {
    if (token) {
      if (userType === "auth_organisation") {
        dispatch(profileOrganisation(token));
      } else if (userType === "auth_individual") {
        dispatch(profileIndividual(token));
      } else if (userType === "auth_client") {
        dispatch(profileClient(token));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const cookies = parseCookies();
        const authToken = cookies.authToken;
        const refreshToken = cookies.refreshToken;
        const userType = cookies.userType;

        if (!authToken || !refreshToken || !userType) {
          router.push("/");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.contentHeader}>
          <div className={styles.leftHeader}>
            <div className={styles.logo}>
              <Link href="/profile">
                <LinearLogo />
              </Link>
            </div>
            <div className={styles.secondBlockLeftHeader}>
              <input type="search" placeholder="Start typing to search.." />
              <div className={styles.icons}>
                {iconsWithBackground.map((item, index) => (
                  <div key={index} className={styles.backgroundIcon}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.rightHeader}>
            {links.map((item: any, index: number) => (
              <Link href={item.href} key={index}>
                {item.icon}
              </Link>
            ))}

            <div className={styles.accountMenu}>
              <div className={styles.avatar}>
                <Link href="/profile">
                  <Image
                    src={AccountHeadImage.src}
                    alt="accountImage"
                    width={28}
                    height={28}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.hamburgerMenu}>
            <HamburgerAccount LinksHead={LinksHead} />
          </div>
        </div>
      </Container>
    </header>
  );
}
