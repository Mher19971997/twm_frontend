"use client";
import { useEffect, useState } from "react";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import Footer from "@/components/footer/Footer";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/Card/ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/types/types";
import { getTours } from "@/redux/actions/toursAction";
import { useCookieValue } from "@/helpers/getCookieInfo";
import { LinksHead } from "@/constants/linksHead";

const Offer = () => {
  const [selectedType, setSelectedType] = useState<
    "company" | "individual" | null
  >(null);
  const router = useRouter();
  const token = useCookieValue("authToken");
  const dispatch = useAppDispatch();
  const tours: any = useAppSelector((state) => state.tours.data);
  const [organizationData, setOrganizationData] = useState<any>([]);
  const [individual, setIndividual] = useState<any>([]);

  useEffect(() => {
    if (token) {
      dispatch(getTours({ token }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (tours && tours.data) {
      const organizationFilteredData = tours.data.filter(
        (item: any) => item.type === "organisation"
      );
      const individualFilteredData = tours.data.filter(
        (item: any) => item.type === "individual"
      );

      setOrganizationData(organizationFilteredData);
      setIndividual(individualFilteredData);
    }
  }, [tours]);

  return (
    <>
      <HeaderAccount LinksHead={LinksHead} />
      <div className={styles.container}>
        <h1 className={styles.title}>Choose Type of Tours</h1>

        <div className={styles.selectionGrid}>
          <div
            className={`${styles.card} ${selectedType === "company" ? styles.active : ""
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
            className={`${styles.card} ${selectedType === "individual" ? styles.active : ""
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
                <ProductCard data={organizationData} />
              </div>
            ) : (
              <div className={styles.fadeIn}>
                <h2>Individual Trips</h2>
                <ProductCard data={individual} />
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
