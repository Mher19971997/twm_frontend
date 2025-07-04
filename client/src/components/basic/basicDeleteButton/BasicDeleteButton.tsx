import styles from "./BasicDeleteButton.module.scss";
import React from "react";

interface BasicConfirmButtonProps {
  onClick: () => void;
}

const BasicDeleteButton: React.FC<BasicConfirmButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.basicDeleteBtn}>
      Delete
    </button>
  );
};

export default BasicDeleteButton;