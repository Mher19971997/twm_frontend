import styles from "./Title.module.scss";
interface TitleProps {
    onClick: () => void,
    title: string
}
export default function Title ({onClick,title}: TitleProps) {

    return (
        <div className={styles.title}>
        <h2>{title}</h2>
        <p onClick={onClick} className={styles.seeAll}>
          See all
        </p>
      </div>
    )
}