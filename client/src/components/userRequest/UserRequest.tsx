import Image from "next/image";
import BasicConfirmButton from "../basic/basicConfirmButton/BasicConfirmButton";
import BasicDeleteButton from "../basic/basicDeleteButton/BasicDeleteButton";
import styles from "./UserRequest.module.scss";

interface UserRequestItemProps {
  src: string;
  alt: string;
  name: string;
  friends: string;
  onConfirm: () => void;
  onDelete: () => void;
}
function UserRequestItem ({ src, alt, name, friends, onConfirm, onDelete }: UserRequestItemProps) {
  const buttons: JSX.Element[] = [
    <BasicConfirmButton onClick={onConfirm}/>,
    <BasicDeleteButton onClick={onDelete} />
  ]
  return (
    <div className={styles.user}>
      <div className={styles.userInfo}>
        <Image src={src} alt={alt} width={45} height={45} />
        <div className={styles.aboutUser}>
          <h2>{name}</h2>
          <p>{friends}</p>
        </div>
      </div>
      <div className={styles.btnsUser}>
        {buttons.map((item:any, index:number) => {
          return <div key={index}>{item}</div>
        })}
      </div>
    </div>

  )
}

export default UserRequestItem;
