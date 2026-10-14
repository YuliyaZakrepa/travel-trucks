
import {api} from "./api"
import { FilterOptions } from "@/types/filters";

export async function getFilters(): Promise<FilterOptions> {
  const { data } = await api.get<FilterOptions>("/campers/filters");
  return data;
}