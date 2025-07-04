import HomeSlider from "@/components/homeSlider/HomeSlider";
import Cards from "@/components/cardsBlock/Cards";
import BasicSectionSlider from "@/components/basic/basicSliderSection/BasicSectionSlider";
import AccordionSect from "@/components/acordionSection/AccordionSect";
import Download from "@/components/download/Download";
import Footer from "@/components/footer/Footer";
import styles from "../components/basic/basicSliderSection/BasicSectionSlider.module.scss"
import AuthSliderSection from "@/components/authSliderSection/AuthSliderSection";
export default function Home() {
  return (
      <>
        <HomeSlider/>
        <Cards/>
        <BasicSectionSlider className={styles.withOutWidth} textFirst="Top " span="Destinations" textSecond="In The World"/>
        <AccordionSect/>
        <BasicSectionSlider className={styles.withWidth} textFirst="Top " span="Organizations" textSecond=""/>
        <AuthSliderSection />
        <Download />
        <Footer />
      </>
  );
}
