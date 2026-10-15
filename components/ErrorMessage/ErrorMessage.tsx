import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className={css.wrapper} role="alert">
      <p className={css.text}>{message}</p>
      {onRetry && (
        <button type="button" className={css.button} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}