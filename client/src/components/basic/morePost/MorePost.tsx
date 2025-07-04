import styles from "./MorePost.module.scss";
import More from "../../../../public/assets/svg/MorePost";
export default function MorePost () {
    return (
        <button className={styles.morePost}><More/></button>
    )
}