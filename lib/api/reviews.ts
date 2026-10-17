import { api } from "./api";
import { Review } from "@/types/review";

export async function getReviewsByCamperId(id: string): Promise<Review[]> {
  const { data } = await api.get<Review[]>(`/campers/${id}/reviews`);
  return data;
}