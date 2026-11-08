import Image from "next/image";
import Link from "next/link";
import {
  ENGINE_LABELS,
  TRANSMISSION_LABELS,
  CAMPER_FORM_LABELS,
} from "@/types/constants";
import { Camper } from "@/types/campers";
import css from "./CamperCard.module.css";
import { motion } from "framer-motion";
import Icon from "../Icon/Icon";
import CamperDescription from "../CamperDescription/CamperDescription";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <motion.li className={css.card}>
      <Image
        className={css.image}
        src={camper.coverImage}
        alt={camper.name}
        width={240}
        height={219}
        loading="eager"
      />
      <div className={css.cardContent}>
        <CamperDescription camper={camper} />
        <ul className={css.camperTypeContainer}>
          <li>
            <Icon name={"icon-engine"} className={css.icon} size={20} />
            {ENGINE_LABELS[camper.engine]}
          </li>
          <li>
            <Icon name={"icon-transmission"} className={css.icon} size={20} />
            {TRANSMISSION_LABELS[camper.transmission]}
          </li>
          <li>
            <Icon name={"icon-form"} className={css.icon} size={20} />
            {CAMPER_FORM_LABELS[camper.form]}
          </li>
        </ul>
        <Link
          href={`/catalog/${camper.id}`}
          rel="noopener noreferrer"
          className={css.link}
        >
          Show more
        </Link>
      </div>
    </motion.li>
  );
}
