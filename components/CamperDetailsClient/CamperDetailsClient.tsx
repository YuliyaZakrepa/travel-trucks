"use client";
import { getCamperById } from "@/lib/api/camperDetails";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./CamperDetailsClient.module.css";
import {
  ENGINE_LABELS,
  TRANSMISSION_LABELS,
  CAMPER_FORM_LABELS,
  AMENITY_LABELS,
} from "@/types/constants";
import Gallery from "../Gallery/Gallery";
import Reviews from "../Reviews/Reviews"
import BookingForm from "../BookingForm/BookingForm";
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
        <div className={css.card}>
          <Gallery images={camper.gallery} name={camper.name} />
          <div className={css.righPart}>
            <div className={css.cardContent}>
              <h1 className={css.camperTitle}>{camper.name}</h1>
              <div className={css.infoContainer}>
                <p className={css.camperRating}>
                  <svg
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className={css.starIcon}
                  >
                    <use href="/icon.svg#icon-star" />
                  </svg>
                  {camper.rating} ({camper.totalReviews} Reviews)
                </p>

                <p className={css.camperLocation}>
                  <svg
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className={css.mapIcon}
                  >
                    <use href="/icon.svg#icon-Map" />
                  </svg>
                  {camper.location}
                </p>
              </div>
              <span className={css.camperPrice}>€{camper.price}</span>
              <p className={css.camperText}>{camper.description}</p>
            </div>

            <div className={css.cardInfo}>
              <h2 className={css.cardDitails}>Vehicle details</h2>
              <ul className={css.detailsList}>
                <li>{ENGINE_LABELS[camper.engine]}</li>
                <li>{TRANSMISSION_LABELS[camper.transmission]}</li>
                <li>{CAMPER_FORM_LABELS[camper.form]}</li>
                {camper.amenities.map((item) => (
                  <li key={item}>{AMENITY_LABELS[item]}</li>
                ))}
              </ul>
              <ul className={css.details}>
                <li>
                  <p>Form</p>
                  <p>{CAMPER_FORM_LABELS[camper.form]}</p>
                </li>
                <li>
                  <p>Length</p>
                  <p>{camper.length}</p>
                </li>
                <li>
                  <p>Width</p>
                  <p>{camper.width}</p>
                </li>
                <li>
                  <p>Height</p>
                  <p>{camper.height}</p>
                </li>
                <li>
                  <p>Tank</p>
                  <p>{camper.tank}</p>
                </li>
                <li>
                  <p>Consumption</p>
                  <p>{camper.consumption}</p>
                </li>
              </ul>
            </div>

          </div>


        </div>

        
      )}
      <h2 className={css.reviewTitle}>Reviews</h2>
      <div className={css.reviewForm}>
 <Reviews camperId={id}/>
 <BookingForm camperId={id}/>
    
</div>
    </div>
  );
}
