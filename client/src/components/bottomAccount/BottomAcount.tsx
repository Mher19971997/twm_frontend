import LeftAccount from "../leftAccount/LeftAccount"
import CenterAccount from "../centerAccount/CenterAccount"
import RightAccount from "../basic/rightAccount/RightAccount"
import Container from "../basic/container/Container"
import styles from "./BottomAcount.module.scss"
export default function BottomAcount () {
    return (
        <Container>
            <div className={styles.parentDiv}>
                <LeftAccount/>
                <CenterAccount/>
                <RightAccount scrollThreshold={0} initialPosition="relative" />
            </div>
            </Container>
    )
}