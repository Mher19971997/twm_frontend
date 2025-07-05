import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./RegisterComponent.module.scss";
import ClientRegistrationForm from "./ClientRegistrationForm";
import IndividualRegistrationForm from "./IndividualRegistrationForm";
import EmailLogin from "../../../public/assets/svg/EmailLogin";
import { useAppDispatch } from "@/redux/types/types";
import { checkContact, verifyContact, registerUser } from "@/redux/actions/authAction";
import OrganizationRegistrationForm from "./OrganizationRegitsrationForm";

interface AuthComponentProps {
  onToggle: () => void;
}

export type RegistrationType = "auth_client" | "auth_individual" | "auth_organisation";

// New type interfaces based on backend
export interface RegisterInput {
  email?: string;
  phone?: string;
  nickname?: string;
  name?: string;
  surname?: string;
  birthDate?: string;
  gender?: string;
  password?: string; // Added password field for clients
}

export interface RegisterIndividualInput {
  name?: string;
  inn?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface RegisterOrganisationInput {
  location_latitude?: string;
  phone?: string;
  location_longitude?: string;
  name?: string;
  email?: string;
  inn?: string;
  password?: string;
}

export type FormData = RegisterInput | RegisterIndividualInput | RegisterOrganisationInput;

type RegistrationStep = 'type-selection' | 'email-input' | 'otp-verification' | 'registration-form';

// Helper function to parse validation errors from backend
const parseValidationErrors = (error: any): { serverError: string, fieldErrors: { [key: string]: string } } => {
  let serverError = "";
  let fieldErrors: { [key: string]: string } = {};

  if (error && typeof error === 'object') {
    // Handle structured validation errors
    if (Array.isArray(error.message)) {
      error.message.forEach((validationError: any) => {
        if (validationError.instancePath && validationError.message) {
          // Remove leading slash from instancePath
          const field = validationError.instancePath.replace('/', '');

          // Create user-friendly messages
          let userMessage = validationError.message;

          if (field === 'birthDate' && validationError.message.includes('< 2016/01/01')) {
            userMessage = 'You must be at least 9 years old';
          } else if (field === 'password' && validationError.keyword === 'required') {
            userMessage = 'Password is required';
          } else if (field === 'email' && validationError.keyword === 'format') {
            userMessage = 'Please enter a valid email address';
          } else if (field === 'name' && validationError.keyword === 'required') {
            userMessage = 'Name is required';
          } else if (field === 'surname' && validationError.keyword === 'required') {
            userMessage = 'Last name is required';
          } else if (validationError.keyword === 'required') {
            userMessage = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
          }

          if (field) {
            fieldErrors[field] = userMessage;
          } else {
            serverError = userMessage;
          }
        } else {
          serverError = validationError.message || validationError;
        }
      });
    }
    // Handle single error message
    else if (error.message) {
      serverError = error.message;
    }
    // Handle string error
    else if (typeof error === 'string') {
      serverError = error;
    }
  } else if (typeof error === 'string') {
    serverError = error;
  }

  // Default fallback message
  if (!serverError && Object.keys(fieldErrors).length === 0) {
    serverError = "An unexpected error occurred. Please try again.";
  }

  return { serverError, fieldErrors };
};

export default function RegisterComponent({ onToggle }: AuthComponentProps) {
  const dispatch = useAppDispatch();
  const [registrationType, setRegistrationType] = useState<RegistrationType>("auth_client");
  const [registrationStep, setRegistrationStep] = useState<RegistrationStep>('type-selection');
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [isResendingCode, setIsResendingCode] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);

  useEffect(() => {
    const savedType = localStorage.getItem('registrationType') as RegistrationType;
    const savedStep = localStorage.getItem('registrationStep') as RegistrationStep;
    const savedEmail = localStorage.getItem('verifiedEmail');

    if (savedType) {
      setRegistrationType(savedType);
    }
    if (savedStep && savedEmail) {
      setRegistrationStep(savedStep);
      setVerifiedEmail(savedEmail);
      setEmail(savedEmail);
    }
  }, []);

  const handleResendCode = async () => {
    setIsResendingCode(true);
    setServerError("");
    setShowResendButton(false);

    try {
      await dispatch(checkContact({
        email: verifiedEmail,
        type: registrationType
      })).unwrap();

      setRegistrationStep('otp-verification');
      setOtpCode("");
      localStorage.setItem('registrationStep', 'otp-verification');
      setSuccessMessage("Код отправлен повторно");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (error: any) {
      console.error('Resend code error:', error);
      setServerError(error || "Не удалось отправить код повторно");
      setShowResendButton(true);
    } finally {
      setIsResendingCode(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setServerError("");
    setFieldErrors({});
    setShowResendButton(false);
    setSuccessMessage("");

    try {
      // All registration types now include password
      const dataToSend = {
        ...formData,
        email: verifiedEmail,
      };

      const result = await dispatch(registerUser({
        userData: dataToSend,
        userType: registrationType
      })).unwrap();

      // Clear saved registration data
      localStorage.removeItem('registrationType');
      localStorage.removeItem('registrationStep');
      localStorage.removeItem('verifiedEmail');

      // Show success message briefly, then redirect to login
      setSuccessMessage("Registration successful! Redirecting to login...");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        onToggle();
      }, 2000);

    } catch (error: any) {
      console.error('Registration error details:', error);

      // Handle specific email not verified error
      if (error && (
        (typeof error === 'string' && error.includes('email_not_verified')) ||
        (error.message && error.message.includes('email_not_verified'))
      )) {
        setServerError("Email не подтвержден");
        setShowResendButton(true);
        return;
      }

      const { serverError: parsedServerError, fieldErrors: parsedFieldErrors } = parseValidationErrors(error);

      setServerError(parsedServerError);
      setFieldErrors(parsedFieldErrors);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as RegistrationType;
    setRegistrationType(newType);
    localStorage.setItem('registrationType', newType);
  };

  const handleContinueWithType = () => {
    setRegistrationStep('email-input');
    localStorage.setItem('registrationStep', 'email-input');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError(true);
      return;
    }

    setIsCheckingEmail(true);
    setEmailError(false);
    setServerError("");
    setFieldErrors({});
    setSuccessMessage("");

    try {
      await dispatch(checkContact({
        email,
        type: registrationType
      })).unwrap();
      setRegistrationStep('otp-verification');
      setVerifiedEmail(email);
      localStorage.setItem('registrationStep', 'otp-verification');
      localStorage.setItem('verifiedEmail', email);
    } catch (error: any) {
      console.error('Email check error:', error);
      setEmailError(true);

      // Handle specific error messages
      if (error && typeof error === 'string' && error.toLowerCase().includes('already exists')) {
        setServerError("This email is already registered. Please use a different email or try logging in.");
      } else {
        setServerError(error || "Email verification failed. Please try again.");
      }
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpCode || otpCode.length < 4) {
      setOtpError(true);
      return;
    }

    setIsVerifyingOTP(true);
    setOtpError(false);
    setServerError("");
    setFieldErrors({});
    setSuccessMessage("");

    try {
      const result = await dispatch(verifyContact({
        email: verifiedEmail,
        code: otpCode,
        type: registrationType
      })).unwrap();

      // Check if verification was successful
      if (result && result.verified === true) {
        setRegistrationStep('registration-form');
        localStorage.setItem('registrationStep', 'registration-form');
      } else {
        // Verification failed - code is incorrect
        setOtpError(true);
        setServerError("Invalid verification code. Please check your email and try again.");
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      setOtpError(true);

      // Handle specific OTP error messages
      if (error && typeof error === 'string') {
        if (error.toLowerCase().includes('expired')) {
          setServerError("Verification code has expired. Please request a new code.");
        } else if (error.toLowerCase().includes('invalid') || error.toLowerCase().includes('incorrect')) {
          setServerError("Invalid verification code. Please check your email and try again.");
        } else {
          setServerError(error);
        }
      } else {
        setServerError("OTP verification failed. Please try again.");
      }
    } finally {
      setIsVerifyingOTP(false);
    }
  };

  const handleBackToTypeSelection = () => {
    setRegistrationStep('type-selection');
    setEmail("");
    setOtpCode("");
    setVerifiedEmail("");
    setServerError("");
    setFieldErrors({});
    setEmailError(false);
    setOtpError(false);
    setShowResendButton(false);
    setSuccessMessage("");
    localStorage.removeItem('registrationStep');
    localStorage.removeItem('verifiedEmail');
  };

  const handleBackToEmail = () => {
    setRegistrationStep('email-input');
    setOtpCode("");
    setServerError("");
    setFieldErrors({});
    setOtpError(false);
    setShowResendButton(false);
    setSuccessMessage("");
    localStorage.setItem('registrationStep', 'email-input');
  };

  const renderRegistrationForm = () => {
    const commonProps = {
      onSubmit: handleSubmit,
      loading: loading,
      verifiedEmail: verifiedEmail,
      fieldErrors: fieldErrors // Pass field errors to forms
    };

    switch (registrationType) {
      case "auth_client":
        return <ClientRegistrationForm {...commonProps} />;
      case "auth_individual":
        return <IndividualRegistrationForm {...commonProps} />;
      case "auth_organisation":
        return <OrganizationRegistrationForm {...commonProps} />;
      default:
        return null;
    }
  };

  const getTypeDisplayName = () => {
    switch (registrationType) {
      case "auth_client":
        return "Client - Book and manage your travel";
      case "auth_individual":
        return "Individual Professional - Independent travel consultant";
      case "auth_organisation":
        return "Organization - Travel agency or company";
      default:
        return "";
    }
  };

  return (
    <div className={styles.registerComponent}>
      <div className={styles.form}>
        <h2>Create your account</h2>

        {/* Step 1: Type Selection */}
        {registrationStep === 'type-selection' && (
          <>
            <div className={styles.selectWrapper}>
              <label htmlFor="registrationType">Account Type</label>
              <select
                id="registrationType"
                value={registrationType}
                onChange={handleRegistrationTypeChange}
                className={styles.registrationTypeSelect}
              >
                <option value="auth_client">Client - Book and manage your travel</option>
                <option value="auth_individual">Individual Professional - Independent travel consultant</option>
                <option value="auth_organisation">Organization - Travel agency or company</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleContinueWithType}
              className={styles.continueButton}
            >
              Continue as {getTypeDisplayName().split(' - ')[0]}
            </button>
          </>
        )}

        {/* Step 2: Email Input */}
        {registrationStep === 'email-input' && (
          <>
            <div className={styles.stepInfo}>
              <p>Selected: <strong>{getTypeDisplayName()}</strong></p>
            </div>

            <div className={styles.inputs}>
              <div style={{ position: 'relative' }}>
                <div className={styles.email}>
                  <EmailLogin />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                    setServerError("");
                    setSuccessMessage("");
                  }}
                  className={emailError ? styles.error : ""}
                  required
                />
                {isCheckingEmail && <small className={styles.checkingText}>Checking email & sending verification code...</small>}
                {emailError && <small className={styles.errorText}>Invalid email or email already exists</small>}
              </div>
            </div>

            <button
              type="button"
              onClick={handleEmailSubmit}
              disabled={isCheckingEmail || !email}
              className={styles.continueButton}
            >
              {isCheckingEmail ? "Checking & Sending Code..." : "Send Verification Code"}
            </button>

            <button
              type="button"
              onClick={handleBackToTypeSelection}
              className={styles.backButton}
            >
              ← Back to Account Type
            </button>
          </>
        )}

        {/* Step 3: OTP Verification */}
        {registrationStep === 'otp-verification' && (
          <>
            <div className={styles.stepInfo}>
              <div>
                <p>Verification code sent to:</p>
                <p><strong>{verifiedEmail}</strong></p>
              </div>
            </div>

            <div className={styles.inputs}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={otpCode}
                  onChange={(e) => {
                    setOtpCode(e.target.value);
                    setOtpError(false);
                    setServerError("");
                    setSuccessMessage("");
                  }}
                  className={otpError ? styles.error : ""}
                  maxLength={6}
                  required
                />
                {isVerifyingOTP && <small className={styles.checkingText}>Verifying code...</small>}
                {otpError && <small className={styles.errorText}>Invalid verification code</small>}
              </div>
            </div>

            <button
              type="button"
              onClick={handleOTPSubmit}
              disabled={isVerifyingOTP || !otpCode}
              className={styles.continueButton}
            >
              {isVerifyingOTP ? "Verifying..." : "Verify Code"}
            </button>

            <button
              type="button"
              onClick={handleBackToEmail}
              className={styles.backButton}
            >
              ← Back to Email
            </button>
          </>
        )}

        {/* Step 4: Registration Form */}
        {registrationStep === 'registration-form' && (
          <>
            <div className={styles.verifiedInfo}>
              <p>✓ Email verified: <strong>{verifiedEmail}</strong></p>
            </div>

            {/* Show field-specific errors */}
            {Object.keys(fieldErrors).length > 0 && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '16px'
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#dc2626', fontSize: '14px' }}>Please fix the following errors:</h4>
                {Object.entries(fieldErrors).map(([field, message]) => (
                  <div key={field} style={{
                    marginBottom: '4px',
                    fontSize: '13px',
                    color: '#dc2626'
                  }}>
                    <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {message}
                  </div>
                ))}
              </div>
            )}

            {renderRegistrationForm()}

            {showResendButton && (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResendingCode}
                className={styles.resendButton}
                style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  marginTop: '10px',
                  cursor: isResendingCode ? 'not-allowed' : 'pointer',
                  opacity: isResendingCode ? 0.6 : 1
                }}
              >
                {isResendingCode ? "Отправляем код..." : "Отправить код повторно"}
              </button>
            )}

            <button
              type="button"
              onClick={handleBackToEmail}
              className={styles.backButton}
            >
              ← Change Email
            </button>
          </>
        )}

        {serverError && <div className={styles.errorMessage}>{serverError}</div>}
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

        <p>
          Already have an account? <span onClick={onToggle} className={styles.toggleLink}>Sign In</span>
        </p>
      </div>
    </div>
  );
}