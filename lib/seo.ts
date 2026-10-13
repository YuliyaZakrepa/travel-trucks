export const SITE_NAME = "TravelTrucks";

export const SITE_TITLE =
  "Campers of your dreams";

export const SITE_DESCRIPTION =
  "Browse campers and motorhomes for sale in Ukraine. Find a camper van with kitchen, AC and automatic transmission.";


const url = process.env.NEXT_PUBLIC_APP_URL;
if (!url && process.env.NODE_ENV === "production") {
  throw new Error("NEXT_PUBLIC_APP_URL is not set");
}
export const SITE_URL = new URL(url || "http://localhost:3000");
