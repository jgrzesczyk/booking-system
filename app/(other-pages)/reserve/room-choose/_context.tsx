import { createContext, FC, ReactNode, useState } from "react";
import {
  ReservationBarData,
  ReservationDataForm,
  TRoomChooseContext,
} from "@/app/(other-pages)/reserve/room-choose/types";

export const RoomChooseContext = createContext<TRoomChooseContext | null>(null);

export const RoomChooseContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [roomId, setRoomId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ReservationDataForm | null>(null);
  const [barData, setBarData] = useState<ReservationBarData | null>(null);

  return (
    <RoomChooseContext.Provider
      value={{ roomId, setRoomId, formData, setFormData, barData, setBarData }}
    >
      {children}
    </RoomChooseContext.Provider>
  );
};
