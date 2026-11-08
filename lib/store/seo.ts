import { Metadata } from "next";

export const SITE_NAME = "TravelTrucks";

export const SITE_TITLE = "Campers of your dreams";

export const SITE_DESCRIPTION =
  "Browse campers and motorhomes for sale in Ukraine. Find a camper van with kitchen, AC and automatic transmission.";

const getAppUrl = (): string => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export const SITE_URL = new URL(getAppUrl());

export const SITE_IMAGE = [
  {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "TravelTrucks",
  },
];
type SeoImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type BuildMetadataParams = {
  title: string;
  description?: string;
  path: string;
  images?: SeoImage[];
  absoluteTitle?: boolean;
};
export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  images = SITE_IMAGE,
  absoluteTitle = false,
}: BuildMetadataParams): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((img) => img.url),
    },
  };
}
