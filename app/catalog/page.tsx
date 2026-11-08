import css from "./page.module.css";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getFilters } from "@/lib/api/filters";
import CatalogClient from "@/components/CatalogClient/CatalogClient";
import { SITE_NAME, SITE_TITLE } from "@/lib/store/seo";
import { buildMetadata } from "@/lib/store/seo";

export const metadata = buildMetadata({
  title: `${SITE_NAME} | ${SITE_TITLE}`,
  path: "/",
  absoluteTitle: true,
});

export default async function Catalog() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["filters"],
    queryFn: () => getFilters(),
  });

  return (
    <section className="section">
      <div className="container">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CatalogClient />
        </HydrationBoundary>
      </div>
    </section>
  );
}
