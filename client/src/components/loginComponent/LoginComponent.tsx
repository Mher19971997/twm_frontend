"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./LoginComponent.module.scss";
import EmailLogin from "../../../public/assets/svg/EmailLogin";
import PasswordLogin from "../../../public/assets/svg/PasswordLogin";
import Google from "../../../public/assets/png/google.png";
import Facebook from "../../../public/assets/png/Facebook.png";
import Image from "next/image";

interface AuthComponentProps {
  onToggle: () => void;
}

export default function LoginComponent({ onToggle }: AuthComponentProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailIsEmpty = email.trim() === "";
    const passwordIsEmpty = password.trim() === "";

    setErrors({
      email: emailIsEmpty,
      password: passwordIsEmpty,
    });

    if (!emailIsEmpty && !passwordIsEmpty) {
      setLoading(true);
      setServerError("");

      try {
        const response = await axios.post("http://localhost:5000/api/users/login", {
          email,
          password,
        });

        if (response.status === 200) {
          console.log("Login successful!");
          setSuccess(true);
          window.location.href = "/profile";
        }
      } catch (error: any) {
        const message = error.response?.data?.message || "An error occurred";
        setServerError(message);
      } finally {
        setLoading(false);
      }
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
        <div className={styles.inputsLogin}>
          <div className={styles.emailIcon}>
            <EmailLogin />
          </div>
          <input
            type="email"
            placeholder="Your Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? styles.error : ""}
          />
          <div className={styles.passwordIcon}>
            <PasswordLogin />
          </div>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? styles.error : ""}
          />
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
