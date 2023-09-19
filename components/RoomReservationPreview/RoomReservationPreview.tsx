"use client";

import Image from "next/image";
import { BsFillCalendarDateFill, BsFillPersonFill } from "react-icons/bs";
import { FC, HTMLAttributes, useContext } from "react";
import clsx from "clsx";
import { AiFillCheckCircle, AiFillDollarCircle } from "react-icons/ai";
import { RoomChooseContext } from "@/app/(other-pages)/reserve/room-choose/_context";

const RoomReservationPreview: FC<
  HTMLAttributes<HTMLDivElement> & { isFinished?: boolean }
> = ({ isFinished, className = "", ...props }) => {
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
        <div>
          <Image
            className="rounded-md"
            src="/apartment-inside.jpg"
            alt="Pokój"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        </div>
        <div className={`flex flex-col gap-3`}>
          <div className="flex flex-col flex-grow items-start">
            <h3 className="font-bold mb-4 text-xl">Pokój Alfa</h3>
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
              <span>2133 zł</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomReservationPreview;
