import { getCamperById } from "@/lib/api/camperDetails";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import ReviewsPageClient from "@/components/ReviewsPageClient/ReviewsPageClient";
import css from "./page.module.css";
import { SITE_NAME } from "@/lib/store/seo";
import type { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const camper = await getCamperById(id);

    const title = camper.name;
    const fullTitle = `${camper.name} | ${SITE_NAME}`;
    const description =
      camper.description.length > 155
        ? `${camper.description.slice(0, 155).trim()}…`
        : camper.description;

    const firstImage = [...camper.gallery].sort((a, b) => a.order - b.order)[0];
    const images = firstImage
      ? [{ url: firstImage.original, alt: camper.name }]
      : undefined;

    return {
      title,
      description,
      alternates: { canonical: `/catalog/${id}` },
      openGraph: {
        title: fullTitle,
        description,
        url: `/catalog/${id}`,
        siteName: SITE_NAME,
        locale: "en_US",
        type: "website",
        images,
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description,
        images: images?.map((img) => img.url),
      },
    };
  } catch {
    return {
      title: "Camper not found",
      robots: { index: false },
    };
  }
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string; email?: string }>;
};

export default async function ReviewsPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { name = "", email = "" } = await searchParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["camper", id],
    queryFn: () => getCamperById(id),
  });

  return (
    <section className={`section ${css.pageSection}`}>
      <div className="container">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ReviewsPageClient initialName={name} initialEmail={email} />
        </HydrationBoundary>
      </div>
    </section>
  );
}
