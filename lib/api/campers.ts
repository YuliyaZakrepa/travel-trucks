import { api } from "./api";
import { CampersResponse, GetCampersParams } from "@/types/campers";

export async function getCampers(
  params: GetCampersParams,
): Promise<CampersResponse> {
  const { data } = await api.get<CampersResponse>("/campers", { params });
  return data;
}