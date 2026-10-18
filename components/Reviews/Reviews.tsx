"use client";
import { useQuery } from "@tanstack/react-query";
import { getReviewsByCamperId } from "@/lib/api/reviews";
import Rating from "../Rating/Rating";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./Reviews.module.css";

interface ReviewsProps {
  camperId: string;
  limit?: number;
  className?: string;
}

export default function Reviews({ camperId, limit, className }: ReviewsProps) {
  const {
    data: reviews,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["reviews", camperId],
    queryFn: () => getReviewsByCamperId(camperId),
  });

  const sorted = reviews
    ? [...reviews].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    : [];

  const shown = limit ? sorted.slice(0, limit) : sorted;

  return (
    <div className={`${css.reviewContainer} ${className ?? ""}`}>
      {isPending && <p>Loading reviews...</p>}

      {isError && (
        <ErrorMessage
          message="Could not load reviews."
          onRetry={() => refetch()}
        />
      )}

      {!isPending && !isError && shown.length === 0 && <p>No reviews yet.</p>}

      {shown.length > 0 && (
        <ul className={css.review}>
          {shown.map((review) => (
            <li key={review.id}>
              <div className={css.mainContainer}>
                <div className={css.letter}>
                  <span aria-hidden="true">
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className={css.rating}>
                  <p className={css.nameReviewer}>{review.reviewer_name}</p>
                  <Rating score={review.reviewer_rating} />
                </div>
              </div>
              <p className={css.reviewComment}>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
