import css from "./page.module.css";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getFilters } from "@/lib/api/filters";
import CatalogClient from "@/components/CatalogClient/CatalogClient";
import type { Metadata } from "next";
import { SITE_NAME,SITE_IMAGE } from "@/lib/store/seo";
const title = "Catalog";
const fullTitle = `${title} | ${SITE_NAME}`;
const description =
  "Browse our camper catalog and filter by location, body type, engine and transmission.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/catalog",
  },
  openGraph: {
    title: fullTitle,
    description,
    url: "/catalog",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: SITE_IMAGE
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description,
    images: SITE_IMAGE
  },
};

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
