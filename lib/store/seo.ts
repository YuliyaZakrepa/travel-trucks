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
