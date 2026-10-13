
export type CamperForm = "alcove" | "panel_van" | "integrated" | "semi_integrated";
export type Transmission = "automatic" | "manual";
export type Engine = "diesel" | "petrol" | "hybrid" | "electric";

export interface CamperFilters {
  forms: CamperForm[];
  transmissions: Transmission[];
  engines: Engine[];}

  import axios from "axios";

export async function getFilters(): Promise<CamperFilters> {
  const { data } = await axios.get<CamperFilters>("/campers/filters");
  return data;
}