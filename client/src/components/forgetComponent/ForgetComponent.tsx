"use client";

import { useState } from "react";
import styles from "./ForgetComponent.module.scss";
import EmailLogin from "../../../public/assets/svg/EmailLogin";
import YourName from "../../../public/assets/svg/YourName";
import Google from "../../../public/assets/png/google.png";
import Facebook from "../../../public/assets/png/Facebook.png";
import Image from "next/image";
import { useAppDispatch } from "@/redux/types/types";
// import { forgotPassword } from "@/redux/actions/authAction"; // You'll need to create this action

// Back arrow icon component
const BackArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface AuthComponentProps {
  onToggle: () => void; // Function to go back to login
}

export type ForgetType = "auth_client" | "auth_individual" | "auth_organisation";

export interface ForgetInput {
  email?: string;
  nickname?: string;
}

export interface ForgetIndividualInput {
  email?: string;
  phone?: string;
}

export interface ForgetOrganisationInput {
  email?: string;
  phone?: string;
}

// Union type for all forget password data
export type ForgetFormData = ForgetInput | ForgetIndividualInput | ForgetOrganisationInput;

export default function ForgetComponent({ onToggle }: AuthComponentProps) {
  const dispatch = useAppDispatch();
  const [forgetType, setForgetType] = useState<ForgetType>("auth_client");
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
    setServerError("");
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: boolean } = {};

    if (forgetType === "auth_client") {
      // For clients: email OR nickname required
      if (!formData.email.trim() && !formData.nickname.trim()) {
        newErrors.email = true;
        newErrors.nickname = true;
      }
    } else {
      // For individuals and organizations: email OR phone required
      if (!formData.email.trim() && !formData.phone.trim()) {
        newErrors.email = true;
        newErrors.phone = true;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const prepareForgetData = (): ForgetFormData => {
    if (forgetType === "auth_client") {
      const forgetData: ForgetInput = {};
      if (formData.email.trim()) forgetData.email = formData.email;
      if (formData.nickname.trim()) forgetData.nickname = formData.nickname;
      return forgetData;
    } else if (forgetType === "auth_individual") {
      const forgetData: ForgetIndividualInput = {};
      if (formData.email.trim()) forgetData.email = formData.email;
      if (formData.phone.trim()) forgetData.phone = formData.phone;
      return forgetData;
    } else {
      // auth_organisation
      const forgetData: ForgetOrganisationInput = {};
      if (formData.email.trim()) forgetData.email = formData.email;
      if (formData.phone.trim()) forgetData.phone = formData.phone;
      return forgetData;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const forgetData = prepareForgetData();

      // Replace this with your actual forgot password action
      // const result = await dispatch(forgotPassword({
      //   userData: forgetData,
      //   userType: forgetType
      // })).unwrap();

      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log("Password reset email sent!", forgetData);
      setSuccess(true);
      setEmailSent(true);

    } catch (error: any) {
      console.error('Forgot password error:', error);
      setServerError(error || "Failed to send reset email. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as ForgetType;
    setForgetType(newType);
    // Clear form when switching types
    setFormData({
      email: "",
      nickname: "",
      phone: "",
    });
    setErrors({});
    setServerError("");
    setEmailSent(false);
    setSuccess(false);
  };

  const getTypeDisplayName = () => {
    switch (forgetType) {
      case "auth_client":
        return "Client";
      case "auth_individual":
        return "Individual Professional";
      case "auth_organisation":
        return "Organization";
      default:
        return "";
    }
  };

  const renderForgetFields = () => {
    if (forgetType === "auth_client") {
      return (
        <>
          <div style={{ position: 'relative' }}>
            <div className={styles.emailIcon}>
              <EmailLogin />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? styles.error : ""}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <div className={styles.emailIcon}>
              <YourName />
            </div>
            <input
              type="text"
              placeholder="Nickname"
              value={formData.nickname}
              onChange={(e) => handleInputChange("nickname", e.target.value)}
              className={errors.nickname ? styles.error : ""}
            />
          </div>

          <div style={{ textAlign: 'center', margin: '10px 0', fontSize: '14px', color: '#666' }}>
            Enter either email or nickname to reset password
          </div>
        </>
      );
    } else {
      return (
        <>
          <div style={{ position: 'relative' }}>
            <div className={styles.emailIcon}>
              <EmailLogin />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? styles.error : ""}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <div className={styles.emailIcon}>
              <YourName />
            </div>
            <input
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? styles.error : ""}
            />
          </div>

          <div style={{ textAlign: 'center', margin: '10px 0', fontSize: '14px', color: '#666' }}>
            Enter either email or phone to reset password
          </div>
        </>
      );
    }
  };

  const signInWithBrowsers = [
    {
      src: Google.src,
      className: styles.google,
      alt: "Google",
      text: "Reset with Google",
    },
    {
      src: Facebook.src,
      className: styles.facebook,
      alt: "Facebook",
      text: "Reset with Facebook",
    },
  ];

  if (emailSent && success) {
    return (
      <div className={styles.contentLoginComponent}>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '48px', color: '#28a745', marginBottom: '20px' }}>
            ✓
          </div>
          <h2>Check Your Email</h2>
          <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
            We've sent password reset instructions to your email address.
            Please check your inbox and follow the link to reset your password.
          </p>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <button
            type="button"
            onClick={() => {
              setEmailSent(false);
              setSuccess(false);
              setFormData({
                email: "",
                nickname: "",
                phone: "",
              });
            }}
            style={{ marginBottom: '20px' }}
          >
            Try Again
          </button>
          <div className={styles.registerNewAccount}>
            <p>
              Remember your password? <span onClick={onToggle}>Back to Login</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contentLoginComponent}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={onToggle}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              marginRight: '10px',
              display: 'flex',
              alignItems: 'center',
              color: '#666'
            }}
          >
            <BackArrowIcon />
          </button>
          <h2 style={{ margin: 0 }}>Reset your password</h2>
        </div>

        <p style={{ color: '#666', marginBottom: '30px', fontSize: '14px' }}>
          Enter your account details and we'll send you a link to reset your password.
        </p>

        {/* Account Type Selection */}
        <div className={styles.selectWrapper} style={{ marginBottom: '20px' }}>
          <label htmlFor="forgetType">Account Type</label>
          <select
            id="forgetType"
            value={forgetType}
            onChange={handleForgetTypeChange}
            className={styles.loginTypeSelect}
          >
            <option value="auth_client">Client</option>
            <option value="auth_individual">Individual Professional</option>
            <option value="auth_organisation">Organization</option>
          </select>
        </div>

        <div className={styles.stepInfo} style={{ marginBottom: '20px' }}>
          <p>Reset password for: <strong>{getTypeDisplayName()}</strong></p>
        </div>

        <div className={styles.inputsLogin}>
          {renderForgetFields()}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Sending Reset Email..." : "Send Reset Instructions"}
        </button>

        {serverError && <p className={styles.errorMessage}>{serverError}</p>}

        <div className={styles.registerNewAccount}>
          <p>
            Remember your password? <span onClick={onToggle}>Back to Login</span>
          </p>
        </div>

        <div className={styles.signInWithBrowsers}>
          <p>Or, reset with your social account</p>
          {signInWithBrowsers.map((item: any, index: number) => (
            <a href="#" className={item.className} key={index}>
              <Image src={item.src} alt={item.alt} width={44} height={44} />
              <p>{item.text}</p>
            </a>
          ))}
        </div>
      </form>
    </div>
  );
}