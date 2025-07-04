import styles from "./AuthCard.module.scss";
import Image from "next/image";
interface AuthCardProps {
    author: string,
    alt: string
    name: string,
    profesion: string,
    comment: string
}
export default function AuthCard ({author,alt,name,profesion,comment}: AuthCardProps) {
    return (
        <div className={styles.cardItemAuthCard}>
            <div className={styles.blueBackground}></div>
            <div className={styles.contentCard}>
                <div className={styles.authorCard}>
                    <div className={styles.imgAuthor}>
                        <Image src={author} alt={alt} width={80} height={80}/>
                    </div>
                    <div className={styles.infoAuthor}>
                        <h2>{name}</h2>
                        <h3>{profesion}</h3>
                    </div>
                </div>
                <p>{comment}</p>
            </div>
        </div>
    )
}