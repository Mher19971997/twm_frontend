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
  const [role, setRole] = useState<"client" | "agent" | "agency">("client");

  // Общие поля
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Доп. поля
  const [agentLicense, setAgentLicense] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [agencyINN, setAgencyINN] = useState("");

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (field: string, value: string) => {
    if (field === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      setErrors((prev: any) => ({ ...prev, email: true }));
    } else if (field === "password" && value.length < 6) {
      setErrors((prev: any) => ({ ...prev, password: true }));
    } else if (field === "confirmPassword" && value !== password) {
      setErrors((prev: any) => ({ ...prev, confirmPassword: true }));
    } else {
      setErrors((prev: any) => ({ ...prev, [field]: false }));
    }

    switch (field) {
      case "name": setName(value); break;
      case "email": setEmail(value); break;
      case "password": setPassword(value); break;
      case "confirmPassword": setConfirmPassword(value); break;
      case "agentLicense": setAgentLicense(value); break;
      case "agencyName": setAgencyName(value); break;
      case "agencyINN": setAgencyINN(value); break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");

    const payload: any = {
      role,
      email,
      password,
      confirmPassword,
    };

    if (role === "client" || role === "agent" || role === "agency") {
      payload.name = name;
    }

    if (role === "agent") {
      payload.agentLicense = agentLicense;
    }

    if (role === "agency") {
      payload.agencyName = agencyName;
      payload.agencyINN = agencyINN;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/registration", payload);
      if (response.status === 201) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAgentLicense("");
        setAgencyName("");
        setAgencyINN("");
        setRole("client");
        setSuccessMessage("Successfully registered!");
        onToggle();
      }
    } catch (error: any) {
      setServerError(error?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerComponent}>
      <form onSubmit={handleSubmit}>
        <h2>Create your account</h2>

        {/* Role Selection */}
        <div className={styles.roleSelector}>
          <label>
            <input
              type="radio"
              name="role"
              value="client"
              checked={role === "client"}
              onChange={() => setRole("client")}
            />
            Client
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="agent"
              checked={role === "agent"}
              onChange={() => setRole("agent")}
            />
            Tour Agent
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="agency"
              checked={role === "agency"}
              onChange={() => setRole("agency")}
            />
            Tour Agency
          </label>
        </div>

        {/* Inputs */}
        <div className={styles.inputs}>
          {/* Name or Representative */}
          {(role === "client" || role === "agent" || role === "agency") && (
            <div style={{ position: 'relative' }}>
              <div className={styles.yourName}>
                <YourName />
              </div>
              <input
                type="text"
                placeholder={role === "agency" ? "Representative Name" : "Your Name"}
                value={name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={errors.name ? styles.error : ""}
              />
            </div>
          )}

          {/* Email */}
          <div style={{ position: 'relative' }}>
            <div className={styles.email}>
              <EmailLogin />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? styles.error : ""}
            />
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <div className={styles.password}>
              <PasswordLogin />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={errors.password ? styles.error : ""}
            />
          </div>

          {/* Confirm Password */}
          <div style={{ position: 'relative' }}>
            <div className={styles.confirmPassword}>
              <PasswordLogin />
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={errors.confirmPassword ? styles.error : ""}
            />
          </div>

          {/* Agent specific */}
          {role === "agent" && (
            <div style={{ position: 'relative' }}>
              <div className={styles.license}>
              </div>
              <input
                type="text"
                placeholder="Agent License Number"
                value={agentLicense}
                onChange={(e) => handleInputChange("agentLicense", e.target.value)}
              />
            </div>
          )}

          {/* Agency specific */}
          {role === "agency" && (
            <>
              <div style={{ position: 'relative' }}>
                <div className={styles.company}>
                </div>
                <input
                  type="text"
                  placeholder="Agency Name"
                  value={agencyName}
                  onChange={(e) => handleInputChange("agencyName", e.target.value)}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <div className={styles.document}>
                </div>
                <input
                  type="text"
                  placeholder="INN"
                  value={agencyINN}
                  onChange={(e) => handleInputChange("agencyINN", e.target.value)}
                />
              </div>
            </>
          )}
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