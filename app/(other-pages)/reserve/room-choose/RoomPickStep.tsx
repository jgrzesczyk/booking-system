import { ReservationBar, RoomPreview } from "@/components";
import { useSearchParams } from "next/navigation";
import { FC, useContext, useEffect, useState } from "react";
import { RoomChooseContext } from "@/app/(other-pages)/reserve/room-choose/_context";
import { FormInstance } from "antd";
import { ReservationBarData } from "@/app/(other-pages)/reserve/room-choose/types";
import dayjs from "dayjs";

const RoomPickStep: FC<{ setIsValid: (val: boolean) => void }> = ({
  setIsValid,
}) => {
  const [homepageBarData, setHomepageBarData] =
    useState<ReservationBarData | null>();
  const searchParams = useSearchParams();
  const highlightedId = searchParams.get("highlight");

  const context = useContext(RoomChooseContext);

  useEffect(() => {
    try {
      const { people, arrival, departure }: ReservationBarData = JSON.parse(
        localStorage.getItem("reservationData")!,
      );

      if (people && departure && arrival) {
        setHomepageBarData({
          people,
          arrival: dayjs(arrival),
          departure: dayjs(departure),
        });
      } else {
        setHomepageBarData(null);
      }
    } catch {
      setHomepageBarData(null);
    } finally {
      localStorage.removeItem("reservationData");
    }
  }, []);

  const handleSubmit = (form: FormInstance) => {
    context?.setRoomId(null);
    context?.setBarData(form.getFieldsValue());
    setIsValid(false);
    console.log("strzał po rzeczy");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {homepageBarData !== undefined && (
        <ReservationBar
          isFormItem
          className="!mb-6 md:border-x-2 md:border-y-2 md:rounded-xl border-green-800 border-opacity-80"
          handleSubmit={handleSubmit}
          initValues={context?.barData || homepageBarData}
        />
      )}
      <div>Wyróżniony</div>
      <RoomPreview
        key={111}
        isFormItem
        isHighlighted={context?.roomId === 111}
        onClick={() => {
          context?.setRoomId(111);
          setIsValid(true);
        }}
      />
      <div>Pozostałe pokoje</div>
      {[...Array(4)].map((_, i) => (
        <RoomPreview
          key={i}
          isFormItem
          isHighlighted={context?.roomId === i}
          isDisabled={i >= 2}
          onClick={() => {
            if (i >= 2) return;

            context?.setRoomId(i);
            setIsValid(true);
          }}
        />
      ))}
    </div>
  );
};

export default RoomPickStep;
