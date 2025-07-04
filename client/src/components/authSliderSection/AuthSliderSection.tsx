import styles from "./AuthSliderSection.module.scss";
import Container from "../basic/container/Container";
import { slidesData } from "../slidesData/SlidesData";
import AuthSliderComponent from "../authSlider/AuthSlider";
export default function AuthSliderSection() { 
  return (
    <div className={styles.authSlider}>
      <Container>
        <div className={styles.contentAuthSlider}>
          <div className={styles.titleAuthSlider}>
            <h2>What Our Happy Customers Say About Us</h2>
          </div>
          <div className={styles.authors}>
              <AuthSliderComponent slides={slidesData}/> 
          </div>
        </div>
      </Container>
    </div>
  );
}
