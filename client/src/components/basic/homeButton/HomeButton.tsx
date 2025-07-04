import styles from "./HomeButton.module.scss";
import ArrowRightButton from "../../../../public/assets/svg/ArrowRightButton";
export default function HomeButton () {
    return (
        <div className={styles.buttonParent}>
            <button>
                <div className={styles.arrowDiv}>
                    <ArrowRightButton/>
                </div>
                <p>Discover Now</p>
            </button>
        </div>
    )
}