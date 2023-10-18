import { Amenity, PaymentMethod } from "@prisma/client";

export type AmenityResponse = (Amenity & { isUsed: boolean })[];
export type PaymentMethodsResponse = (PaymentMethod & { isUsed: boolean })[];
