import styles from "./BasicConfirmButton.module.scss";
import React from "react";

interface BasicConfirmButtonProps {
  onClick: () => void;
}

const BasicConfirmButton: React.FC<BasicConfirmButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.basicConfirmBtn}>
      Confirm
    </button>
  );
};

export default BasicConfirmButton;