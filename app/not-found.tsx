import Link from "next/link";
import styles from "./not-found.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>
        It may have been deleted, or the address was entered incorrectly.
      </p>
      <Link href="/" className={styles.link}>
        Go to homepage
      </Link>
    </div>
  );
}
