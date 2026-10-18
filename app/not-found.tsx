import Link from 'next/link';

import buttonStyles from '@/components/Button/Button.module.css';

import styles from './not-found.module.css';

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