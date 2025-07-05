"use client"
import styles from "./Footer.module.scss";
import Container from "../basic/container/Container";
import LinearLogo from "../../../public/assets/svg/LinearLogoHome";
import Phone from "../../../public/assets/svg/Phone";
import Email from "../../../public/assets/svg/Email";
import Location from "../../../public/assets/svg/Location";
export const contacts: any[] = [
    { icon: <Phone />, text: "+0123 456 987, +0123 456 987" },
    { icon: <Email />, text: "yourmailaddress@gmail.com" },
    { icon: <Location />, text: "www.yourwebsitename.com" },
]
export const linksFooter: any[] = [
    {
        title: "Quick Links",
        links: ["- About Us", "- Destinations", "- Latest Blog", "- Our Team", "- Contact Us"]
    },
    {
        title: "Support",
        links: ["- Customer Support", "- Privacy & Policy", "- Terms & Condition", "- Forum", "- Tour Guid"]
    },
]
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.contentFooter}>
                    <div className={styles.contacts}>
                        <div className={styles.logoAndText}>
                            <LinearLogo />
                            <p>You can dream, create, design, and buildsa the most wonderful place.</p>
                            <div className={styles.infoContacts}>
                                {contacts.map((item: any, index: number) => {
                                    return <div key={index} className={styles.infoItem}>
                                        {item.icon}
                                        <a href="#">{item.text}</a>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    {linksFooter.map((item: any, index: number) => {
                        return (
                            <div key={index} className={styles.linksItem}>
                                <h2>{item.title}</h2>
                                <div className={styles.link}>
                                    {item.links.map((link: string, linkIndex: number) => (
                                        <a href="#" key={linkIndex}>{link}</a>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    <div className={styles.subscribe}>
                        <h2>Newsletter</h2>
                        <form>
                            <input type="email" placeholder="Your Email" required />
                            <button>Subscribe Now</button>
                        </form>
                    </div>
                </div>
                <div className={styles.designBy}>
                    <p>Copyright @2020 Ravel. Designed By <a href="#">TWM team</a></p>
                </div>
            </Container>
        </footer>
    )
}