import { Amenity, Room } from "@prisma/client";
import { FormInstance } from "antd";
import { AmenityResponse } from "@/app/admin/utilities/types";
import { Dispatch, SetStateAction } from "react";

export type RoomDetailsResponse = Room & { amenities: Amenity[] };
export type RoomResponse = (Room & { isUsed: boolean })[];

export type PreviewRowProps = {
  row: RoomResponse[0];
  index: number;
  fetchData: () => Promise<void>;
};

export type RoomFormProps = {
  form: FormInstance<RoomForm>;
  amenities: AmenityResponse;
  submitForm: (
    isSubmitting: Dispatch<SetStateAction<boolean>>,
  ) => Promise<void>;
};

export type RoomForm = {
  name: string;
  area: number;
  peopleNo: number;
  bedsDescription: string;
  description: string;
  price: number;
  amenities: number[];
  isActive?: boolean;
};
