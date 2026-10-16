import css from "./page.module.css";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getFilters } from "@/lib/api/filters";
import CatalogClient from "@/components/CatalogClient/CatalogClient";

export default async function Catalog(){
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
  )
}
