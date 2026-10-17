"use client";
import { useQuery } from "@tanstack/react-query";
import { getReviewsByCamperId } from "@/lib/api/reviews";
import Rating from "../Rating/Rating";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./Reviews.module.css"

interface ReviewsProps {
  camperId: string;
}

export default function Reviews({ camperId }: ReviewsProps) {
  const {
    data: reviews,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["reviews", camperId],
    queryFn: () => getReviewsByCamperId(camperId),
  });

  const latestReviews = reviews
    ? [...reviews]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 2)
    : [];

  return (
   <div className={css.reviewContainer}>

      {isPending && <p>Loading reviews...</p>}

      {isError && (
        <ErrorMessage
          message="Could not load reviews."
          onRetry={() => refetch()}
        />
      )}

      {!isPending && !isError && latestReviews.length === 0 && (
        <p>No reviews yet.</p>
      )}

      {latestReviews.length > 0 && (
        <ul className={css.review}>
          {latestReviews.map((review) => (
            <li key={review.id}>

              <div className={css.mainContainer}>
              <div className={css.letter}>
                <span aria-hidden="true" >
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </span>
                </div>
                <div className={css.rating}>
                  <p className={css.nameReviewer}>{review.reviewer_name}</p>
                  <Rating score={review.reviewer_rating} />
                </div>
                </div>
<p  className={css.reviewComment}>{review.comment}</p>
            </li>
          ))} 
        </ul>
      )}
    </div>
  );
}