import { useState } from "react";
import styles from "./RegisterComponent.module.scss";
import YourName from "../../../public/assets/svg/YourName";
import PasswordLogin from "../../../public/assets/svg/PasswordLogin";
import EmailLogin from "../../../public/assets/svg/EmailLogin";

interface RegisterIndividualInput {
    name?: string;
    inn?: string;
    email?: string;
    phone?: string;
    password?: string;
}

interface IndividualRegistrationFormProps {
    onSubmit: (data: RegisterIndividualInput) => void;
    loading: boolean;
    verifiedEmail: string;
}

interface FormErrors {
    phone?: boolean;
    password?: boolean;
    name?: boolean;
    inn?: boolean;
}

export default function IndividualRegistrationForm({ onSubmit, loading, verifiedEmail }: IndividualRegistrationFormProps) {
    const [formData, setFormData] = useState<RegisterIndividualInput>({
        email: verifiedEmail,
        phone: "",
        name: "",
        inn: "",
        password: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (field: keyof RegisterIndividualInput, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Validation
        if (field === "name" && (!value || value.trim().length === 0)) {
            setErrors(prev => ({ ...prev, name: true }));
        } else if (field === "phone" && value && !/^\+?[\d\s-()]+$/.test(value)) {
            setErrors(prev => ({ ...prev, phone: true }));
        } else if (field === "password" && (!value || value.length < 6)) {
            setErrors(prev => ({ ...prev, password: true }));
        } else if (field === "inn" && value && !/^\d+$/.test(value)) {
            setErrors(prev => ({ ...prev, inn: true }));
        } else {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields before submit
        const newErrors: FormErrors = {};
        if (!formData.name || formData.name.trim().length === 0) {
            newErrors.name = true;
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = true;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.inputs}>
                {/* Verified Email - readonly */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.email}>
                        <EmailLogin />
                    </div>
                    <input
                        type="email"
                        value={verifiedEmail}
                        readOnly
                        className={styles.verifiedInput}
                        style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                    />
                </div>

                {/* Full Name - REQUIRED */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.yourName}>
                        <YourName />
                    </div>
                    <input
                        type="text"
                        placeholder="Full Name *"
                        value={formData.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={errors.name ? styles.error : ""}
                        required
                    />
                </div>

                {/* INN - Optional */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="INN (Tax ID) - Optional"
                        value={formData.inn || ""}
                        onChange={(e) => handleInputChange("inn", e.target.value)}
                        className={errors.inn ? styles.error : ""}
                    />
                </div>

                {/* Phone - Optional */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="tel"
                        placeholder="Phone Number - Optional"
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={errors.phone ? styles.error : ""}
                    />
                </div>

                {/* Password - REQUIRED */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.password}>
                        <PasswordLogin />
                    </div>
                    <input
                        type="password"
                        placeholder="Password (min. 6 characters) *"
                        value={formData.password || ""}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={errors.password ? styles.error : ""}
                        required
                    />
                </div>
            </div>

            <div className={styles.acceptTerms}>
                <input type="checkbox" id="Terms" required />
                <label htmlFor="Terms">
                    I accept the <a href="/terms" target="_blank">Terms and Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                </label>
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
            </button>
        </form>
    );
}