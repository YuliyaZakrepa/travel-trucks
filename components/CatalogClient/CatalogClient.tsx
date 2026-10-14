"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api/campers";
import { CampersFilters } from "@/types/campers";
import FilterPanel from "@/components/FilterPanel/FilterPanel";

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
      getCampers({ ...filters, page: pageParam, perPage: PER_PAGE }),
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

        <ul>
          {campers.map((camper) => (
            <li key={camper.id}>{camper.name}</li>
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