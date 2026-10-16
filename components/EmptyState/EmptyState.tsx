import Image from "next/image";
import image from "@/public/catalog_image.png";
import css from "./EmptyState.module.css";
import Button from "../Button/Button";
interface EmptyStateProps {
  onReset: () => void;
}
export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={css.emptyStateWrapper} role="status">
  <Image src={image} alt="" height={488} width={463} />
  <h3 className={css.title}>No campers found</h3>
  <p className={css.text}>
    We couldn&apos;t find any campers that match your filters.
  </p>
  <p className={css.text}>
    Try adjusting your search or clearing some filters.
  </p>
  <div className={css.buttons}>
    <Button type="button" className={css.clearButton} onClick={onReset}>
      <svg width={24} height={24} aria-hidden="true">
        <use href="/icon.svg#icon-close-btn" />
      </svg>
      Clear filters
    </Button>
    <Button type="button" onClick={onReset} className={css.viewAllButton}>
      View all campers
    </Button>
  </div>
</div>
  );
}
