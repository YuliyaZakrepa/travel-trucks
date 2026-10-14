import { CamperForm, Transmission, Engine } from "./filters";

export type Amenity =
  | "ac"
  | "bathroom"
  | "kitchen"
  | "tv"
  | "radio"
  | "refrigerator"
  | "microwave"
  | "gas"
  | "water";

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  form: CamperForm;
  transmission: Transmission;
  engine: Engine;
  coverImage: string;
  description: string;
  amenities: Amenity[];
}

export interface CampersFilters {
  location?: string;
  form?: CamperForm;
  transmission?: Transmission;
  engine?: Engine;
}

export interface GetCampersParams extends CampersFilters {
  page: number;
  perPage: number;
}

export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}