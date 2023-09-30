import { ReservationBar, RoomPreview } from "@/components";
import { useSearchParams } from "next/navigation";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { RoomChooseContext } from "@/app/(other-pages)/reserve/room-choose/_context";
import { FormInstance, message, Skeleton } from "antd";
import { ReservationBarData } from "@/app/(other-pages)/reserve/room-choose/types";
import dayjs from "dayjs";
import { Amenity, Room } from "@prisma/client";

const RoomPickStep: FC<{ setIsValid: (val: boolean) => void }> = ({
  setIsValid,
}) => {
  const [isInit, setIsInit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState<
    (Room & { amenities: Amenity[]; fullPrice: number })[]
  >([]);

  const searchParams = useSearchParams();
  const highlightedRoom =
    rooms.find(({ id }) => id === +(searchParams.get("highlight") || -1)) ||
    null;

  const context = useContext(RoomChooseContext);

  useEffect(() => {
    if (!context?.barData || isInit) return;

    setIsLoading(true);
    fetch("/api/reserve/rooms", {
      method: "post",
      body: JSON.stringify(context?.barData),
    })
      .then((x) => x.json())
      .then(setRooms)
      .then(() => {
        setIsLoading(false);
        setIsInit(true);
      });
  }, [context?.barData, isInit]);

  useEffect(() => {
    if (context?.barData) {
      return;
    }

    try {
      const { people, arrival, departure }: ReservationBarData = JSON.parse(
        localStorage.getItem("reservationData")!,
      );

      if (people && departure && arrival) {
        context?.setBarData({
          people,
          arrival: dayjs(arrival).utcOffset(0).startOf("day"),
          departure: dayjs(departure).utcOffset(0).startOf("day"),
        });
      } else {
        throw new Error();
      }
    } catch {
      context?.setBarData({
        arrival: dayjs().utcOffset(0).startOf("day"),
        departure: dayjs().utcOffset(0).startOf("day").add(1, "day"),
        people: 1,
      });
    } finally {
      localStorage.removeItem("reservationData");
    }
  }, []);

  const handleSubmit = (form: FormInstance) => {
    context?.setRoomId(null);
    context?.setBarData(form.getFieldsValue());
    setIsValid(false);

    setIsLoading(true);
    fetch("/api/reserve/rooms", {
      method: "post",
      body: JSON.stringify(form.getFieldsValue()),
    })
      .then((x) => x.json())
      .then(setRooms)
      .then(() => setIsLoading(false))
      .catch(() => message.error("Wystąpił błąd, spróbuj ponownie później."));
  };

  const renderContent = () => {
    if (!isInit || isLoading) {
      return <Skeleton active />;
    }

    if (!rooms.length) {
      return <div>Nie ma dostępnych pokoi w danym terminie.</div>;
    }

    return (
      <>
        {highlightedRoom && (
          <>
            <div>Wyróżniony</div>
            <RoomPreview
              room={highlightedRoom}
              isFormItem
              isHighlighted={context?.roomId === highlightedRoom.id}
              onClick={() => {
                context?.setRoomId(highlightedRoom.id);
                setIsValid(true);
              }}
            />
          </>
        )}

        {rooms
          .filter((x) => x.id !== highlightedRoom?.id)
          .map((room, i) => (
            <Fragment key={room.id}>
              {highlightedRoom && i === 0 && <div>Pozostałe pokoje</div>}

              <RoomPreview
                room={room}
                isFormItem
                isHighlighted={context?.roomId === room.id}
                onClick={() => {
                  context?.setRoomId(room.id);
                  setIsValid(true);
                }}
              />
            </Fragment>
          ))}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {context?.barData && (
        <ReservationBar
          isFormItem
          className="!mb-6 md:border-x-2 md:border-y-2 md:rounded-xl border-green-800 border-opacity-80"
          handleSubmit={handleSubmit}
          initValues={context.barData}
        />
      )}

      {renderContent()}
    </div>
  );
};

export default RoomPickStep;
