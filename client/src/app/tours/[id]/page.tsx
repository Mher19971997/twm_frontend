"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import { LinksHead } from "@/app/messages/page";
import Footer from "@/components/footer/Footer";
import { MapPinIcons } from "../../../../public/assets/svg/MapPinIcons";
import { CalendarsIcon } from "../../../../public/assets/svg/CalendarsIcon";
import { ClockIcon } from "../../../../public/assets/svg/ClockIcon";
import { UsersIcons } from "../../../../public/assets/svg/UsersIcons";
import { InfoIcon } from "../../../../public/assets/svg/InfoIcon";
import { StarIcon } from "../../../../public/assets/svg/StarIcon";

// const StarIcon = ({ size = 16 }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
//   </svg>
// );

// Sample tours data
const tours = [
  {
    id: 1,
    name: "Տաթևի Հուշարձան և Ջերմուկ",
    destination: "Սյունիքի մարզ, Հայաստան",
    image: "../assets/alps.jfif",
    description:
      "Բացահայտեք Հայաստանի հարավային գեղեցկությունը։ Այցելեք աշխարհի ամենաերկար հանգուցային չղջաշարժիչ - Տաթևի աերիալ տրամվայը, և վայելեք Ջերմուկի բուժիչ աղբյուրները։ Այս տուրն ապահովում է անմոռանալի տպավորություններ և հայրենի պատմության հետ ծանոթություն։",
    dateTime: "2024 Դեկտեմբեր 15, 09:00",
    duration: "2 օր",
    includes: [
      "Տրանսպորտ",
      "Հյուրանոց",
      "Առաջին նախաճաշ",
      "Պրոֆեսիոնալ գիդ",
      "Աերիալ տրամվայ",
      "Ապահովագրություն",
    ],
    price: 45000,
    location: "Հայաստան",
    rating: 4.8,
    groupSize: "15-25 մարդ",
    reviewCount: 142,
  },
  {
    id: 2,
    name: "Սևանա Լիճ և Դիլիջան",
    destination: "Գեղարքունիքի և Տավուշի մարզեր",
    image: "../assets/Kenya.jfif",
    description:
      "Լողացեք Հայաստանի ափարիկ մարգարիտում՝ Սևանա լճում, այցելեք Սևանավանքը և վայելեք Դիլիջանի բնապահպանական գոտու գեղեցկությունը։",
    dateTime: "2024 Դեկտեմբեր 22, 08:30",
    duration: "1 օր",
    includes: ["Տրանսպորտ", "Ճաշ", "Գիդ", "Թանգարան", "Լողարան"],
    price: 25000,
    location: "Հայաստան",
    rating: 4.6,
    groupSize: "20-30 մարդ",
    reviewCount: 89,
  },
  {
    id: 3,
    name: "Գեղարդ և Գառնի",
    destination: "Կոտայքի մարզ",
    image: "../assets/maldivs.jfif",
    description:
      "Կերպարեք ուխտի ճանապարհորդություն դեպի Գեղարդավանք և Գառնի հեթանոսական տաճար։ Բացահայտեք հին Հայաստանի գաղտնիքները։",
    dateTime: "2024 Դեկտեմբեր 20, 10:00",
    duration: "1 օր",
    includes: ["Տրանսպորտ", "Ճաշ", "Գիդ", "Մուտքի տոմսեր"],
    price: 20000,
    location: "Հայաստան",
    rating: 4.7,
    groupSize: "10-20 մարդ",
    reviewCount: 156,
  },
];

export default function TourDetailPage() {
  const params = useParams();
  const tourId = Number(params.id);
  const tour = tours.find((t) => t.id === tourId);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showToast, setShowToast] = useState(false);

  if (!tour) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Տուրը չի գտնվել</h1>
          <p>Ծանուցում եք փորձելու այլ տուր</p>
          <button
            className={styles.backButton}
            onClick={() => window.history.back()}
          >
            Վերադառնալ
          </button>
        </div>
      </div>
    );
  }

  const adultPrice = tour.price;
  const childPrice = tour.price * 0.5;
  const total = adults * adultPrice + children * childPrice;

  const handleSubmit = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <span className={styles.stars}>
        {"★".repeat(fullStars)}
        {hasHalfStar && "☆"}
        {"☆".repeat(5 - Math.ceil(rating))}
      </span>
    );
  };

  return (
    <>
    <HeaderAccount LinksHead={LinksHead}/>
      <div className={styles.container}>
        {/* Toast notification */}
        {showToast && (
          <div className={styles.toast}>
            ✅ Ձեր հայտը հաջողությամբ ուղարկվեց!
          </div>
        )}

        {/* Tour Header */}
        <div className={styles.tourHeader}>
          <div className={styles.imageContainer}>
            <img
              src={tour.image}
              alt={tour.name}
              className={styles.tourImage}
            />
          </div>
          <div className={styles.tourContent}>
            <h1 className={styles.title}>{tour.name}</h1>
            <div className={styles.destination}>
              <MapPinIcons size={20} />
              {tour.destination}
            </div>
            <div className={styles.rating}>
              {renderStars(tour.rating)}
              <span>
                {tour.rating} ({tour.reviewCount} գնահատական)
              </span>
            </div>
          </div>
        </div>

        {/* Tour Details Grid */}
        <div className={styles.detailsGrid}>
          {/* Description */}
          <div className={styles.detailCard}>
            <h2 className={styles.detailTitle}>
              <InfoIcon size={20} />
              Նկարագրություն
            </h2>
            <p className={styles.detailText}>{tour.description}</p>
          </div>

          {/* Tour Info */}
          <div className={styles.detailCard}>
            <h2 className={styles.detailTitle}>
              <CalendarsIcon size={20} />
              Տուրի Մանրամասներ
            </h2>
            <div className={styles.infoItem}>
              <CalendarsIcon size={16} />
              <span>
                <span className={styles.label}>Ամսաթիվ:</span> {tour.dateTime}
              </span>
            </div>
            <div className={styles.infoItem}>
              <ClockIcon size={16} />
              <span>
                <span className={styles.label}>Տևողություն:</span>{" "}
                {tour.duration}
              </span>
            </div>
            <div className={styles.infoItem}>
              <UsersIcons size={16} />
              <span>
                <span className={styles.label}>Խմբի չափ:</span> {tour.groupSize}
              </span>
            </div>
            <div className={styles.infoItem}>
              <MapPinIcons size={16} />
              <span>
                <span className={styles.label}>Վայր:</span> {tour.location}
              </span>
            </div>
          </div>

          {/* Includes */}
          <div className={styles.detailCard}>
            <h2 className={styles.detailTitle}>
              <StarIcon size={20} />
              Ներառված Ծառայություններ
            </h2>
            <ul className={styles.includesList}>
              {tour.includes.map((item, index) => (
                <li key={index} className={styles.includesItem}>
                  ✓ {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking Section */}
        <div className={styles.bookingSection}>
          <h2 className={styles.bookingTitle}> Ամրագրման Ձև</h2>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Մեծահասակներ:</label>
              <input
                type="number"
                min={1}
                max={20}
                value={adults}
                onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
                className={styles.input}
                placeholder="Մեծահասակների քանակ"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Երեխաներ (0-12 տարի):</label>
              <input
                type="number"
                min={0}
                max={10}
                value={children}
                onChange={(e) =>
                  setChildren(Math.max(0, Number(e.target.value)))
                }
                className={styles.input}
                placeholder="Երեխաների քանակ"
              />
            </div>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.priceBreakdown}>
              <span>
                👥 Մեծահասակներ ({adults} x {adultPrice.toLocaleString()} ֏)
              </span>
              <strong>{(adults * adultPrice).toLocaleString()} ֏</strong>
            </div>
            {children > 0 && (
              <div className={styles.priceBreakdown}>
                <span>
                  👶 Երեխաներ ({children} x {childPrice.toLocaleString()} ֏)
                </span>
                <strong>{(children * childPrice).toLocaleString()} ֏</strong>
              </div>
            )}
            <div className={styles.totalPrice}>
              Ընդամենը: {total.toLocaleString()} ֏
            </div>
          </div>

          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={adults === 0}
          >
            Ուղարկել Հայտ
          </button>
        </div>
      </div>
      <Footer/>
    </>
  );
}
