import { useState } from "react";
import styles from "./RegisterComponent.module.scss";
import YourName from "../../../public/assets/svg/YourName";
import PasswordLogin from "../../../public/assets/svg/PasswordLogin";
import EmailLogin from "../../../public/assets/svg/EmailLogin";

interface RegisterOrganisationInput {
    location_latitude: number;
    phone: string;
    location_longitude: number;
    name: string;
    email: string;
    inn: string;
    password: string;
}

interface OrganizationRegistrationFormProps {
    onSubmit: (data: RegisterOrganisationInput) => void;
    loading: boolean;
    verifiedEmail: string;
}

interface FormErrors {
    phone?: boolean;
    password?: boolean;
    name?: boolean;
    inn?: boolean;
    location_longitude?: boolean;
    location_latitude?: boolean;
}

export default function OrganizationRegistrationForm({ onSubmit, loading, verifiedEmail }: OrganizationRegistrationFormProps) {
    const [formData, setFormData] = useState({
        email: verifiedEmail,
        phone: "",
        name: "",
        inn: "",
        location_longitude: "",
        location_latitude: "",
        password: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear errors when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all required fields
        const newErrors: FormErrors = {};

        if (!formData.name || formData.name.trim().length === 0) {
            newErrors.name = true;
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = true;
        }
        if (!formData.phone || formData.phone.trim().length === 0) {
            newErrors.phone = true;
        }
        if (!formData.inn || formData.inn.trim().length === 0) {
            newErrors.inn = true;
        }
        if (!formData.location_longitude || formData.location_longitude.trim().length === 0) {
            newErrors.location_longitude = true;
        }
        if (!formData.location_latitude || formData.location_latitude.trim().length === 0) {
            newErrors.location_latitude = true;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Prepare data with correct types
        const submitData: RegisterOrganisationInput = {
            name: formData.name.trim(),
            email: formData.email,
            phone: formData.phone.trim(),
            inn: formData.inn.trim(),
            location_latitude: parseFloat(formData.location_latitude),
            location_longitude: parseFloat(formData.location_longitude),
            password: formData.password
        };

        onSubmit(submitData);
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

                {/* Organization Name - REQUIRED */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.yourName}>
                        <YourName />
                    </div>
                    <input
                        type="text"
                        placeholder="Organization Name *"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={errors.name ? styles.error : ""}
                        required
                    />
                </div>

                {/* Phone - REQUIRED */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="tel"
                        placeholder="Organization Phone Number *"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={errors.phone ? styles.error : ""}
                        required
                    />
                </div>

                {/* INN - REQUIRED */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="INN (Tax ID) *"
                        value={formData.inn}
                        onChange={(e) => handleInputChange("inn", e.target.value)}
                        className={errors.inn ? styles.error : ""}
                        required
                    />
                </div>

                {/* Location coordinates - REQUIRED */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <input
                            type="number"
                            step="any"
                            placeholder="Longitude *"
                            value={formData.location_longitude}
                            onChange={(e) => handleInputChange("location_longitude", e.target.value)}
                            className={errors.location_longitude ? styles.error : ""}
                            required
                        />
                    </div>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <input
                            type="number"
                            step="any"
                            placeholder="Latitude *"
                            value={formData.location_latitude}
                            onChange={(e) => handleInputChange("location_latitude", e.target.value)}
                            className={errors.location_latitude ? styles.error : ""}
                            required
                        />
                    </div>
                </div>

                {/* Password - REQUIRED */}
                <div style={{ position: 'relative' }}>
                    <div className={styles.password}>
                        <PasswordLogin />
                    </div>
                    <input
                        type="password"
                        placeholder="Password (min. 6 characters) *"
                        value={formData.password}
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