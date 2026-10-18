import Image from "next/image";
import Link from "next/link";
import { ENGINE_LABELS, TRANSMISSION_LABELS, CAMPER_FORM_LABELS } from "@/types/constants";
import { Camper } from "@/types/campers"; 
import css from "./CamperCard.module.css"; 
import { motion } from "framer-motion";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({camper}:CamperCardProps){
return(
<motion.li  className={css.card}>
              <Image
                className={css.image}
                src={camper.coverImage}
                alt={camper.name}
                width={240}
                height={219}
                loading="eager"
              />
              <div className={css.cardContent}>
                <div className={css.titleContainer}>
                  <h2 className={css.camperTitle}>{camper.name}</h2>
                  <span className={css.camperPrice}>€{camper.price}</span>
                </div>
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
                <p className={css.camperText}>{camper.description}</p>
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
                <Link
                  href={`/catalog/${camper.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.link}
                >
                  Show more
                </Link>
              </div>
            </motion.li>)}