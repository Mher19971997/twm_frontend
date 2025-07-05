"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import { LinksHead } from "@/app/messages/page";
import Footer from "@/components/footer/Footer";
import { Toaster, toast } from "react-hot-toast";

const tours = [
  {
    id: 1,
    name: "Paris Getaway",
    destination: "Paris, France",
    image: "/assets/alps.jfif",
    description: "A luxury stay in a 4-star hotel with breakfast included.",
    dateTime: "2025-08-10 09:00",
    includes: ["Hotel", "Flight", "Breakfast", "City Tour"],
    price: 50000,
    location: "France",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Alps Adventure",
    destination: "Swiss Alps",
    image: "/assets/Kenya.jfif",
    description: "Explore snowy mountains with full-board accommodation.",
    dateTime: "2025-09-12 07:00",
    includes: ["Hotel", "Transfer", "Breakfast", "Hiking Guide"],
    price: 90000,
    location: "Switzerland",
    rating: 4.8,
  },
];

export default function TourDetailPage() {
  const params = useParams();
  const tourId = Number(params.id);
  const tour = tours.find((t) => t.id === tourId);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const total = tour ? adults * tour.price + children * (tour.price * 0.5) : 0;

  const handleSubmit = () => {
    toast.success("Request sent successfully ✅", {
      duration: 3000,
      style: {
        borderBottom: "3px solid #22c55e", // Green line at the bottom
        padding: "12px 16px",
        fontWeight: "500",
      },
    });
  };

  if (!tour) return <p style={{ padding: "20px" }}>Tour not found</p>;

  return (
    <>
      <HeaderAccount LinksHead={LinksHead} />
      <div className={styles.container}>
        <h1 className={styles.title}>{tour.name}</h1>
        <img src={tour.image} alt={tour.name} className={styles.image} />

        <p className={styles.text}>
          <span className={styles.label}>Destination:</span> {tour.destination}
        </p>
        <p className={styles.text}>
          <span className={styles.label}>Description:</span> {tour.description}
        </p>
        <p className={styles.text}>
          <span className={styles.label}>Date & Time:</span> {tour.dateTime}
        </p>
        <p className={styles.text}>
          <span className={styles.label}>Includes:</span>{" "}
          {tour.includes.join(", ")}
        </p>
        <p className={`${styles.text} ${styles.rating}`}>
          <span className={styles.label}>Rating:</span> {tour.rating} ⭐
        </p>

        <div className={styles.inputRow}>
          <div>
            <label className={styles.label}>Adults:</label>
            <input
              type="number"
              min={1}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
            />
          </div>
          <div>
            <label className={styles.label}>Children:</label>
            <input
              type="number"
              min={0}
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
            />
          </div>
        </div>

        <p className={styles.totalPrice}>
          <span className={styles.label}>Total Price:</span> {total} ֏
        </p>

        <button className={styles.button} onClick={handleSubmit}>
          Send Request
        </button>
      </div>

      {/* Toast component */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#fff",
            color: "#333",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#e0f2f1",
            },
          },
        }}
      />

      <Footer />
    </>
  );
}
