import styles from "./BasicSectionSlider.module.scss";
import Container from "../container/Container";
import HomeButton from "../homeButton/HomeButton";
import BasicSlider from "../basicSlider/BasicSlider"
interface SectionSlider {
    textFirst: string;
    span: string;
    textSecond: string;
    className: string
}
export default function BasicSectionSlider ({textFirst, span, textSecond,className}: SectionSlider) {
    return (
        <div className={styles.basicSectionSlider}>
            <Container>
                <div className={styles.contentSectionSlider}>
                    <div className={styles.texts}>
                        <h2 className={className}>{textFirst} <span>{span}</span> {textSecond} </h2>
                        <p className={styles.textUnder}>It is a long established fact that a reader will be the distracted by the readable content of a page when looking at its layout from it.</p>
                        <HomeButton />
                    </div>
                    <BasicSlider />
                </div>
            </Container>
        </div>
    )
}