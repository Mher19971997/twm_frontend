"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Tours.module.css";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import { LinksHead } from "../messages/page";
import ProductCard from "@/components/Card/ProductCard";

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

const unique = (arr: any[]) => [...new Set(arr)];

const filters = [
  {
    name: "Categories",
    types: unique(tours.map((tour) => tour.type)),
  },
  {
    name: "Price",
    types: unique(tours.map((tour) => tour.price.toString())),
  },
  {
    name: "Location",
    types: unique(tours.map((tour) => tour.location)),
  },
  {
    name: "Rating",
    types: unique(tours.map((tour) => tour.rating.toString())),
  },
];

const TourismPage: React.FC = () => {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [openFilterSections, setOpenFilterSections] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(filters.map((f) => [f.name, true]))
  );

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return {
        ...prev,
        [category]: updated,
      };
    });
  };

  const toggleFilterSection = (sectionName: string) => {
    setOpenFilterSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const filteredTours = tours.filter((tour) => {
    const categoryMatch =
      !selectedFilters["Categories"] ||
      selectedFilters["Categories"].length === 0 ||
      selectedFilters["Categories"].includes(tour.type);

    const priceMatch =
      !selectedFilters["Price"] ||
      selectedFilters["Price"].length === 0 ||
      selectedFilters["Price"].includes(tour.price.toString());

    const locationMatch =
      !selectedFilters["Location"] ||
      selectedFilters["Location"].length === 0 ||
      selectedFilters["Location"].includes(tour.location);

    const ratingMatch =
      !selectedFilters["Rating"] ||
      selectedFilters["Rating"].length === 0 ||
      selectedFilters["Rating"].includes(tour.rating.toString());

    return categoryMatch && priceMatch && locationMatch && ratingMatch;
  });

  return (
    <>
      <HeaderAccount LinksHead={LinksHead} />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Filters</h2>
          {filters.map((filter) => (
            <div key={filter.name} className={styles.filterBlock}>
              <div
                className={styles.filterHeader}
                onClick={() => toggleFilterSection(filter.name)}
                style={{ cursor: "pointer", fontWeight: "bold", marginBottom: "5px" }}
              >
                {filter.name} {openFilterSections[filter.name] ? "▾" : "▸"}
              </div>
              {openFilterSections[filter.name] &&
                filter.types.map((type) => (
                  <label key={type} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedFilters[filter.name]?.includes(type) || false}
                      onChange={() => handleFilterChange(filter.name, type)}
                    />
                    {type}
                  </label>
                ))}
            </div>
          ))}
        </aside>

        <ProductCard data={filteredTours}/>
      </div>
    </>
  );
};

export default TourismPage;
