import { Reservation } from "@prisma/client";
import { PaymentMethodsResponse } from "@/app/admin/utilities/types";
import { Dispatch, SetStateAction } from "react";

export type ReservationResponse = Reservation[];

export type AddReservationProps = {
  fetchData: () => Promise<unknown>;
  data: ReservationResponse;
  methodsData: PaymentMethodsResponse;
  roomsPreview: { id: number; name: string }[];
};

export type EditReservationProps = {
  index: number;
  onSubmit: () => Promise<void>;
  data: Reservation;
  setData: Dispatch<SetStateAction<Reservation | null>>;
  methodsData: PaymentMethodsResponse;
  roomsPreview: { id: number; name: string }[];
};
