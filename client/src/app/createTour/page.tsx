"use client";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import React, { useState } from "react";
import { LinksHead } from "../messages/page";
import Footer from "@/components/footer/Footer";
import styles from "./page.module.css";
import { useAppDispatch } from "@/redux/types/types";
import { createTour } from "@/redux/actions/createTour";

const TourCreation = () => {
  const [formData, setFormData] = useState<any>({
    name: "",
    start_date: "",
    end_date: "",
    description: "",
    price: "",
    rate: 1,
    tourType: "package",
    status: "active",
    fromLocation: "",
    toLocation: "",
    availableSeats: "",
    totalGroupSixze: "",
    accommodationType: "",
    hotelStars: "",
    includedServices: "",
  });

  const [mainImage, setMainImage] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<any>([]);
  const [errors, setErrors] = useState<any>({});
  // const [] = useState([]);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleMainImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleGalleryImagesChange = (e: any) => {
    const files = Array.from(e.target.files);
    setGalleryImages(files);
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Անունը պարտադիր է";
    if (!formData.start_date)
      newErrors.start_date = "Մեկնարկի ամսաթիվը պարտադիր է";
    if (!formData.end_date) newErrors.end_date = "Ավարտի ամսաթիվը պարտադիր է";
    if (!formData.description.trim())
      newErrors.description = "Նկարագրությունը պարտադիր է";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Գինը պետք է լինի դրական թիվ";
    if (formData.rate < 1 || formData.rate > 5)
      newErrors.rate = "Գնահատականը պետք է լինի 1-5 միջակայքում";

    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      newErrors.end_date = "Ավարտի ամսաթիվը պետք է լինի մեկնարկից հետո";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = () => {
  if (!validateForm()) {
    return;
  }

  const submitData = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null && value !== "") {
      console.log(`${key}: ${value}`);
      submitData.append(key, value as any);
    }
  });

  if (mainImage) {
    submitData.append("img", mainImage);
  }

  galleryImages.forEach((file:any) => {
    submitData.append("gallery", file);
  });

  for (const pair of submitData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  dispatch(
    createTour({
      data: submitData,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZjMzODFhOTZhYTNlODYzNWJiOGQ0OWM4NWZmYWE4NDRhZDg2MDM3NjY4NWZjOGIxNzYxYzFmZWQ0MDJkYzU2OWRmYzgzMjAiLCJpYXQiOjE3NTE3MjE0NjUsImV4cCI6MTc1MTgwNzg2NX0.xLdHAoWD-avyH339W-UyyZiItSFX9zAmoh9-bz-xsk0",
    })
  );
};

  console.log("formData", formData);

  return (
    <>
      <HeaderAccount LinksHead={LinksHead} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Ստեղծել Նոր Տուր</h1>
          <p className={styles.subtitle}>Լրացրեք բոլոր անհրաժեշտ դաշտերը</p>
        </div>

        <div className={styles.form}>
          {/* Main Information Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Հիմնական Տեղեկություններ</h2>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Անուն *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                // className={{
                //   ...styles.input,
                //   ...(errors.name ? styles.inputError : {}),
                // }}
                className={`${styles.input} ${
                  errors.name ? styles.inputError : ""
                }`}
                placeholder="Տուր-ի անունը"
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Մեկնարկի Ամսաթիվ *</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.start_date ? styles.inputError : ""
                  }`}
                />
                {errors.start_date && (
                  <span className={styles.error}>{errors.start_date}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Ավարտի Ամսաթիվ *</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.end_date ? styles.inputError : ""
                  }`}
                />
                {errors.end_date && (
                  <span className={styles.error}>{errors.end_date}</span>
                )}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Նկարագրություն *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`${styles.textarea} ${
                  errors.description ? styles.inputError : ""
                }`}
                placeholder="Տուր-ի մանրամասն նկարագրություն"
                rows={4}
              />
              {errors.description && (
                <span className={styles.error}>{errors.description}</span>
              )}
            </div>
          </div>

          {/* Price & Rating Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Գին և Գնահատական</h2>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Գին *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.price ? styles.inputError : {}
                  }`}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
                {errors.price && (
                  <span className={styles.error}>{errors.price}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Գնահատական (1-5) *</label>
                <input
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.rate ? styles.inputError : ""
                  }`}
                  min="1"
                  max="5"
                  step="0.1"
                />
                {errors.rate && (
                  <span className={styles.error}>{errors.rate}</span>
                )}
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Տուրի Կատեգորիան</label>
                <select
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="package">Carpool</option>
                  {/* <option value="custom">Custom</option> */}
                  <option value="group">Group</option>
                  <option value="package">Package</option>
                  {/* <option value="individual">Individual</option> */}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Կարգավիճակ</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="active">Ակտիվ</option>
                  <option value="inactive">Ոչ ակտիվ</option>
                  <option value="draft">Նախագիծ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location & Details Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Տեղակայություն և Մանրամասներ
            </h2>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Մեկնարկի Վայր</label>
                <input
                  type="text"
                  name="fromLocation"
                  value={formData.fromLocation}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Օրինակ՝ Երևան"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Նպատակակետ</label>
                <input
                  type="text"
                  name="toLocation"
                  value={formData.toLocation}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Օրինակ՝ Գյումրի"
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Հասանելի Տեղեր</label>
                <input
                  type="number"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Խմբի Ընդհանուր Չափ</label>
                <input
                  type="number"
                  name="totalGroupSize"
                  value={formData.totalGroupSize}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Բնակարանի Տիպ</label>
                <select
                  name="accommodationType"
                  value={formData.accommodationType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">Ընտրել...</option>
                  <option value="hotel">Հյուրանոց</option>
                  <option value="hostel">Հոստել</option>
                  <option value="apartment">Բնակարան</option>
                  <option value="villa">Վիլլա</option>
                  <option value="camping">Ճամբարային</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Հյուրանոցի Աստղեր</label>
                <select
                  name="hotelStars"
                  value={formData.hotelStars}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">Ընտրել...</option>
                  <option value="1">1 Աստղ</option>
                  <option value="2">2 Աստղ</option>
                  <option value="3">3 Աստղ</option>
                  <option value="4">4 Աստղ</option>
                  <option value="5">5 Աստղ</option>
                </select>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Ներառված Ծառայություններ</label>
              <textarea
                name="includedServices"
                value={formData.includedServices}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Նկարագրեք ներառված ծառայությունները"
                rows={3}
              />
            </div>
          </div>

          {/* Images Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Նկարներ</h2>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Հիմնական Նկար</label>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className={styles.fileInput}
                  id="mainImage"
                />
                <label htmlFor="mainImage" className={styles.fileLabel}>
                  {mainImage ? mainImage.name : "Ընտրել նկար"}
                </label>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Պատկերասրահ</label>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImagesChange}
                  className={styles.fileInput}
                  id="galleryImages"
                />
                <label htmlFor="galleryImages" className={styles.fileLabel}>
                  {galleryImages.length > 0
                    ? `${galleryImages.length} նկար ընտրված`
                    : "Ընտրել նկարներ"}
                </label>
              </div>
              {galleryImages.length > 0 && (
                <div className={styles.selectedFiles}>
                  {galleryImages.map((file: any, index: number) => (
                    <span key={index} className={styles.fileName}>
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.submitSection}>
            <button
              onClick={handleSubmit}
              className={styles.submitButton}
              // onMouseEnter={(e: any) => {
              //   Object.assign(e.target.style, styles.submitButtonHover);
              // }}
              // onMouseLeave={(e: any) => {
              //   Object.assign(e.target.style, styles.submitButton);
              // }}
            >
              Ստեղծել Տուր
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TourCreation;
