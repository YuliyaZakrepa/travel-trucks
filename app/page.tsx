import HeroBlock from "@/components/HeroBlock/HeroBlock";
import { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_IMAGE } from "@/lib/store/seo";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} | Campers of your dreams`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Campers of your dreams`,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: SITE_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Campers of your dreams`,
    description: SITE_DESCRIPTION,
    images: SITE_IMAGE,
  },
};

export default function Home() {
  return (
    <main>
      <HeroBlock />
    </main>
  );
}
