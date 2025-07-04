import styles from "./UserContentItem.module.scss";

interface UserContentItemProps {
  icon: JSX.Element;
  text: string;
}

const UserContentItem = ({ icon, text }: UserContentItemProps) => (
  <div className={styles.userContentItem}>
    {icon}
    <p>{text}</p>
  </div>
);

export default UserContentItem;
