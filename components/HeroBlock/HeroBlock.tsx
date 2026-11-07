import Image from "next/image";
import bigImage from "@/public/big_image.jpg";
import css from "./HeroBlock.module.css";
import Link from "next/link";
export default function HeroBlock() {
  return (
    <section className={css.mainSection}>
      <Image
        src={bigImage}
        alt="Camper van parked by a river at sunset"
        fill
        placeholder="blur"
        priority
        className={css.backgroundImage}
      />
      <div className={css.overlay}></div>
      <div className={css.heroContainer}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.description}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className={css.link}>
          View Now
        </Link>
      </div>
    </section>
  );
}
