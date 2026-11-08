import css from "./CamperDescription.module.css";
import { Camper } from "@/types/campers";
import Icon from "../Icon/Icon";

interface CamperDescriptionProps {
  camper: Camper;
}
export default function CamperDescription({ camper }: CamperDescriptionProps) {
  return (
    <>
      <div className={css.titleContainer}>
        <h2 className={css.camperTitle}>{camper.name}</h2>
        <span className={css.camperPrice}>€{camper.price}</span>
      </div>
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
      <p className={css.camperText}>{camper.description}</p>
    </>
  );
}
