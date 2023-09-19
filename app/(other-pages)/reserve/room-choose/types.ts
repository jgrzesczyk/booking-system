import { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";

export type TRoomChooseContext = {
  roomId: number | null;
  setRoomId: Dispatch<SetStateAction<number | null>>;
  formData: ReservationDataForm | null;
  setFormData: Dispatch<SetStateAction<ReservationDataForm | null>>;
  barData: ReservationBarData | null;
  setBarData: Dispatch<SetStateAction<ReservationBarData | null>>;
};

export type ReservationBarData = {
  arrival: Dayjs;
  departure: Dayjs;
  people: number;
};

export type ReservationDataForm = {
  paymentType: "payu" | "transfer";
  name: string;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
};
