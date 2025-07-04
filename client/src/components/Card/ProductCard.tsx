import { useRouter } from "next/navigation";
import styles from "./ProductCard.module.css";

const ProductCard = ({ data }: any) => {
  const router = useRouter();
  return (
    <>
      <main className={styles.cardsContainer}>
        {data.map((tour: any) => (
          <div
            key={tour.id}
            className={styles.card}
            onClick={() => router.push(`/tours/${tour.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.cardImageContainer}>
              <img src={tour.image} alt={tour.name} />
            </div>
            <div className={styles.cardContent}>
              <h3>{tour.name}</h3>
              <p>{tour.destination}</p>
              <p>Price: ${tour.price}</p>
              <p>Location: {tour.location}</p>
              <p>Rating: {tour.rating}⭐</p>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p>No tours match the selected filters.</p>
        )}
      </main>
    </>
  );
};

export default ProductCard;
