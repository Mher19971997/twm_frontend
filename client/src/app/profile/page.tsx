"use client";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { LinksHead } from "../messages/page";
import Footer from "@/components/footer/Footer";
import { StarIcon } from "../../../public/assets/svg/StarIcon";
import { MapPinIcon } from "../../../public/assets/svg/MapPinIcon";
import { CalendarIcons } from "../../../public/assets/svg/CalendarIcons";
import { UsersIcon } from "../../../public/assets/svg/UsersIcon";
import { MessageCircleIcon } from "../../../public/assets/svg/MessageCircleIcon";
import { PhoneIcon } from "../../../public/assets/svg/PhoneIcon";
import { MailIcon } from "../../../public/assets/svg/MailIcon";
import { GlobeIcon } from "../../../public/assets/svg/GlobeIcon";
// import { styles } from "./styles";
import styles from "./page.module.css";

const ProfilePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredTour, setHoveredTour] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    author: "",
    text: "",
    rating: 5,
  });
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      author: "Անուշ Հակոբյան",
      text: "Հրաշալի կազմակերպություն, պրոֆեսիոնալ գիդ և անմոռանալի տպավորություններ: Շնորհակալություն:",
      rating: 5,
      date: "2024 Մայիս",
    },
    {
      id: 2,
      author: "Դավիթ Սարգսյան",
      text: "Բարձրակարգ սպասարկում և հետաքրքիր ծրագիր: Բոլորին խորհուրդ եմ տալիս:",
      rating: 5,
      date: "2024 Ապրիլ",
    },
    {
      id: 3,
      author: "Մարիամ Ավետիսյան",
      text: "Լավ կազմակերպված էր, բայց կարելի էր ավելի մանրամասն լինել մի քանի տեղերի մասին:",
      rating: 4,
      date: "2024 Մարտ",
    },
  ]);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const cookies = parseCookies();
        const authToken = cookies.authToken;
        const refreshToken = cookies.refreshToken;
        const userType = cookies.userType;

        if (!authToken || !refreshToken || !userType) {
          router.push('/');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#6c757d'
      }}>
        Loading...
      </div>
    );
  }

  // Sample data - in real app this would come from props or API
  const user = {
    isTourismOrganization: true, // Change to false to see regular user profile
    name: "Հայկական Արվենտուր",
    firstName: "Արամ",
    lastName: "Գրիգորյան",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=face",
    address: "Երևան, Մաշտոցի պող. 15",
    rating: 4.8,
    reviewCount: 156,
    phone: "+374 77 123456",
    email: "info@armenianadventure.am",
    website: "www.armenianadventure.am",
  };

  const completedTours = [
    {
      id: 1,
      title: "Տաթևի Հուշարձան և Ջերմուկ",
      duration: "2 օր",
      participants: 25,
      date: "2024 Մայիս",
      price: "45,000 ֏",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      title: "Սևանա Լիճ և Դիլիջան",
      duration: "1 օր",
      participants: 18,
      date: "2024 Մարտ",
      price: "25,000 ֏",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
    },
  ];

  const upcomingTours = [
    {
      id: 3,
      title: "Գեղարդ և Գառնի",
      duration: "1 օր",
      participants: 15,
      date: "2024 Դեկտեմբեր 15",
      price: "20,000 ֏",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop",
    },
    {
      id: 4,
      title: "Խոր Վիրապ և Արենի Գինեգործարան",
      duration: "1 օր",
      participants: 20,
      date: "2024 Դեկտեմբեր 22",
      price: "35,000 ֏",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&sat=-20",
    },
  ];

  const feedback = feedbackList;

  const handleSubmitFeedback = (e: any) => {
    e.preventDefault();
    if (newFeedback.author.trim() && newFeedback.text.trim()) {
      const feedback = {
        id: Date.now(),
        author: newFeedback.author.trim(),
        text: newFeedback.text.trim(),
        rating: newFeedback.rating,
        date: new Date().toLocaleDateString("hy-AM", {
          year: "numeric",
          month: "long",
        }),
      };

      setFeedbackList([feedback, ...feedbackList]);
      setNewFeedback({ author: "", text: "", rating: 5 });
      setShowFeedbackForm(false);
    }
  };

  const handleCancelFeedback = () => {
    setNewFeedback({ author: "", text: "", rating: 5 });
    setShowFeedbackForm(false);
  };

  const handleRatingClick = (rating: any) => {
    setNewFeedback({ ...newFeedback, rating });
  };

  const renderFeedbackForm = () => (
    <form className={styles.feedbackForm} onSubmit={handleSubmitFeedback}>
      <h3 style={{ marginTop: 0, color: "#2c3e50" }}>
        Ավելացնել նոր գնահատական
      </h3>

      <div className={styles.formGroup}>
        <label className={styles.label}>Ձեր անունը *</label>
        <input
          type="text"
          className={styles.input}
          value={newFeedback.author}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, author: e.target.value })
          }
          placeholder="Մուտքագրեք ձեր անունը"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Գնահատական *</label>
        <div className={styles.ratingSelector}>
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index}
              type="button"
              className={styles.ratingStarButton}
              onClick={() => handleRatingClick(index + 1)}
            >
              <StarIcon
                size={24}
                fill={index < newFeedback.rating ? "#ffc107" : "none"}
                stroke={index < newFeedback.rating ? "#ffc107" : "#ddd"}
              />
            </button>
          ))}
          <span style={{ marginLeft: "10px", color: "#6c757d" }}>
            {newFeedback.rating} աստղ
          </span>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Ձեր կարծիքը *</label>
        <textarea
          className={styles.textarea}
          value={newFeedback.text}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, text: e.target.value })
          }
          placeholder="Գրեք ձեր կարծիքը..."
          required
        />
      </div>

      <div className={styles.formButtons}>
        <button type="submit" className={styles.submitButton}>
          Ուղարկել
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancelFeedback}
        >
          Չեղարկել
        </button>
      </div>
    </form>
  );

  const renderTourCard = (tour: any, type: any) => (
    <div
      key={tour.id}
      className={`${styles.tourCard} ${hoveredTour === tour.id ? styles.tourCardHover : ""
        }`}
      onMouseEnter={() => setHoveredTour(tour.id)}
      onMouseLeave={() => setHoveredTour(null)}
    >
      <div
        style={{
          overflow: "hidden",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <img
          src={tour.image}
          alt={tour.title}
          className={`${styles.tourImage} ${hoveredTour === tour.id ? styles.tourImageHover : ""
            }`}
        />
      </div>
      <div className={styles.tourContent}>
        <div className={styles.tourTitle}>{tour.title}</div>
        <div className={styles.tourDetails}>
          <div className={styles.tourDetail}>
            <CalendarIcons size={16} />
            <span>
              {tour.duration} | {tour.date}
            </span>
          </div>
          <div className={styles.tourDetail}>
            <UsersIcon size={16} />
            <span>{tour.participants} մասնակից</span>
          </div>
        </div>
        <div className={styles.tourPrice}>{tour.price}</div>
      </div>
    </div>
  );

  const renderStars = (rating: any) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        size={16}
        fill={index < Math.floor(rating) ? "#ffc107" : "none"}
        stroke={index < Math.floor(rating) ? "#ffc107" : "#ddd"}
      />
    ));
  };

  return (
    <>
      <HeaderAccount LinksHead={LinksHead} />
      <div className={styles.profileContainer}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <img
              src={user.image}
              alt="Profile"
              className={styles.profileImage}
            />
            <div className={styles.profileDetails}>
              {user.isTourismOrganization ? (
                <>
                  <h1 className={styles.organizationName}>{user.name}</h1>
                  <div className={styles.address}>
                    <MapPinIcon size={16} />
                    <span>{user.address}</span>
                  </div>
                </>
              ) : (
                <h1 className={styles.userName}>
                  {user.firstName} {user.lastName}
                </h1>
              )}

              <div className={styles.rating}>
                <div className={styles.stars}>{renderStars(user.rating)}</div>
                <span>{user.rating}</span>
                <span style={{ color: "#6c757d" }}>
                  ({user.reviewCount} գնահատական)
                </span>
              </div>

              {user.isTourismOrganization && (
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <PhoneIcon size={16} />
                    <span>{user.phone}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <MailIcon size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <GlobeIcon size={16} />
                    <span>{user.website}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tourism Organization Sections */}
        {user.isTourismOrganization && (
          <>
            {/* Upcoming Tours */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Առաջարկվող Տուռեր</h2>
              <div className={styles.toursGrid}>
                {upcomingTours.map((tour) => renderTourCard(tour, "upcoming"))}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Անցկացված Տուռեր</h2>
              <div className={styles.toursGrid}>
                {completedTours.map((tour) =>
                  renderTourCard(tour, "completed")
                )}
              </div>
            </div>

            {/* Feedback Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <MessageCircleIcon size={24} />
                <span style={{ marginLeft: "10px" }}>
                  Հաճախորդների Կարծիքներ
                </span>
              </h2>

              {!showFeedbackForm && (
                <button
                  className={styles.addFeedbackButton}
                  onClick={() => setShowFeedbackForm(true)}
                >
                  + Ավելացնել կարծիք
                </button>
              )}

              {showFeedbackForm && renderFeedbackForm()}

              <div className={styles.feedbackSection}>
                {feedback.map((item) => (
                  <div key={item.id} className={styles.feedbackItem}>
                    <div className={styles.feedbackAuthor}>
                      {item.author} • {item.date}
                    </div>
                    <div className={styles.feedbackText}>{item.text}</div>
                    <div className={styles.feedbackRating}>
                      {renderStars(item.rating)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;