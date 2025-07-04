import styles from "./Cards.module.scss";
import Container from "../basic/container/Container";
import Card from "../basic/card/Card";
import Map from "../../../public/assets/png/mapCard.png";
import Binocular from "../../../public/assets/png/binocularCard.png";
import Backpack from "../../../public/assets/png/backpackCard.png";
import Ukalele from "../../../public/assets/png/ukeleleCard.png";
import ResponsiveCardsBlock from "../responsiveCardsBlock/ResponsiveCards";
export const cards = [
    {
        img: Map.src,
        title: "Choose Destination",
        alt: "Map"
    },
    {
        img: Binocular.src,
        title: "Explore The Place",
        alt: "Binocular"
    },
    {
        img: Backpack.src,
        title: "Start Your Journey",
        alt: "Backpack"
    },
    {
        img: Ukalele.src,
        title: "Let’s Enjoy",
        alt: "Ukalele"
    },
]
export default function Cards() {
    return (
        <Container>
            <div className={styles.cardBlock}>
                {cards.map((item: any, index: number) => {
                    return <Card img={item.img} title={item.title} alt={item.title} key={index} />
                })}
            </div>
            <div className={styles.responsiveCardsBlock}>
                <ResponsiveCardsBlock />
            </div>
        </Container>
    )
}