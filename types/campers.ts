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

  export interface CamperBase {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: Transmission;
  engine: Engine;
  amenities: Amenity[];
}
export interface Camper extends CamperBase {
    coverImage: string;
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

