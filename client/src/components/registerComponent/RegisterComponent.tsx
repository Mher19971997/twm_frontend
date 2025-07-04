import { useState } from "react";
import axios from "axios";
import styles from "./RegisterComponent.module.scss";
import YourName from "../../../public/assets/svg/YourName";
import PasswordLogin from "../../../public/assets/svg/PasswordLogin";
import EmailLogin from "../../../public/assets/svg/EmailLogin";

interface AuthComponentProps {
  onToggle: () => void;
}

export default function RegisterComponent({ onToggle }: AuthComponentProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (name: string, value: string) => {
    let error = false;
    if (value.trim() === "") {
      error = true;
    }

    if (name === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = true;
    }

    if (name === "password" && value.length < 6) {
      error = true;
    }

    if (name === "confirmPassword" && value !== password) {
      error = true; 
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameIsEmpty = name.trim() === "";
    const emailIsEmpty = email.trim() === "";
    const passwordIsEmpty = password.trim() === "";
    const confirmPasswordIsEmpty = confirmPassword.trim() === "";
    const passwordMismatch = password !== confirmPassword;

    setErrors({
      name: nameIsEmpty,
      email: emailIsEmpty || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
      password: passwordIsEmpty || password.length < 6,
      confirmPassword: confirmPasswordIsEmpty || passwordMismatch,
    });

    if (
      !nameIsEmpty &&
      !emailIsEmpty &&
      !passwordIsEmpty &&
      !confirmPasswordIsEmpty &&
      !passwordMismatch
    ) {
      setLoading(true);
      setServerError("");
      try {
        const response = await axios.post("http://localhost:5000/api/users/registration", {
          name,
          email,
          password,
          confirmPassword,
        });

        if (response.status === 201) {
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          onToggle();
        }
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Validation failed:", {
        nameIsEmpty,
        emailIsEmpty,
        passwordIsEmpty,
        confirmPasswordIsEmpty,
        passwordMismatch,
      });
    }
  };

  const inputs = [
    {
      type: "text",
      placeholder: "Your Name",
      value: name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value),
      error: errors.name,
    },
    {
      type: "email",
      placeholder: "Your Email address",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value),
      error: errors.email,
    },
    {
      type: "password",
      placeholder: "Your password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("password", e.target.value),
      error: errors.password,
    },
    {
      type: "password",
      placeholder: "Confirm Password",
      value: confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("confirmPassword", e.target.value),
      error: errors.confirmPassword,
    },
  ];

  const inputIcons = [
    {
      className: styles.yourName,
      icon: <YourName />,
    },
    {
      className: styles.email,
      icon: <EmailLogin />,
    },
    {
      className: styles.password,
      icon: <PasswordLogin />,
    },
    {
      className: styles.confirmPassword,
      icon: <PasswordLogin />,
    },
  ];

  return (
    <div className={styles.registerComponent}>
      <form onSubmit={handleSubmit}>
        <h2>Create your account</h2>
        <div className={styles.inputs}>
          {inputIcons.map((item: any, index: number) => (
            <div className={item.className} key={index}>
              {item.icon}
            </div>
          ))}
          {inputs.map((item: any, index: number) => (
            <input
              key={index}
              type={item.type}
              placeholder={item.placeholder}
              value={item.value}
              onChange={item.onChange}
              className={item.error ? styles.error : ""}
            />
          ))}
        </div>
        <div className={styles.acceptTerms}>
          <input type="checkbox" id="Terms" />
          <label htmlFor="Terms">Accept Terms and Conditions</label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        {serverError && <div className={styles.errorMessage}>{serverError}</div>}
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        <p>
          Already have an account? <span onClick={onToggle}>Login</span>
        </p>
      </form>
    </div>
  );
}
