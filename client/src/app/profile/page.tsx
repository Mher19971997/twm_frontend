"use client";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import React, { useState, useEffect, useActionState } from "react";
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
import { useDispatch } from "react-redux";
import { profileOrganisation } from "@/redux/actions/profileOrganisation";
import { useAppDispatch, useAppSelector } from "@/redux/types/types";
import { profileIndividual } from "@/redux/actions/profileIndividual";
import { profileClient } from "@/redux/actions/profileClient";
import { getTours } from "@/redux/actions/toursAction";
import { useCookieValue } from "@/helpers/getCookieInfo";

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
      author: "Anush Hakobyan",
      text: "Excellent organization, professional guide and unforgettable impressions. Thank you!",
      rating: 5,
      date: "May 2024",
    },
    {
      id: 2,
      author: "David Sargsyan",
      text: "High-quality service and interesting program. I recommend it to everyone!",
      rating: 5,
      date: "April 2024",
    },
    {
      id: 3,
      author: "Mariam Avetisyan",
      text: "It was well organized, but could have been more detailed about some places.",
      rating: 4,
      date: "March 2024",
    },
  ]);
  const [completedTours, setCompletedTours] = useState<any>([]);

  const dispatch = useAppDispatch();

  const userType = useCookieValue("userType");
  const token = useCookieValue("authToken");
  const profileClientData = useAppSelector((state) => state.profileClient.data);
  const profileIndividualData = useAppSelector(
    (state) => state.profileIndividual.data
  );
  const profileOrganisationData = useAppSelector(
    (state) => state.profileOrganisation.data
  );

  const tours: any = useAppSelector((state) => state.tours.data);

  const profile: any =
    userType === "auth_organisation"
      ? profileOrganisationData
      : userType === "auth_individual"
      ? profileIndividualData
      : profileClientData;

  useEffect(() => {
    if (token) {
      dispatch(getTours({ token }));

      const getToursData = async () => {
        const response = await dispatch(
          getTours({
            token,
            query: {
              status: "finished",
            },
          })
        );
        setCompletedTours(response.payload.data);
      };
      getToursData();
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      if (userType === "auth_organisation") {
        dispatch(profileOrganisation(token));
      } else if (userType === "auth_individual") {
        dispatch(profileIndividual(token));
      } else if (userType === "auth_client") {
        dispatch(profileClient(token));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const cookies = parseCookies();
        const authToken = cookies.authToken;
        const refreshToken = cookies.refreshToken;
        const userType = cookies.userType;

        if (!authToken || !refreshToken || !userType) {
          router.push("/");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#6c757d",
        }}
      >
        Loading...
      </div>
    );
  }

  const feedback = feedbackList;

  const handleSubmitFeedback = (e: any) => {
    e.preventDefault();
    if (newFeedback.author.trim() && newFeedback.text.trim()) {
      const feedback = {
        id: Date.now(),
        author: newFeedback.author.trim(),
        text: newFeedback.text.trim(),
        rating: newFeedback.rating,
        date: new Date().toLocaleDateString("en-US", {
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
      <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Add New Review</h3>

      <div className={styles.formGroup}>
        <label className={styles.label}>Your Name *</label>
        <input
          type="text"
          className={styles.input}
          value={newFeedback.author}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, author: e.target.value })
          }
          placeholder="Enter your name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Rating *</label>
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
            {newFeedback.rating} stars
          </span>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Your Review *</label>
        <textarea
          className={styles.textarea}
          value={newFeedback.text}
          onChange={(e) =>
            setNewFeedback({ ...newFeedback, text: e.target.value })
          }
          placeholder="Write your review..."
          required
        />
      </div>

      <div className={styles.formButtons}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancelFeedback}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const renderTourCard = (tour: any, type: any) => (
    <div
      key={tour.uuid}
      className={`${styles.tourCard} ${
        hoveredTour === tour.id ? styles.tourCardHover : ""
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
          src={process.env.NEXT_PUBLIC_APP_IMAGE_URL + tour.img}
          alt={tour.title}
          className={`${styles.tourImage} ${
            hoveredTour === tour.id ? styles.tourImageHover : ""
          }`}
        />
      </div>
      <div className={styles.tourContent}>
        <div className={styles.tourTitle}>{tour.name}</div>
        <div className={styles.tourDetails}>
          <div className={styles.tourDetail}>
            <CalendarIcons size={16} />
            <span>
              {tour.start_date} | {tour.end_date}
            </span>
          </div>
          <div className={styles.tourDetail}>
            <UsersIcon size={16} />
            <span>{tour.participants} participants</span>
          </div>
        </div>
        {/* <div className={styles.tourPrice}>{tour.price} $</div> */}
        <div className={styles.tourPrice}>{tour.price} $</div>
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
              src={(profile?.image as any) ?? "./assets/user.png"}
              alt="Profile"
              className={styles.profileImage}
            />
            <div className={styles.profileDetails}>
              {userType !== "auth_client" ? (
                <>
                  <h1 className={styles.organizationName}>{profile.name}</h1>
                  <div className={styles.address}>
                    {/* <MapPinIcon size={16} /> */}
                    {/* <span>{user.address}</span> */}
                  </div>
                </>
              ) : (
                <h1 className={styles.userName}>
                  {profile.name}
                  {/* //{user.lastName} */}
                </h1>
              )}

              <div className={styles.rating}>
                <div className={styles.stars}>
                  {renderStars(profile?.rating)}
                </div>
                {/* <span>{user.rating}</span> */}
                <span style={{ color: "#6c757d" }}>
                  {/* ({user.reviewCount} reviews) */}
                </span>
              </div>

              {userType !== "auth_client" && (
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <PhoneIcon size={16} />
                    <span>{profile.phone}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <MailIcon size={16} />
                    <span>{profile.email}</span>
                  </div>
                  {/* <div className={styles.contactItem}>
                    <GlobeIcon size={16} />
                    <span>{user.website}</span>
                  </div> */}
                </div>
              )}
            </div>
          </div>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "end" }}
          >
            <button style={{ border: "none", background: "none", color:"#03379b", fontSize:"18px", fontWeight:"500" }} onClick={() => router.push("/createTour")}>
              Create a Tour
            </button>
          </div>
        </div>

        {/* Tourism Organization Sections */}
        {userType !== "auth_client" && (
          <>
            {/* Upcoming Tours */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Offered Tours</h2>
              <div className={styles.toursGrid}>
                {tours?.data?.map((tour: any) =>
                  renderTourCard(tour, "upcoming")
                )}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Completed Tours</h2>
              <div className={styles.toursGrid}>
                {completedTours?.map((tour: any) =>
                  renderTourCard(tour, "completed")
                )}
              </div>
            </div>

            {/* Feedback Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <MessageCircleIcon size={24} />
                <span style={{ marginLeft: "10px" }}>Customer Reviews</span>
              </h2>

              {!showFeedbackForm && (
                <button
                  className={styles.addFeedbackButton}
                  onClick={() => setShowFeedbackForm(true)}
                >
                  + Add Review
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
