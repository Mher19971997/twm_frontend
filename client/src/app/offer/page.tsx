"use client";
import { useState } from "react";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import Footer from "@/components/footer/Footer";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/Card/ProductCard";

const touristCompanies = [
  {
    name: "Vardan Travel",
    tours: ["Paris Tour", "Yerevan City Tour", "Dilijan Weekend"],
  },
  {
    name: "HayTour",
    tours: ["Lake Sevan Relax", "Tatev Adventure"],
  },
];

const tours = [
  {
    id: 1,
    name: "Paris Getaway",
    destination: "Paris, France",
    image: "./assets/alps.jfif",
    type: "City",
    price: 50000,
    location: "France",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Alps Adventure",
    destination: "Swiss Alps",
    image: "./assets/Kenya.jfif",
    type: "Mountain",
    price: 90000,
    location: "Switzerland",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Maldives Escape",
    destination: "Maldives",
    image: "./assets/maldivs.jfif",
    type: "Beach",
    price: 100000,
    location: "Maldives",
    rating: 5,
  },
  {
    id: 4,
    name: "Safari Journey",
    destination: "Kenya",
    image: "./assets/paris.avif",
    type: "Wildlife",
    price: 40000,
    location: "Kenya",
    rating: 4.2,
  },
  {
    id: 5,
    name: "Tokyo Tour",
    destination: "Tokyo, Japan",
    image: "./assets/tokyo.jfif",
    type: "City",
    price: 20000,
    location: "Japan",
    rating: 4.3,
  },
];

const individualTrips = [
  {
    name: "Anna's Hiking Trip",
    details: "A small group hike to Aragats",
  },
  {
    name: "Gev's Road Trip",
    details: "Road trip from Yerevan to Artsakh",
  },
];

const Offer = () => {
  const [selectedType, setSelectedType] = useState<
    "company" | "individual" | null
  >(null);
  const router = useRouter();

  return (
    <>
      <HeaderAccount LinksHead={[]} />
      <div className={styles.container}>
        <h1 className={styles.title}>Choose Type of Tours</h1>

        <div className={styles.selectionGrid}>
          <div
            className={`${styles.card} ${
              selectedType === "company" ? styles.active : ""
            }`}
            onClick={() => setSelectedType("company")}
          >
            <img
              src="./assets/servizis.webp"
              alt="Tourist Agencies"
              className={styles.image}
            />
            <p>Tourist Agencies</p>
          </div>

          <div
            className={`${styles.card} ${
              selectedType === "individual" ? styles.active : ""
            }`}
            onClick={() => setSelectedType("individual")}
          >
            <img
              src="./assets/test1.webp"
              alt="Individual Trips"
              className={styles.image}
            />
            <p>Individual Trips</p>
          </div>
        </div>

        {selectedType && (
          <div className={styles.resultSection}>
            {selectedType === "company" ? (
              <div className={styles.fadeIn}>
                <h2>Tourist Agencies</h2>
                                <ProductCard data={tours} />

              </div>
            ) : (
              <div className={styles.fadeIn}>
                <h2>Individual Trips</h2>
                <ProductCard data={tours} />
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Offer;
