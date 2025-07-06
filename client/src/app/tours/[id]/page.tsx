"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import { LinksHead } from "@/constants/linksHead";
import Footer from "@/components/footer/Footer";
import { MapPinIcons } from "../../../../public/assets/svg/MapPinIcons";
import { CalendarsIcon } from "../../../../public/assets/svg/CalendarsIcon";
import { ClockIcon } from "../../../../public/assets/svg/ClockIcon";
import { UsersIcons } from "../../../../public/assets/svg/UsersIcons";
import { InfoIcon } from "../../../../public/assets/svg/InfoIcon";
import { StarIcon } from "../../../../public/assets/svg/StarIcon";
import { useAppDispatch, useAppSelector } from "@/redux/types/types";
import { getSingleTour } from "@/redux/actions/singleTour";
import { useCookieValue } from "@/helpers/getCookieInfo";

export default function TourDetailPage() {
  const params = useParams();
  const tourId = params.id;

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useAppDispatch();
  const token = useCookieValue("authToken");
  const tourData: any = useAppSelector((state) => state.singleTour.data);

  useEffect(() => {
    if (token) {
      dispatch(getSingleTour({ uuid: tourId, token }));
    }
  }, [dispatch]);

  if (!tourData) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Tour not found</h1>
          <p>Please try searching for another tour</p>
          <button
            className={styles.backButton}
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const adultPrice = tourData.price;
  const childPrice = tourData.price * 0.5;
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
      <HeaderAccount LinksHead={LinksHead} />
      <div className={styles.container}>
        {/* Toast notification */}
        {showToast && (
          <div className={styles.toast}>
            ✅ Your request has been sent successfully!
          </div>
        )}

        {/* Tour Header */}
        <div className={styles.tourHeader}>
          <div className={styles.imageContainer}>
            <img
              src={process.env.NEXT_PUBLIC_APP_IMAGE_URL + tourData?.img}
              alt={tourData.name}
              className={styles.tourImage}
            />
          </div>
          <div className={styles.tourContent}>
            <h1 className={styles.title}>{tourData.name}</h1>
            <div className={styles.destination}>
              <MapPinIcons size={20} />
              {tourData.destination}
            </div>
            <div className={styles.rating}>
              {renderStars(tourData.rate)}
              <span>
                {tourData.rating} ({tourData.rate} reviews)
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
              Description
            </h2>
            <p className={styles.detailText}>{tourData.description}</p>
          </div>

          {/* Tour Info */}
          <div className={styles.detailCard}>
            <h2 className={styles.detailTitle}>
              <CalendarsIcon size={20} />
              Tour Details
            </h2>
            <div className={styles.infoItem}>
              <CalendarsIcon size={16} />
              <span>
                <span className={styles.label}>Date:</span> {tourData.dateTime}
              </span>
            </div>
            <div className={styles.infoItem}>
              <ClockIcon size={16} />
              <span>
                <span className={styles.label}>Duration:</span>{" "}
                {tourData.duration}
              </span>
            </div>
            <div className={styles.infoItem}>
              <UsersIcons size={16} />
              <span>
                <span className={styles.label}>Group size:</span>{" "}
                {tourData.groupSize}
              </span>
            </div>
            <div className={styles.infoItem}>
              <MapPinIcons size={16} />
              <span>
                <span className={styles.label}>Location:</span>{" "}
                {tourData.location}
              </span>
            </div>
          </div>

          {/* Includes */}
          <div className={styles.detailCard}>
            <h2 className={styles.detailTitle}>
              <StarIcon size={20} />
              Included Services
            </h2>
            <ul className={styles.includesList}>
              {/* {tourData.includes.map((item, index) => (
                <li key={index} className={styles.includesItem}>
                  ✓ {item}
                </li>
              ))} */}
            </ul>
          </div>
        </div>

        {/* Booking Section */}
        <div className={styles.bookingSection}>
          <h2 className={styles.bookingTitle}>Booking Form</h2>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Adults:</label>
              <input
                type="number"
                min={1}
                max={20}
                value={adults}
                onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
                className={styles.input}
                placeholder="Number of adults"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Children (0-12 years):
              </label>
              <input
                type="number"
                min={0}
                max={10}
                value={children}
                onChange={(e) =>
                  setChildren(Math.max(0, Number(e.target.value)))
                }
                className={styles.input}
                placeholder="Number of children"
              />
            </div>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.priceBreakdown}>
              <span>
                👥 Adults ({adults} x {adultPrice?.toLocaleString()} ֏)
              </span>
              <strong>{(adults * adultPrice).toLocaleString()} ֏</strong>
            </div>
            {children > 0 && (
              <div className={styles.priceBreakdown}>
                <span>
                  👶 Children ({children} x {childPrice.toLocaleString()} ֏)
                </span>
                <strong>{(children * childPrice).toLocaleString()} ֏</strong>
              </div>
            )}
            <div className={styles.totalPrice}>
              Total: {total.toLocaleString()} ֏
            </div>
          </div>

          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={adults === 0}
          >
            Submit Request
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
