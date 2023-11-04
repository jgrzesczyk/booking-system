"use client";

import { BsFillCalendarDateFill, BsFillPersonFill } from "react-icons/bs";
import { FC, HTMLAttributes, useContext } from "react";
import clsx from "clsx";
import { AiFillCheckCircle, AiFillDollarCircle } from "react-icons/ai";
import { RoomChooseContext } from "@/app/(other-pages)/reserve/room-choose/_context";
import { Photo, Room } from "@prisma/client";
import { CldImage } from "next-cloudinary";

const RoomReservationPreview: FC<
  HTMLAttributes<HTMLDivElement> & {
    room: Room & { photos: Photo[]; fullPrice: number };
    isFinished?: boolean;
  }
> = ({ room, isFinished, className = "", ...props }) => {
  const context = useContext(RoomChooseContext);

  return (
    <div
      className={clsx(
        "border-opacity-80 border-2 border-green-800 rounded-lg bg-white max-w-lg mx-auto",
        className,
      )}
      {...props}
    >
      {isFinished && (
        <div className="bg-green-800 bg-opacity-80 py-4 flex items-center justify-center text-white text-3xl gap-2">
          <span className="text-xl font-bold">Rezerwacja potwierdzona</span>
          <AiFillCheckCircle />
        </div>
      )}
      <div className="flex flex-col py-5 px-5 gap-5">
        <div className={clsx("h-48 relative")}>
          <CldImage
            fill
            src={room.photos[0].name}
            alt={room.name}
            strictTransformations
            transformations={["photogallery"]}
          />
        </div>
        <div className={`flex flex-col gap-3`}>
          <div className="flex flex-col flex-grow items-start">
            <h3 className="font-bold mb-4 text-xl">{room.name}</h3>
            <p className="mb-1 flex gap-2 items-center">
              <BsFillPersonFill className="shrink-0 text-green-800 text-opacity-80" />
              <span>Osób: {context?.barData?.people}</span>
            </p>
            <p className="flex gap-2 items-center">
              <BsFillCalendarDateFill className="shrink-0 text-green-800 text-opacity-80" />
              <span>
                {`${context?.barData?.arrival.format(
                  "YYYY-MM-DD",
                )} do ${context?.barData?.departure.format("YYYY-MM-DD")}`}
              </span>
            </p>
            <p className="flex gap-2 items-center text-lg mt-4 font-bold">
              <AiFillDollarCircle className="shrink-0 text-green-800 text-opacity-80" />
              <span>{room.fullPrice} zł</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomReservationPreview;
