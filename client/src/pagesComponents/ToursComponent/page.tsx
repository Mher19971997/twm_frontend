"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Tours.module.css";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import ProductCard from "@/components/Card/ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/types/types";
import { getTours } from "@/redux/actions/toursAction";
import { useCookieValue } from "@/helpers/getCookieInfo";
import { LinksHead } from "@/constants/linksHead";

// Обновленные фильтры для реальных API полей
const filters = [
  {
    name: "tourType",
    label: "Tour Type",
    types: ["package", "individual", "group"],
    filterType: "checkbox", // массив
  },
  {
    name: "status",
    label: "Status",
    types: ["active", "finished", "upcoming"],
    filterType: "radio", // только один вариант
  },
  {
    name: "hotelStars",
    label: "Hotel Stars",
    types: ["3", "4", "5"],
    filterType: "checkbox",
  },
  {
    name: "accommodationType",
    label: "Accommodation",
    types: ["hotel", "resort", "villa", "apartment"],
    filterType: "checkbox",
  },
  {
    name: "includedServices",
    label: "Included Services",
    types: [
      "breakfast",
      "lunch",
      "dinner",
      "wifi",
      "transport",
      "guide",
      "insurance",
    ],
    filterType: "checkbox", // массив
  },
  {
    name: "priceRange",
    label: "Price Range",
    types: ["0-500", "500-1000", "1000-2000", "2000+"],
    filterType: "radio",
  },
  {
    name: "rate",
    label: "Rating",
    types: ["3", "4", "5"],
    filterType: "checkbox",
  },
];

const ToursComponent: React.FC = () => {
  const router = useRouter();
  const token = useCookieValue("authToken");
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [openFilterSections, setOpenFilterSections] = useState<{
    [key: string]: boolean;
  }>(Object.fromEntries(filters.map((f) => [f.name, true])));

  const dispatch = useAppDispatch();
  const toursData: any = useAppSelector((state) => state.tours.data);

  // Функция для создания query объекта из выбранных фильтров
  const buildQueryFromFilters = () => {
    const query: any = {};

    Object.keys(selectedFilters).forEach((filterKey) => {
      const values = selectedFilters[filterKey];
      if (values && values.length > 0) {
        const filterConfig = filters.find((f) => f.name === filterKey);

        if (filterKey === "priceRange") {
          // Обработка диапазона цен
          const priceRange = values[0]; // для radio берем первый (единственный)
          if (priceRange === "0-500") {
            query.minPrice = 0;
            query.maxPrice = 500;
          } else if (priceRange === "500-1000") {
            query.minPrice = 500;
            query.maxPrice = 1000;
          } else if (priceRange === "1000-2000") {
            query.minPrice = 1000;
            query.maxPrice = 2000;
          } else if (priceRange === "2000+") {
            query.minPrice = 2000;
          }
        } else if (filterConfig?.filterType === "radio") {
          // Для radio полей отправляем строку (первый элемент)
          query[filterKey] = values[0];
        } else {
          // Для checkbox полей отправляем массив
          query[filterKey] = values;
        }
      }
    });

    return query;
  };

  // Загружаем туры при изменении фильтров
  useEffect(() => {
    if (token) {
      const query = buildQueryFromFilters();
      dispatch(getTours({ token, query }));
    }
  }, [dispatch, selectedFilters, token]);

  // Первоначальная загрузка
  useEffect(() => {
    if (token) {
      dispatch(getTours({ token, query: {} }));
    }
  }, [dispatch, token]);

  const handleFilterChange = (category: string, value: string) => {
    const filterConfig = filters.find((f) => f.name === category);

    setSelectedFilters((prev) => {
      if (filterConfig?.filterType === "radio") {
        // Для radio - заменяем значение (только один выбор)
        return {
          ...prev,
          [category]: [value],
        };
      } else {
        // Для checkbox - добавляем/убираем из массива
        const current = prev[category] || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return {
          ...prev,
          [category]: updated,
        };
      }
    });
  };

  const toggleFilterSection = (sectionName: string) => {
    setOpenFilterSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  // Функция для очистки всех фильтров
  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  // Подсчет активных фильтров
  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).reduce((count, filterValues) => {
      return count + (filterValues?.length || 0);
    }, 0);
  };

  return (
    <>
      <HeaderAccount LinksHead={LinksHead} />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 className={styles.sidebarTitle}>Filters</h2>
            {getActiveFiltersCount() > 0 && (
              <button
                onClick={clearAllFilters}
                style={{
                  background: "none",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Clear ({getActiveFiltersCount()})
              </button>
            )}
          </div>

          {filters.map((filter) => (
            <div key={filter.name} className={styles.filterBlock}>
              <div
                className={styles.filterHeader}
                onClick={() => toggleFilterSection(filter.name)}
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {filter.label} {openFilterSections[filter.name] ? "▾" : "▸"}
                {selectedFilters[filter.name]?.length > 0 && (
                  <span
                    style={{
                      marginLeft: "8px",
                      fontSize: "12px",
                      color: "#007bff",
                      fontWeight: "normal",
                    }}
                  >
                    ({selectedFilters[filter.name].length})
                  </span>
                )}
              </div>
              {openFilterSections[filter.name] &&
                filter.types.map((type) => (
                  <label key={type} className={styles.checkboxLabel}>
                    <input
                      type={
                        filter.filterType === "radio" ? "radio" : "checkbox"
                      }
                      name={
                        filter.filterType === "radio" ? filter.name : undefined
                      }
                      checked={
                        selectedFilters[filter.name]?.includes(type) || false
                      }
                      onChange={() => handleFilterChange(filter.name, type)}
                    />
                    {type}
                  </label>
                ))}
            </div>
          ))}
        </aside>
        <div>
          <ProductCard
            data={Object.keys(toursData)?.length > 0 ? toursData?.data : []}
          />
        </div>
      </div>

    </>
  );
};

export default ToursComponent;
