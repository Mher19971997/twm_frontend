import Image from "next/image";
import styles from "./SuggestGroup.module.scss";

interface SuggestGroupItemProps {
  groupImgSrc: string;
  applyUsers: { src: string, alt: string }[];
}

const SuggestGroupItem = ({ groupImgSrc, applyUsers }: SuggestGroupItemProps) => (
  <div className={styles.contentSuggestGroup}>
    <div className={styles.suggestGroupBigImage}>
      <Image src={groupImgSrc} alt="SuggestGroupImg" width={234} height={175} />
    </div>
    <div className={styles.applyUsers}>
      {applyUsers.slice(0, 3).map((item: any, index: number) => (
        <Image key={index} src={item.src} alt={item.alt} width={35} height={35} />
      ))}
      <div className={styles.more}>
        <p>+{applyUsers.length - 3}</p>
      </div>
      <h4>Member Apply</h4>
    </div>
  </div>
);

export default SuggestGroupItem;
