import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getCamperById } from "@/lib/api/camperDetails";
import CamperDetailsClient from "@/components/CamperDetailsClient/CamperDetailsClient";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/store/seo";
import css from "./page.module.css";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const camper = await getCamperById(id);
    const description =
      camper.description.length > 155
        ? `${camper.description.slice(0, 155).trim()}…`
        : camper.description;
    const firstImage = [...camper.gallery].sort((a, b) => a.order - b.order)[0];

    return buildMetadata({
      title: camper.name,
      description,
      path: `/catalog/${id}`,
      images: firstImage
        ? [{ url: firstImage.original, alt: camper.name }]
        : undefined,
    });
  } catch {
    return {
      title: "Camper not found",
      robots: { index: false },
    };
  }
}
type Props = {
  params: Promise<{ id: string }>;
};
export default async function CardDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["camper", id],
    queryFn: () => getCamperById(id),
  });
  return (
    <section className={`section ${css.pageSection}`}>
      <div className="container">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CamperDetailsClient />
        </HydrationBoundary>
      </div>
    </section>
  );
}
