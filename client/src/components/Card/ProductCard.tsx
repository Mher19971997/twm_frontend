"use client"
import { useParams, useRouter } from "next/navigation";
import styles from "./ProductCard.module.css";

const ProductCard = ({ data }: any) => {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale

  return (
    <>
      <main className={styles.cardsContainer}>
        {data?.map((tour: any) => (
          <div
            key={tour.uuid}
            className={styles.card}
            onClick={() => router.push(`/tours/${tour.uuid}`)}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.cardImageContainer}>
              <img src={process.env.NEXT_PUBLIC_APP_IMAGE_URL + tour.img} alt={tour.name} />
            </div>
            <div className={styles.cardContent}>
              <h3>
                {
                  (() => {
                    if (typeof tour?.name === 'string') {
                      try {
                        const parsedName = JSON.parse(tour.name);
                        if (parsedName && typeof parsedName === 'object' && parsedName[locale as any]) {
                          return parsedName[locale as any];
                        }
                      } catch {
                        return tour.name;
                      }
                    }
                    return '';
                  })()
                }
              </h3>              <p>{tour.destination}</p>
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
