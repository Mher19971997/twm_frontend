import styles from "./Download.module.scss";
import Container from "../basic/container/Container";
import Image from "next/image";
import Air from "../../../public/assets/png/air.png";
import AppOne from "../../../public/assets/png/appOne.png"
import Backpack from "../../../public/assets/png/bagpack.png";
import LinearLogo from "../../../public/assets/svg/LinearLogoHome";
import PlayMarket from "../../../public/assets/svg/PlayMarket";
import AppStore from "../../../public/assets/svg/AppStore";
export default function Download () {
    const appImages: any[] = [
        {className: styles.air,src: Air.src, alt: "air",width: 425, height: 173},
        {className: styles.appOne, src: AppOne.src, alt: "appOne",width: 288, height: 472}
    ]
    const buttons: any[] = [
        {component: <PlayMarket />, className: styles.playMarket},
        {component: <AppStore />, className: styles.appStore}
    ]
    return (
        <div className={styles.parentDownload}>
            <Container>
                <div className={styles.contentDownload}>
                    <div className={styles.textsDownload}>
                        <h2>Download Now TWM Community Apps</h2>
                        <div className={styles.btnsDownload}>
                            {buttons.map((item: any,index: number) => {
                                return <button key={index} className={item.className}>{item.component}</button>
                            })}
                        </div>
                    </div>
                    <div className={styles.appImage}>
                        {appImages.map ((item: any,index: number) => {
                            return <Image className={item.className} key={index} src={item.src} alt={item.alt} width={item.width} height={item.height}/>
                        })}
                        <div className={styles.appTwo}>
                            <Image 
                                className={styles.imageAppTwo}
                                src={Backpack.src}
                                alt="Backpack"
                                width={229}
                                height={232}
                            />
                            <LinearLogo/>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}