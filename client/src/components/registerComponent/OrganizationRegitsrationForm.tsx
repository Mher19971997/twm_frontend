import { useState } from "react";
import styles from "./RegisterComponent.module.scss";
import YourName from "../../../public/assets/svg/YourName";
import PasswordLogin from "../../../public/assets/svg/PasswordLogin";
import EmailLogin from "../../../public/assets/svg/EmailLogin";
import LocationMapSelector from "../map/map";

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
    fieldErrors?: { [key: string]: string };
}

interface FormErrors {
    phone?: boolean;
    password?: boolean;
    name?: boolean;
    inn?: boolean;
    location_longitude?: boolean;
    location_latitude?: boolean;
}

export default function OrganizationRegistrationForm({
    onSubmit,
    loading,
    verifiedEmail,
    fieldErrors = {}
}: OrganizationRegistrationFormProps) {
    const [formData, setFormData] = useState({
        email: verifiedEmail,
        phone: "",
        name: "",
        inn: "",
        location_longitude: "44.4991", // Default Yerevan coordinates
        location_latitude: "40.1792",
        password: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLocationSelected, setIsLocationSelected] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear errors when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleLocationChange = (latitude: string, longitude: string) => {
        setFormData(prev => ({
            ...prev,
            location_latitude: latitude,
            location_longitude: longitude
        }));
        setIsLocationSelected(true);

        // Clear location errors
        setErrors(prev => ({
            ...prev,
            location_latitude: false,
            location_longitude: false
        }));
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

    // Check for server-side field errors
    const hasFieldError = (fieldName: string) => {
        return !!fieldErrors[fieldName] || errors[fieldName as keyof FormErrors];
    };

    const getFieldError = (fieldName: string) => {
        return fieldErrors[fieldName] || '';
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
                    {verifiedEmail && (
                        <small style={{
                            color: '#10b981',
                            fontSize: '12px',
                            marginTop: '4px',
                            display: 'block',
                            fontWeight: 500
                        }}>
                            ✓ Email verified
                        </small>
                    )}
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
                        className={hasFieldError('name') ? styles.error : ""}
                        required
                    />
                    {hasFieldError('name') && (
                        <small style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            {getFieldError('name') || 'Organization name is required'}
                        </small>
                    )}
                </div>

                {/* Phone - REQUIRED */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="tel"
                        placeholder="Organization Phone Number *"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={hasFieldError('phone') ? styles.error : ""}
                        required
                    />
                    {hasFieldError('phone') && (
                        <small style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            {getFieldError('phone') || 'Phone number is required'}
                        </small>
                    )}
                </div>

                {/* INN - REQUIRED */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="INN (Tax ID) *"
                        value={formData.inn}
                        onChange={(e) => handleInputChange("inn", e.target.value)}
                        className={hasFieldError('inn') ? styles.error : ""}
                        required
                    />
                    {hasFieldError('inn') && (
                        <small style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            {getFieldError('inn') || 'INN (Tax ID) is required'}
                        </small>
                    )}
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
                        className={hasFieldError('password') ? styles.error : ""}
                        required
                    />
                    {hasFieldError('password') && (
                        <small style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            {getFieldError('password') || 'Password must be at least 6 characters'}
                        </small>
                    )}
                </div>
            </div>

            {/* 🗺️ Interactive Map for Location Selection */}
            <div style={{ margin: '24px 0' }}>
                <h4 style={{
                    margin: '0 0 16px 0',
                    color: '#374151',
                    fontSize: '16px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    Organization Location *
                </h4>
                <p style={{
                    margin: '0 0 16px 0',
                    color: '#6b7280',
                    fontSize: '14px',
                    lineHeight: 1.5
                }}>
                    Select your organization's location on the map. You can search for an address, use your current location, or click directly on the map.
                </p>

                <LocationMapSelector
                    initialLat={parseFloat(formData.location_latitude)}
                    initialLng={parseFloat(formData.location_longitude)}
                    onLocationChange={handleLocationChange}
                />

                {/* Location confirmation */}
                {isLocationSelected && (
                    <div style={{
                        marginTop: '12px',
                        padding: '12px 16px',
                        backgroundColor: '#d1fae5',
                        color: '#065f46',
                        borderRadius: '8px',
                        border: '1px solid #10b981',
                        fontSize: '14px',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Location selected: {parseFloat(formData.location_latitude).toFixed(4)}, {parseFloat(formData.location_longitude).toFixed(4)}
                    </div>
                )}

                {/* Location errors */}
                {(hasFieldError('location_latitude') || hasFieldError('location_longitude')) && (
                    <small style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px', display: 'block' }}>
                        {getFieldError('location_latitude') || getFieldError('location_longitude') || 'Please select organization location on the map'}
                    </small>
                )}
            </div>

            {/* Hidden inputs for coordinates (for form validation) */}
            <input type="hidden" name="location_latitude" value={formData.location_latitude} />
            <input type="hidden" name="location_longitude" value={formData.location_longitude} />

            <div className={styles.acceptTerms}>
                <input type="checkbox" id="Terms" required />
                <label htmlFor="Terms">
                    I accept the <a href="/terms" target="_blank">Terms and Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                style={{
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                }}
            >
                {loading ? (
                    <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 1s linear infinite' }}>
                            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Creating Account...
                    </>
                ) : (
                    "Create Account"
                )}
            </button>

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </form>
    );
}