
export type CamperForm = "alcove" | "panel_van" | "integrated" | "semi_integrated";
export type Transmission = "automatic" | "manual";
export type Engine = "diesel" | "petrol" | "hybrid" | "electric";

export interface FilterOptions {
  forms: CamperForm[];
  transmissions: Transmission[];
  engines: Engine[];}



