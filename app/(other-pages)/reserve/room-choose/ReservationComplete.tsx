import { FC, useContext, useEffect, useState } from "react";
import { RoomReservationPreview } from "@/components";
import { RoomChooseContext } from "@/app/(other-pages)/reserve/room-choose/_context";
import { Spin } from "antd";

const ReservationComplete: FC = () => {
  const context = useContext(RoomChooseContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(context?.roomId);
    console.log(context?.barData);
    console.log(context?.formData);

    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return <Spin spinning className="my-10 flex justify-center" />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-8">
      <RoomReservationPreview isFinished className="flex-1" />
      <div className="flex-1 flex flex-col items-center text-center gap-4">
        <div>Wybrałeś metodę płatności: Przelew</div>
        <div className="flex flex-col">
          <span>Prosimy o przelew na numer konta</span>
          <span className="font-bold">77 1020 2267 0000 4502 0208 2824</span>
        </div>
        <div>
          <span>W tytule przelewu dopisać: </span>
          <span className="font-bold">Rezerwacja nr 123</span>
        </div>
        <div>
          <span>Kwota do zapłaty: </span>
          <span className="font-bold">2133zł</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationComplete;
