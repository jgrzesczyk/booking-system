import { Amenity, PaymentMethod } from "@prisma/client";
import { FC } from "react";

export type AmenityResponse = (Amenity & { isUsed: boolean })[];
export type PaymentMethodsResponse = (PaymentMethod & { isUsed: boolean })[];

export type UtilitiesSection = FC<{
  fetchData: () => Promise<unknown>;
  data: unknown[];
}>;
