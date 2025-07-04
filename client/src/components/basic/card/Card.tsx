import styles from "./Card.module.scss";
import Image from "next/image";
interface CardProps {
    img: string;
    title: string;
    alt: string
}
export default function Card ({img,title,alt}: CardProps) {
    return (
        <div className={styles.cardItem}>
            <Image 
                width={100}
                height={100}
                src={img}
                alt={alt}
            />
            <h2>{title}</h2>
            <p>Lorem Ipsum is simply dummy text of the printing setting</p>
        </div>
    )
}