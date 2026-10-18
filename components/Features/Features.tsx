 import {
  ENGINE_LABELS,
  TRANSMISSION_LABELS,
  CAMPER_FORM_LABELS,
  AMENITY_LABELS,
} from "@/types/constants";
import {CamperDetails} from "@/types/camperDetails";
import{Camper} from "@/types/campers"
import css from "./Features.module.css"

interface FeaturesProps{
    camper: CamperDetails | Camper;
}

 export default function Features ({camper}: FeaturesProps){
    return(
    <div className={css.cardInfo}>
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
            </div>)
 }
 