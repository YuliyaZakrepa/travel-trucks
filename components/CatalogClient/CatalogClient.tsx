"use client";
import css from "./CatalogClient.module.css";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllCampers } from "@/lib/api/campers";
import { CampersFilters } from "@/types/campers";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import CamperCard from "../CamperCard/CamperCard";
import EmptyState from "../EmptyState/EmptyState";
import Button from "../Button/Button";

const PER_PAGE = 4;

export default function CatalogClient() {
  const [filters, setFilters] = useState<CampersFilters>({});
  const [formKey, setFormKey] = useState(0);

  const reset = () => {
    setFilters({});
    setFormKey((prev) => prev + 1);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) =>
      getAllCampers({ ...filters, page: pageParam, perPage: PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    retry: 1,
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  return (
    <div className={css.catalogWrapper}>
      <FilterPanel key={formKey} onSearch={setFilters} />

      <div className={css.catalog}>
        {isPending && (
          <div className={css.globalLoaderOverlay}>
            <div className={css.loaderWrapper} role="status">
              <Loader />
              <span>Loading tracks...</span>
              <p className={css.loaderText}>
                Please wait while we fetch the best travel trucks for you
              </p>
            </div>
          </div>
        )}

        {isError && campers.length === 0 && (
          <div className={css.errorText}>
            <ErrorMessage
              message="Could not load catalog."
              onRetry={() => refetch()}
            />
          </div>
        )}
        {isError && campers.length > 0 && (
          <ErrorMessage
            message="Could not load more campers."
            onRetry={() => fetchNextPage()}
          />
        )}
        {!isPending && !isError && campers.length === 0 && (
          <EmptyState onReset={reset} />
        )}

        {campers.length > 0 && (
          <ul className={css.list}>
            {campers.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </ul>
        )}

        {hasNextPage && (
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={css.loadMoreBtn}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
}
