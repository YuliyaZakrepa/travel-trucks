import Image from "next/image";
import bigImage from "@/public/big_image.jpg"
import css from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={`section ${css.mainSection}`}>
      <Image
        src={bigImage}
        alt="Camper van parked by a river at sunset"
        fill
        sizes="(max-width: 1440px) 100vw, 1440px"
        priority
        className={css.backgroundImage}
      />
       <div className={css.overlay}></div>
      <div className={`container ${css.heroContainer}`}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.description}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className={css.link}>View Now</Link>
      </div>
    </main>
  );
}
