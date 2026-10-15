"use client";
import css from "./CatalogClient.module.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllCampers } from "@/lib/api/campers";
import { CampersFilters } from "@/types/campers";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import {
  ENGINE_LABELS,
  TRANSMISSION_LABELS,
  CAMPER_FORM_LABELS,
} from "@/types/constants";

const PER_PAGE = 4;

export default function CatalogClient() {
  const [filters, setFilters] = useState<CampersFilters>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) =>
      getAllCampers({ ...filters, page: pageParam, perPage: PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  return (
    <div style={{ display: "flex", gap: 64 }}>
      <FilterPanel onSearch={setFilters} />

      <div>
        {isPending && <p>Loading...</p>}
        {isError && <p>Something went wrong.</p>}
        {!isPending && !isError && campers.length === 0 && (
          <p>No campers found.</p>
        )}

        <ul className={css.list}>
          {campers.map((camper) => (
            <li key={camper.id} className={css.card}>
              <Image
                className={css.image}
                src={camper.coverImage}
                alt={camper.name}
                width={240}
                height={219}
              />
              <div className={css.cardContent}>
                <div className={css.titleContainer}>
                  <h2 className={css.camperTitle}>{camper.name}</h2>
                  <span className={css.camperPrice}>€{camper.price}</span>
                </div>
                <div className={css.infoContainer}>
                  <p className={css.camperRating}>
                    <svg width={16} height={16} aria-hidden="true">
                      <use href="/icon.svg#icon-star" />
                    </svg>
                    {camper.rating} ({camper.totalReviews} Reviews)
                  </p>

                  <p className={css.camperLocation}>
                    <svg width={16} height={16} aria-hidden="true">
                      <use href="/icon.svg#icon-Map" />
                    </svg>
                    {camper.location}
                  </p>
                </div>
                <p className={css.camperText}>{camper.description}</p>
                <ul className={css.camperTypeContainer}>
                  <li>
                    <svg width={20} height={20} aria-hidden="true">
                      <use href="/icon.svg#icon-engine" />
                    </svg>
                    {ENGINE_LABELS[camper.engine]}</li>
                  <li>
                    <svg width={20} height={20} aria-hidden="true">
                      <use href="/icon.svg#icon-transmission" />
                    </svg>
                    {TRANSMISSION_LABELS[camper.transmission]}
                    </li>
                  <li>
                    <svg width={20} height={20} aria-hidden="true">
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
            </li>
          ))}
        </ul>

        {hasNextPage && (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}
// Що тут важливо розуміти

// filters це застосовані фільтри. Вони змінюються лише коли форма викликає onSearch.
// Фільтри лежать у ключі ["campers", filters], тому при їх зміні список автоматично починається з першої сторінки.
// data.pages це стопка відповідей, а flatMap складає з них один плоский список кемперів.
// hasNextPage рахується з правила getNextPageParam: поки page < totalPages, кнопка видима.
