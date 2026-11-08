"use client";
import { getCamperById } from "@/lib/api/camperDetails";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./CamperDetailsClient.module.css";
import Gallery from "../Gallery/Gallery";
import Reviews from "../Reviews/Reviews";
import ContactForm from "../ContactForm/ContactForm";
import Features from "../Features/Features";
import Icon from "../Icon/Icon";

export default function CamperDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: camper,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["camper", id],
    queryFn: () => getCamperById(id),
  });

  return (
    <div className={css.camperWrapper}>
      {isPending && (
        <div className={css.globalLoaderOverlay}>
          <div className={css.loaderWrapper} role="status">
            <Loader />
            <span>Loading...</span>
            <p className={css.loaderText}>Please wait.</p>
          </div>
        </div>
      )}
      {error && (
        <div className={css.errorText}>
          <ErrorMessage
            message="Could not load camper details."
            onRetry={() => refetch()}
          />
        </div>
      )}
      {camper && (
        <>
          <div className={css.card}>
            <Gallery images={camper.gallery} name={camper.name} />
            <div className={css.righPart}>
              <div className={css.cardContent}>
                <h1 className={css.camperTitle}>{camper.name}</h1>
                <div className={css.infoContainer}>
                  <p className={css.camperRating}>
                    <Icon name={"icon-star"} className={css.starIcon} />
                    {camper.rating} ({camper.totalReviews} Reviews)
                  </p>
                  <p className={css.camperLocation}>
                    <Icon name={"icon-Map"} className={css.mapIcon} />
                    {camper.location}
                  </p>
                </div>
                <span className={css.camperPrice}>€{camper.price}</span>
                <p className={css.camperText}>{camper.description}</p>
              </div>

              <div className={css.cardInfo}>
                <Features camper={camper} />
              </div>
            </div>
          </div>
          <h2 className={css.reviewTitle}>Reviews</h2>
          <div className={css.reviewForm}>
            <Reviews camperId={id} limit={2} />
            <ContactForm camperId={id} />
          </div>
        </>
      )}
    </div>
  );
}
