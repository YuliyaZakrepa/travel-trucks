'use client';

import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button/Button';

import styles from './error.module.css';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.text}>
        Please try again or come back later.
      </p>
      <Button type="button" onClick={handleRetry} disabled={isPending}>
        {isPending ? 'Please wait...' : 'Try again'}
      </Button>
    </div>
  );
}