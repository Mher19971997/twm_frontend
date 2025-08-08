"use client";
import HeaderAccount from "@/layouts/basicHeader/HeaderAccount";
import React, { useState } from "react";
import Footer from "@/components/footer/Footer";
import styles from "./page.module.css";
import { useAppDispatch } from "@/redux/types/types";
import { createTour } from "@/redux/actions/createTour";
import { LinksHead } from "@/constants/linksHead";
import { useTranslations } from "next-intl";
import { useCookieValue } from "@/helpers/getCookieInfo";
import MapComponent from "@/components/MapComponent/MapComponent";

type Lang = "hy" | "en" | "ru";
type Stop = {
  location: string;
  untilDate: string;
};
const CreateTourComponent = () => {
  const t = useTranslations("CreateTour");
  const token = useCookieValue("authToken");
  const [formData, setFormData] = useState<any>({
    name: {
      hy: "",
      en: "",
      ru: "",
    },
    start_date: "",
    end_date: "",
    description: {
      hy: "",
      en: "",
      ru: "",
    },
    price: "",
    rate: 1,
    tourType: "package",
    status: "active",
    fromLocation: "",
    toLocation: "",
    availableSeats: "",
    totalGroupSize: "",
    accommodationType: "",
    hotelStars: "",
    includedServices: {
      hy: "",
      en: "",
      ru: "",
    },
  });
  const [servicesactiveLang, setServicesactiveLang] = useState<Lang>("hy");
  const [activeLang, setActiveLang] = useState<Lang>("hy");
  const [nameActiveLang, setNameActiveLang] = useState<Lang>("hy");
  const [mainImage, setMainImage] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<any>([]);
  const [errors, setErrors] = useState<any>({});
  const dispatch = useAppDispatch();
  const [stops, setStops] = useState<Stop[]>([
    { location: "", untilDate: "" },
    { location: "", untilDate: "" }
  ]);


  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "description") {
      setFormData((prev: any) => ({
        ...prev,
        description: {
          ...prev.description,
          [activeLang]: value,
        }
      }));
    } else if (name === "name") {
      setFormData((prev: any) => ({
        ...prev,
        name: {
          ...prev.name,
          [nameActiveLang]: value,
        }
      }));
    } else if (name === "includedServices") {
      setFormData((prev: any) => ({
        ...prev,
        includedServices: {
          ...prev.includedServices,
          [servicesactiveLang]: value,
        }
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }

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

    // if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.end_date) newErrors.end_date = "End date is required";
    const desc = formData.description[activeLang];
    if (!desc || desc.trim().length < 5)
      newErrors.description = "Description is required";

    if (!formData.price || Number(formData.price) <= 0)
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
    if (!validateForm()) return;

    const submitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "description" || key === "name" || key === "includedServices") {
        submitData.append(key, JSON.stringify(value));
      } else {
        if (value !== null && value !== "") {
          submitData.append(key, value as any);
        }
      }
    });

    if (mainImage) {
      submitData.append("img", mainImage);
    }

    galleryImages.forEach((file: any) => {
      submitData.append("gallery", file);
    });

    dispatch(
      createTour({
        data: submitData,
        token
      }
      )
    );
  };

  const handleStopChange = (index: number, field: keyof Stop, value: string) => {
    const updatedStops = [...stops];
    updatedStops[index][field] = value;
    setStops(updatedStops);
  };

  const addStop = () => {
    setStops([...stops, { location: "", untilDate: "" }]);
  };

  const removeStop = (index: number) => {
    if (index <= 1) return; // prevent deleting initial 2
    setStops(stops.filter((_, i) => i !== index));
  };


  console.log("stopsstops", stops)


  return (
    <>
      <HeaderAccount LinksHead={LinksHead} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("createNewTour")}</h1>
          <p className={styles.subtitle}>{t("fillInFields")}</p>
        </div>

        <div className={styles.form}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t("basicInformation")}</h2>
            <div className={styles.inputGroup}>
              <label className={styles.label}>{t("name")} *</label>
              <div className={styles.languageTabs}>
                {(["hy", "en", "ru"] as Lang[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setNameActiveLang(lang)}
                    className={`${styles.langTab} ${nameActiveLang === lang ? styles.activeTab : ""}`}
                  >
                    {{ hy: t("langHy"), en: t("langEn"), ru: t("langRu") }[lang]}
                  </button>
                ))}
              </div>
              <input
                type="text"
                name="name"
                value={formData.name[nameActiveLang]}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ""
                  }`}
                placeholder={t("tourName")}
              />
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t("startDate")} *</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.start_date ? styles.inputError : ""}`}
                />
                {errors.start_date && (
                  <span className={styles.error}>{errors.start_date}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{t("endDate")} *</label>
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
            <label className={styles.label}>{t("description")} *</label>
            <div className={styles.languageTabs}>
              {(["hy", "en", "ru"] as Lang[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveLang(lang)}
                  className={`${styles.langTab} ${activeLang === lang ? styles.activeTab : ""}`}
                >
                  {{ hy: t("langHy"), en: t("langEn"), ru: t("langRu") }[lang]}
                </button>
              ))}
            </div>

            <textarea
              name="description"
              value={formData.description[activeLang]}
              onChange={handleInputChange}
              className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
              rows={4}
              placeholder={``}
            />
            {errors.description && <div className={styles.error}>{errors.description}</div>}
          </div>

          {/* Price & Rating Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t("priceAndRating")}</h2>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t("price")} *</label>
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
                <label className={styles.label}>{t("rating")} (1-5) *</label>
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
                <label className={styles.label}>{t("tourCategory")}</label>
                <select
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="package">{t("carpool")}</option>
                  {/* <option value="custom">Custom</option> */}
                  <option value="group">{t("group")}</option>
                  <option value="package">{t("package")}</option>
                  {/* <option value="individual">Individual</option> */}
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{t("status")}</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="active">{t("active")}</option>
                  <option value="inactive">{t("inactive")}</option>
                  <option value="draft">{t("draft")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location & Details Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Location and Details
            </h2>

            {/* <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t("departureLocation")}</label>
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
                <label className={styles.label}>{t("destination")}</label>
                <input
                  type="text"
                  name="toLocation"
                  value={formData.toLocation}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g. Gyumri"
                />
              </div>
            </div> */}

            <div className={styles.section}>
              <MapComponent routes={stops?.map((item) => item.location)} />
              {/* <h2 className={styles.sectionTitle}>{t("stops")}</h2> */}

              {stops.map((stop, index) => (
                <div key={index} className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      {/* {t("location")}  */}
                      {/* {index + 1} */}
                      Location
                    </label>
                    <input
                      type="text"
                      value={stop.location}
                      onChange={(e) => handleStopChange(index, "location", e.target.value)}
                      className={styles.input}
                      placeholder={""}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>End Date</label>
                    <input
                      type="date"
                      value={stop.untilDate}
                      onChange={(e) => handleStopChange(index, "untilDate", e.target.value)}
                      className={styles.input}
                    />
                  </div>

                  {/* {index >= 2 && (
                    <button
                      type="button"
                      onClick={() => removeStop(index)}
                      className={styles.removeButton}
                    >
                      t("remove")
                    </button>
                  )} */}
                </div>
              ))}

              <button type="button" onClick={addStop} className={styles.addButton}>
                {/* { */}
                {/* // t("addStop") */}
                Add Location
                {/* // } */}
              </button>
            </div>



            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t("availableSeats")}</label>
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
                <label className={styles.label}>{t("totalGroupSize")}</label>
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
                <label className={styles.label}>{t("accommodationType")}</label>
                <select
                  name="accommodationType"
                  value={formData.accommodationType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">{t("select")}...</option>
                  <option value="hotel">{t("hotel")}</option>
                  <option value="hostel">{t("hostel")}</option>
                  <option value="apartment">{t("apartment")}</option>
                  <option value="villa">{t("villa")}</option>
                  <option value="camping">{t("camping")}</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>{t("hotelStars")}</label>
                <select
                  name="hotelStars"
                  value={formData.hotelStars}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="">{t("select")}...</option>
                  <option value="1">1 {t("star")}</option>
                  <option value="2">2 {t("star")}</option>
                  <option value="3">3 {t("star")}</option>
                  <option value="4">4 {t("star")}</option>
                  <option value="5">5 {t("star")}</option>
                </select>
              </div>
            </div>
            <label className={styles.label}>{t("includedServices")}</label>
            <div className={styles.languageTabs}>
              {(["hy", "en", "ru"] as Lang[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setServicesactiveLang(lang)}
                  className={`${styles.langTab} ${servicesactiveLang === lang ? styles.activeTab : ""}`}
                >
                  {{ hy: t("langHy"), en: t("langEn"), ru: t("langRu") }[lang]}
                </button>
              ))}
            </div>
            <textarea
              name="includedServices"
              value={formData.includedServices[servicesactiveLang]}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder={t("describeIncludedServices")}
              rows={3}
            />
            {errors.includedServices && <div className={styles.error}>{errors.includedServices}</div>}
          </div>

          {/* Images Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t("images")}</h2>

            <div className={styles.inputGroup}>
              <label className={styles.label}>{t("mainImage")}</label>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className={styles.fileInput}
                  id="mainImage"
                />
                <label htmlFor="mainImage" className={styles.fileLabel}>
                  {mainImage ? mainImage.name : t("selectImage")}
                </label>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>{t("gallery")}</label>
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
                    : t("selectImages")}
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
            >
              {t("createTour")}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateTourComponent;

