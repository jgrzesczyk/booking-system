import { FC, useContext, useEffect, useState } from "react";
import { RoomReservationPreview } from "@/components";
import { RoomChooseContext } from "@/app/(other-pages)/reserve/room-choose/_context";
import { message, Skeleton } from "antd";
import { Photo, Room } from "@prisma/client";

const ReservationComplete: FC = () => {
  const context = useContext(RoomChooseContext);
  const [id, setId] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [reservationDetails, setReservationDetails] = useState("");
  const [roomDetails, setRoomDetails] = useState<
    (Room & { photos: Photo[]; fullPrice: number }) | null
  >(null);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      fetch("/api/reserve/details", {
        method: "post",
        body: JSON.stringify({
          arrival: context?.barData?.arrival,
          departure: context?.barData?.departure,
          roomId: context?.roomId,
        }),
      }),
      fetch("/api/reserve", {
        method: "post",
        body: JSON.stringify({
          arrival: context?.barData?.arrival,
          departure: context?.barData?.departure,
          people: context?.barData?.people,
          roomId: context?.roomId,
          name: context?.formData?.name,
          city: context?.formData?.city,
          email: context?.formData?.email,
          phone: context?.formData?.phone,
          postalCode: context?.formData?.postalCode,
          paymentType: context?.formData?.paymentType,
          address: context?.formData?.address,
        }),
      }),
    ])
      .then((data) => data.map((d) => d.json()))
      .then(async ([detailsPromise, reservationPromise]) => {
        const roomDetails = await detailsPromise;
        const { id, description } = await reservationPromise;

        setRoomDetails(roomDetails);
        setReservationDetails(description);
        setId(id);
      })
      .then(() => setIsLoading(false))
      .catch(() => message.error("Wystąpił błąd, spróbuj ponownie później."));
  }, []);

  if (isLoading || !roomDetails) {
    return <Skeleton active />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-8">
      <RoomReservationPreview
        isFinished
        room={roomDetails}
        className="flex-1"
      />
      <div className="flex-1 flex flex-col items-center text-center gap-4">
        <div className="font-bold">Rezerwacja nr {id}</div>
        {reservationDetails && (
          <div
            className="flex flex-col text-center gap-4"
            dangerouslySetInnerHTML={{ __html: reservationDetails }}
          />
        )}
        <div>
          <span>Kwota do zapłaty: </span>
          <span className="font-bold">{roomDetails?.fullPrice}zł</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationComplete;
