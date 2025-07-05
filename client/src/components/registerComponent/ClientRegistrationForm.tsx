import { useState } from "react";
import styles from "./RegisterComponent.module.scss";
import YourName from "../../../public/assets/svg/YourName";
import PasswordLogin from "../../../public/assets/svg/PasswordLogin";

interface RegisterInput {
    email?: string;
    phone?: string;
    nickname?: string;
    name?: string;
    surname?: string;
    birthDate?: string;
    gender?: string;
    password?: string; // Added password field
}

interface ClientRegistrationFormProps {
    onSubmit: (data: RegisterInput) => void;
    loading: boolean;
    verifiedEmail: string;
}

interface FormErrors {
    email?: boolean;
    phone?: boolean;
    nickname?: boolean;
    name?: boolean;
    surname?: boolean;
    birthDate?: boolean;
    gender?: boolean;
    password?: boolean;
}

export default function ClientRegistrationForm({ onSubmit, loading }: ClientRegistrationFormProps) {
    const [formData, setFormData] = useState<RegisterInput>({
        email: "",
        phone: "",
        nickname: "",
        name: "",
        surname: "",
        birthDate: "",
        gender: "",
        password: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (field: keyof RegisterInput, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Validation logic
        if (field === "email" && (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))) {
            setErrors(prev => ({ ...prev, email: true }));
        } else if (field === "name" && (!value || value.trim().length === 0)) {
            setErrors(prev => ({ ...prev, name: true }));
        } else if (field === "surname" && (!value || value.trim().length === 0)) {
            setErrors(prev => ({ ...prev, surname: true }));
        } else if (field === "password" && (!value || value.length < 6)) {
            setErrors(prev => ({ ...prev, password: true }));
        } else if (field === "birthDate" && value) {
            // Check if birth date is before 2016/01/01 (user must be older than 9 years)
            const birthDate = new Date(value);
            const maxDate = new Date('2016-01-01');
            if (birthDate >= maxDate) {
                setErrors(prev => ({ ...prev, birthDate: true }));
            } else {
                setErrors(prev => ({ ...prev, birthDate: false }));
            }
        } else if (field === "phone" && value && !/^\+?[\d\s\-\(\)]+$/.test(value)) {
            setErrors(prev => ({ ...prev, phone: true }));
        } else if (field === "nickname" && value && value.length < 3) {
            setErrors(prev => ({ ...prev, nickname: true }));
        } else {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields before submit
        const newErrors: FormErrors = {};
        if (!formData.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = true;
        }
        if (!formData.name || formData.name.trim().length === 0) {
            newErrors.name = true;
        }
        if (!formData.surname || formData.surname.trim().length === 0) {
            newErrors.surname = true;
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = true;
        }
        // Check birthDate if provided
        if (formData.birthDate) {
            const birthDate = new Date(formData.birthDate);
            const maxDate = new Date('2016-01-01');
            if (birthDate >= maxDate) {
                newErrors.birthDate = true;
            }
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
                {/* Email - REQUIRED */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.yourName}>
                        <YourName />
                    </div>
                    <input
                        type="email"
                        placeholder="Email Address *"
                        value={formData.email || ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? styles.error : ""}
                        required
                    />
                </div>

                {/* Phone - Optional */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.yourName}>
                        <YourName />
                    </div>
                    <input
                        type="tel"
                        placeholder="Phone Number - Optional"
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={errors.phone ? styles.error : ""}
                    />
                </div>

                {/* Nickname - Optional */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.yourName}>
                        <YourName />
                    </div>
                    <input
                        type="text"
                        placeholder="Nickname - Optional"
                        value={formData.nickname || ""}
                        onChange={(e) => handleInputChange("nickname", e.target.value)}
                        className={errors.nickname ? styles.error : ""}
                    />
                </div>

                {/* First Name - REQUIRED */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.yourName}>
                        <YourName />
                    </div>
                    <input
                        type="text"
                        placeholder="First Name *"
                        value={formData.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={errors.name ? styles.error : ""}
                        required
                    />
                </div>

                {/* Last Name - REQUIRED */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.yourName}>
                        <YourName />
                    </div>
                    <input
                        type="text"
                        placeholder="Last Name *"
                        value={formData.surname || ""}
                        onChange={(e) => handleInputChange("surname", e.target.value)}
                        className={errors.surname ? styles.error : ""}
                        required
                    />
                </div>

                {/* Birth Date - Optional */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.yourName}>
                        <YourName />
                    </div>
                    <input
                        type="date"
                        placeholder="Birth Date - Optional"
                        value={formData.birthDate || ""}
                        onChange={(e) => handleInputChange("birthDate", e.target.value)}
                        className={errors.birthDate ? styles.error : ""}
                        max="2015-12-31" // User must be older than 9 years
                    />
                    {errors.birthDate && <small className={styles.errorText}>You must be at least 9 years old</small>}
                </div>

                {/* Gender - Optional */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.yourName}>
                        <YourName />
                    </div>
                    <select
                        value={formData.gender || ""}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        className={errors.gender ? styles.error : ""}
                    >
                        <option value="">Select Gender - Optional</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
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