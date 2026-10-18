"use client";
import { getCamperById } from "@/lib/api/camperDetails";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import PhotoSlider from "../PhotoSlider/PhotoSlider";
import css from "./ReviewsPageClient.module.css";
import Link from "next/link";
import Features from "../Features/Features";
import { useState } from "react";

import {
  ENGINE_LABELS,
  TRANSMISSION_LABELS,
  CAMPER_FORM_LABELS,
} from "@/types/constants";
import Button from "../Button/Button";
import Reviews from "../Reviews/Reviews";
import BookingForm from "../BookingForm/BookingForm";

type Tab = "features" | "reviews";
interface ReviewsPageClientProps {
  initialName?: string;
  initialEmail?: string;
}

export default function ReviewsPageClient({
  initialName = "",
  initialEmail = ""
}: ReviewsPageClientProps) {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const email = searchParams.get("email") ?? "";
  const PAGE_SIZE = 10;
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [activeTab, setActiveTab] = useState<Tab>("reviews");

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
      <Link href="/catalog" className={css.backLink}>
        <svg width={20} height={20} aria-hidden="true">
          <use href="/icon.svg#icon-arrow-left" />
        </svg>
        Back to catalog
      </Link>
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
        <div>
          <div className={css.cardContent}>
            <div className={css.titleContainer}>
              <h1 className={css.camperTitle}>{camper.name}</h1>
              <span className={css.camperPrice}>€{camper.price}</span>
            </div>

            <div className={css.infoContainer}>
              <Link href="#reviews" className={css.camperRating}>
                <svg
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className={css.starIcon}
                >
                  <use href="/icon.svg#icon-star" />
                </svg>
                {camper.rating} ({camper.totalReviews} Reviews)
              </Link>

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
          </div>

          <div className={css.mainContainer}>
            <div className={css.imgContainer}>
              <PhotoSlider images={camper.gallery} name={camper.name} />
            </div>
            <div className={css.descriptionContainer}>
              <h2>Camper overview</h2>
              <ul className={css.camperTypeContainer}>
                <li>
                  <svg
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className={css.icon}
                  >
                    <use href="/icon.svg#icon-engine" />
                  </svg>
                  {ENGINE_LABELS[camper.engine]}
                </li>
                <li>
                  <svg
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className={css.icon}
                  >
                    <use href="/icon.svg#icon-transmission" />
                  </svg>
                  {TRANSMISSION_LABELS[camper.transmission]}
                </li>
                <li>
                  <svg
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className={css.icon}
                  >
                    <use href="/icon.svg#icon-form" />
                  </svg>
                  {CAMPER_FORM_LABELS[camper.form]}
                </li>
              </ul>
             
              <div>
                <h3>Plan your trip from Kyiv</h3>
                <p>
                  Read the reviews below, then send your travel dates to enquire
                  about availability and the exact vehicle.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div >
        
        <div className={css.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "features"}
            className={`${css.titleLink} ${activeTab === "features" ? css.tabActive : ""}`}
            onClick={() => setActiveTab("features")}
          >
            Features
          </button>

          <button
            type="button"
            role="tab"
            id="reviews"
            aria-selected={activeTab === "reviews"}
            className={`${css.titleLink} ${activeTab === "reviews" ? css.tabActive : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews <span className={css.count}>({camper?.totalReviews})</span>
          </button>
          
        </div>
        </div>
        <div className={css.content}>
 
      </div>
      <div className={css.reviewFormContainer}>
         <div>
    {camper&&activeTab === "features" && <Features camper={camper} />}
    {camper&&activeTab === "reviews" && (
      <div   className={css.reviewContainer}>
          <div className={css.ratingContainer}>
            <p>
              <svg
                width={24}
                height={24}
                aria-hidden="true"
                className={css.starIcon}
              >
                <use href="/icon.svg#icon-star" />
              </svg>
              <span>{camper?.rating}</span>
              {camper?.totalReviews} Reviews
            </p>
          </div>
          <Reviews camperId={id} className={css.reviewsPage} />
          {camper && camper.totalReviews > visible && (
            <Button
              type="button"
              className={css.loadMoreBtn}
              onClick={() => setVisible((prev) => prev + PAGE_SIZE)}
            >
              Load more reviews
            </Button>
          )}
        </div>
    )}
  </div>
        

        <div className={css.bookingForm}>
            <BookingForm
            camperId={id}
            camperName={camper?.name}
            initialName={initialName}
            initialEmail={initialEmail}
          />
        </div>
      </div>
    </div>
  );
}
