"use client";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import React, { useState } from "react";
import Footer from "@/components/footer/Footer";
import styles from "./page.module.css";
import { useAppDispatch } from "@/redux/types/types";
import { createTour } from "@/redux/actions/createTour";
import { LinksHead } from "@/constants/linksHead";

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

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.start_date)
      newErrors.start_date = "Start date is required";
    if (!formData.end_date) newErrors.end_date = "End date is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be a positive number";
    if (formData.rate < 1 || formData.rate > 5)
      newErrors.rate = "Rating must be between 1-5";

    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      newErrors.end_date = "End date must be after start date";
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
        submitData.append(key, value as any);
      }
    });

    if (mainImage) {
      submitData.append("img", mainImage);
    }

    galleryImages.forEach((file: any) => {
      submitData.append("gallery", file);
    });

    for (const pair of submitData.entries()) {
    }

    dispatch(
      createTour({
        data: submitData,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZjMzODFhOTZhYTNlODYzNWJiOGQ0OWM4NWZmYWE4NDRhZDg2MDM3NjY4NWZjOGIxNzYxYzFmZWQ0MDJkYzU2OWRmYzgzMjAiLCJpYXQiOjE3NTE3MjE0NjUsImV4cCI6MTc1MTgwNzg2NX0.xLdHAoWD-avyH339W-UyyZiItSFX9zAmoh9-bz-xsk0",
      })
    );
  };

  return (
    <>
      <HeaderAccount LinksHead={LinksHead} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create New Tour</h1>
          <p className={styles.subtitle}>Fill in all required fields</p>
        </div>

        <div className={styles.form}>
          {/* Main Information Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Basic Information</h2>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                // className={{
                //   ...styles.input,
                //   ...(errors.name ? styles.inputError : {}),
                // }}
                className={`${styles.input} ${errors.name ? styles.inputError : ""
                  }`}
                placeholder="Tour name"
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Start Date *</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.start_date ? styles.inputError : ""
                    }`}
                />
                {errors.start_date && (
                  <span className={styles.error}>{errors.start_date}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>End Date *</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.end_date ? styles.inputError : ""
                    }`}
                />
                {errors.end_date && (
                  <span className={styles.error}>{errors.end_date}</span>
                )}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`${styles.textarea} ${errors.description ? styles.inputError : ""
                  }`}
                placeholder="Detailed tour description"
                rows={4}
              />
              {errors.description && (
                <span className={styles.error}>{errors.description}</span>
              )}
            </div>
          </div>

          {/* Price & Rating Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Price and Rating</h2>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.price ? styles.inputError : {}
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
                <label className={styles.label}>Rating (1-5) *</label>
                <input
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.rate ? styles.inputError : ""
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
                <label className={styles.label}>Tour Category</label>
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
                <label className={styles.label}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location & Details Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Location and Details
            </h2>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Departure Location</label>
                <input
                  type="text"
                  name="fromLocation"
                  value={formData.fromLocation}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g. Yerevan"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Destination</label>
                <input
                  type="text"
                  name="toLocation"
                  value={formData.toLocation}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g. Gyumri"
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Available Seats</label>
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
                <label className={styles.label}>Total Group Size</label>
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
                <label className={styles.label}>Accommodation Type</label>
                <select
                  name="accommodationType"
                  value={formData.accommodationType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">Select...</option>
                  <option value="hotel">Hotel</option>
                  <option value="hostel">Hostel</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="camping">Camping</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Hotel Stars</label>
                <select
                  name="hotelStars"
                  value={formData.hotelStars}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">Select...</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Included Services</label>
              <textarea
                name="includedServices"
                value={formData.includedServices}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Describe included services"
                rows={3}
              />
            </div>
          </div>

          {/* Images Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Images</h2>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Main Image</label>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className={styles.fileInput}
                  id="mainImage"
                />
                <label htmlFor="mainImage" className={styles.fileLabel}>
                  {mainImage ? mainImage.name : "Select image"}
                </label>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Gallery</label>
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
                    ? `${galleryImages.length} images selected`
                    : "Select images"}
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
              Create Tour
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TourCreation;