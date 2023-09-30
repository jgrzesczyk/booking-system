"use client";

import Image from "next/image";
import { BiArea } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import clsx from "clsx";
import { Amenity, Room } from "@prisma/client";

const RoomPreview: FC<
  HTMLAttributes<HTMLDivElement> & {
    room: Room & { amenities: Amenity[]; fullPrice?: number };
    isFormItem?: boolean;
    isHighlighted?: boolean;
  }
> = ({ className = "", room, isFormItem, isHighlighted, ...props }) => {
  if (!room) {
    return null;
  }

  return (
    <div
      className={clsx(
        "flex border-opacity-80 border-2 py-5 px-5 rounded-lg gap-5 border-green-800 flex-col",
        isFormItem && "cursor-pointer lg:flex-row w-full sm:w-3/5",
        isHighlighted ? "bg-lime-100" : "bg-white",
        className,
      )}
      {...props}
    >
      <div className={clsx(isFormItem && "lg:w-2/5")}>
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
      <div
        className={`flex flex-col ${
          isFormItem ? "lg:w-3/5" : "sm:flex-row"
        } gap-3`}
      >
        <div className="flex flex-col flex-grow items-start">
          <h3 className="font-bold mb-4 text-xl">{room.name}</h3>
          <p className="mb-1 flex gap-2 items-center">
            <BiArea className="shrink-0 text-green-800 text-opacity-80" />
            <span>
              {room.area} m<sup>2</sup>
            </span>
          </p>
          <p className="mb-1 flex gap-2 items-center">
            <BsFillPersonFill className="shrink-0 text-green-800 text-opacity-80" />
            <span>{room.peopleNo}-osobowy</span>
          </p>
          <p className="flex gap-2 items-center">
            <AiOutlineCheck className="shrink-0 text-green-800 text-opacity-80" />
            <span>
              {room.amenities
                .slice(0, 3)
                .map(({ name }) => name)
                .join(", ")}
            </span>
          </p>
        </div>
        <div
          className={`flex-grow-0 flex-shrink-0 flex ${
            isFormItem ? "flex-row-reverse lg:justify-end" : "flex-col"
          } gap-3`}
        >
          {isFormItem ? (
            <div
              className={clsx(
                "font-bold bg-green-800 bg-opacity-80 w-40 text-white rounded-md py-2 justify-center flex items-center",
              )}
            >
              {`${room.fullPrice} zł`}
            </div>
          ) : (
            <Link
              className="bg-green-800 bg-opacity-80 sm:w-40 text-white rounded-md py-2 text-center"
              href={`/reserve/room-choose?highlight=2`}
            >
              Rezerwuj
            </Link>
          )}
          <Link
            onClick={(e) => e.stopPropagation()}
            className="border-green-800 border-opacity-80 border-2 bg-opacity-80 rounded-md px-4 py-1.5 text-sm text-center"
            href={`/room/${room.id}`}
          >
            Szczegóły pokoju
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomPreview;
