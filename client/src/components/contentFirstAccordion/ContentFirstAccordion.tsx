import styles from "./ContentFirstAccordion.module.scss";
import { useState, useEffect } from "react";

interface ContentFirstAccordionProps {
  onPhotoChange: (url: string) => void;
}

export default function ContentFirstAccordion({
  onPhotoChange,
}: ContentFirstAccordionProps) {
  const [fileName, setFileName] = useState<string>("");
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<string[]>(["John Doe", "Vinicius Junior"]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setTempImage(imageUrl);
        setFileName(file.name);
      } else {
        alert("Please select an image file.");
      }
    }
  };

  const handleSavePhoto = () => {
    if (tempImage) {
      onPhotoChange(tempImage);
      setTempImage(null);
      setFileName("");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const unblockUser = (user: string) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <div className={styles.contentFirstAccordion}>
      <label htmlFor="photo">Change Profile Photo</label>
      <input id="photo" type="file" onChange={handleFileChange} accept="image/*" />
      {tempImage && (
        <div>
          <img src={tempImage} alt="Selected Profile" width={100} height={100} />
          <button onClick={handleSavePhoto}>Готово</button>
        </div>
      )}

      <div>
        <div className={styles["accordion-content"]}>
          <button onClick={toggleModal} className={styles["close-button"]}>
            Blocked People
          </button>
        </div>

        {isModalOpen && (
          <div className={styles["modal-overlay"]} onClick={toggleModal}>
            <div
              className={styles["modal-content"]}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles["modal-close-btn"]}
                onClick={toggleModal}
              >
                &times;
              </button>
              <h2>Blocked People</h2>
              {users.length === 0 ? (
                <p>Заблокированных пользователей нету</p>
              ) : (
                <ul>
                  {users.map((person: string, index: number) => (
                    <li key={index}>
                      {person}
                      <button
                        className={styles.unBlock}
                        onClick={() => unblockUser(person)}
                      >
                        Разблокировать
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
