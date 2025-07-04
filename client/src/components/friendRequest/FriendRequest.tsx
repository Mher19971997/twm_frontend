import { useState, useEffect } from "react";
import styles from "./FriendRequest.module.scss";
import Image from "next/image";
import BasicConfirmButton from "../basic/basicConfirmButton/BasicConfirmButton";
import BasicDeleteButton from "../basic/basicDeleteButton/BasicDeleteButton";
import User from "../../../public/assets/png/firstUserRequest.png";

export default function FriendRequest({ onEmptyRequests }: { onEmptyRequests: (isEmpty: boolean) => void }) {
  interface FriendRequest {
    author: string;
    alt: string;
    authorName: string;
    when: string;
  }

  const initialFriendRequests: FriendRequest[] = [
    {
      author: User.src,
      alt: "User",
      authorName: "Anthony Daugloi",
      when: "12 mutual friends",
    },
    {
      author: User.src,
      alt: "User",
      authorName: "Mohannad Zitoun",
      when: "15 mutual friends",
    },
    {
      author: User.src,
      alt: "User",
      authorName: "Sarah Connor",
      when: "8 mutual friends",
    },
  ];

  const [friendRequests, setFriendRequests] = useState(initialFriendRequests);

  const handleRemoveRequest = (index: number) => {
    setFriendRequests((prevRequests) => prevRequests.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (friendRequests.length === 0) {
      setTimeout(() => {
        onEmptyRequests(true);
      }, 0);
    }
  }, [friendRequests, onEmptyRequests]) ;
  return (
    <div className={styles.itemsFriendRequest}>
      {friendRequests.map((item: any, index: number) => (
        <div className={styles.itemFriendRequest} key={index}>
          <div className={styles.topItem}>
            <Image src={item.author} alt={item.alt} width={35} height={35} />
            <div className={styles.userNameAndWhen}>
              <h3>{item.authorName}</h3>
              <p>{item.when}</p>
            </div>
          </div>
          <div className={styles.buttons}>
            <BasicConfirmButton onClick={() => handleRemoveRequest(index)} />
            <BasicDeleteButton onClick={() => handleRemoveRequest(index)} />
          </div>
        </div>
      ))}
    </div>
  );
}
