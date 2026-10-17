import { api } from "./api";
import { CamperDetails} from "@/types/camperDetails";

export async function getCamperById(id:string): Promise<CamperDetails> {
  const { data } = await api.get<CamperDetails>(`/campers/${id}`);
  return data;
}