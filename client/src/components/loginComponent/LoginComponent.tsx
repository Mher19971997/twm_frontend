"use client";

import { useState } from "react";
import styles from "./LoginComponent.module.scss";
import EmailLogin from "../../../public/assets/svg/EmailLogin";
import PasswordLogin from "../../../public/assets/svg/PasswordLogin";
import YourName from "../../../public/assets/svg/YourName";
import Google from "../../../public/assets/png/google.png";
import Facebook from "../../../public/assets/png/Facebook.png";
import Image from "next/image";
import { useAppDispatch } from "@/redux/types/types";
import { loginUser } from "@/redux/actions/authAction";

// Eye icon components
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m1 1 22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m6.71 6.71c-.55.4-1.08.81-1.58 1.25a15.77 15.77 0 0 0-3.13 4.04s4 8 11 8c1.27 0 2.5-.18 3.64-.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m6 6 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m15 15.66c-.39.24-.8.42-1.23.54a3 3 0 0 1-3.54-3.54c.12-.43.3-.84.54-1.23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface AuthComponentProps {
  onToggle: () => void;
}

export type LoginType = "auth_client" | "auth_individual" | "auth_organisation";

export interface LoginInput {
  email?: string;
  nickname?: string;
  password: string;
}

export interface LoginIndividualInput {
  email?: string;
  phone?: string;
  password: string;
}

export interface LoginOrganisationInput {
  email?: string;
  phone?: string;
  password: string;
}

// Union type for all login data
export type LoginFormData = LoginInput | LoginIndividualInput | LoginOrganisationInput;

export default function LoginComponent({ onToggle }: AuthComponentProps) {
  const dispatch = useAppDispatch();
  const [loginType, setLoginType] = useState<LoginType>("auth_client");
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
    setServerError("");
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: boolean } = {};

    // Password is always required
    if (!formData.password.trim()) {
      newErrors.password = true;
    }

    if (loginType === "auth_client") {
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

  const prepareLoginData = (): LoginFormData => {
    if (loginType === "auth_client") {
      const loginData: LoginInput = {
        password: formData.password
      };
      if (formData.email.trim()) loginData.email = formData.email;
      if (formData.nickname.trim()) loginData.nickname = formData.nickname;
      return loginData;
    } else if (loginType === "auth_individual") {
      const loginData: LoginIndividualInput = {
        password: formData.password
      };
      if (formData.email.trim()) loginData.email = formData.email;
      if (formData.phone.trim()) loginData.phone = formData.phone;
      return loginData;
    } else {
      // auth_organisation
      const loginData: LoginOrganisationInput = {
        password: formData.password
      };
      if (formData.email.trim()) loginData.email = formData.email;
      if (formData.phone.trim()) loginData.phone = formData.phone;
      return loginData;
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
      const loginData = prepareLoginData();

      const result = await dispatch(loginUser({
        userData: loginData,
        userType: loginType
      })).unwrap();

      console.log("Login successful!", result);
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);

    } catch (error: any) {
      console.error('Login error:', error);
      setServerError(error || "Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as LoginType;
    setLoginType(newType);
    // Clear form when switching types
    setFormData({
      email: "",
      nickname: "",
      phone: "",
      password: "",
    });
    setErrors({});
    setServerError("");
    setShowPassword(false); // Reset password visibility
  };

  const getTypeDisplayName = () => {
    switch (loginType) {
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

  const renderLoginFields = () => {
    if (loginType === "auth_client") {
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
            Use either email or nickname to login
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
            Use either email or phone to login
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
      text: "Sign in with Google",
    },
    {
      src: Facebook.src,
      className: styles.facebook,
      alt: "Facebook",
      text: "Sign in with Facebook",
    },
  ];

  return (
    <div className={styles.contentLoginComponent}>
      <form onSubmit={handleSubmit}>
        <h2>Login into your account</h2>

        {/* Account Type Selection */}
        <div className={styles.selectWrapper} style={{ marginBottom: '20px' }}>
          <label htmlFor="loginType">Account Type</label>
          <select
            id="loginType"
            value={loginType}
            onChange={handleLoginTypeChange}
            className={styles.loginTypeSelect}
          >
            <option value="auth_client">Client</option>
            <option value="auth_individual">Individual Professional</option>
            <option value="auth_organisation">Organization</option>
          </select>
        </div>

        <div className={styles.stepInfo} style={{ marginBottom: '20px' }}>
          <p>Login as: <strong>{getTypeDisplayName()}</strong></p>
        </div>

        <div className={styles.inputsLogin}>
          {renderLoginFields()}

          <div style={{ position: 'relative' }} className={styles.passwordContainer}>
            <div className={styles.passwordIcon}>
              <PasswordLogin />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={errors.password ? styles.error : ""}
            />
            <div
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </div>
          </div>
        </div>

        <div className={styles.forgotAndRemember}>
          <div className={styles.rememberMe}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <p>Forgot your Password?</p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        {serverError && <p className={styles.errorMessage}>{serverError}</p>}
        {success && <p className={styles.successMessage}>Login successful! Redirecting...</p>}

        <div className={styles.registerNewAccount}>
          <p>
            Don't have an account? <span onClick={onToggle}>Register</span>
          </p>
        </div>

        <div className={styles.signInWithBrowsers}>
          <p>Or, Sign in with your social account</p>
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