import styles from "../../../src/components/accordion/Accordion.module.scss";
export default function UserAccordion() {
  return (
    <div className={styles.userDiv}>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.08372 13.196C10.3655 13.196 13.0258 10.5705 13.0258 7.33169C13.0258 4.09292 10.3655 1.46738 7.08372 1.46738C3.80198 1.46738 1.1416 4.09292 1.1416 7.33169C1.1416 10.5705 3.80198 13.196 7.08372 13.196Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="27"
        height="12"
        viewBox="0 0 27 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.4277 10.0571V7.21379C25.4277 5.70561 24.8016 4.2592 23.6873 3.19276C22.5729 2.12631 21.0615 1.52719 19.4855 1.52719H7.6013C6.02535 1.52719 4.51395 2.12631 3.39959 3.19276C2.28522 4.2592 1.65918 5.70561 1.65918 7.21379V10.0571"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
