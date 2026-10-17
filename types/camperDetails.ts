import {CamperBase} from "./campers";

export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}


export interface CamperDetails extends CamperBase {
  gallery: CamperImage[];}