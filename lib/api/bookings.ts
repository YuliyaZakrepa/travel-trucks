import { api } from "./api";
import { BookingRequestPayload } from "@/types/booking";
export async function createBookingRequest(
  camperId: string,
  payload: BookingRequestPayload,
) {
  const { data } = await api.post(
    `/campers/${camperId}/booking-requests`,
    payload,
  );
  return data;
}