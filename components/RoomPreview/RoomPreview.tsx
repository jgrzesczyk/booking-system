"use client";

import Image from "next/image";
import { BiArea } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import clsx from "clsx";

const RoomPreview: FC<
  HTMLAttributes<HTMLDivElement> & {
    isFormItem?: boolean;
    isHighlighted?: boolean;
    isDisabled?: boolean;
  }
> = ({ className = "", isFormItem, isHighlighted, isDisabled, ...props }) => {
  return (
    <div
      className={clsx(
        "flex border-opacity-80 border-2 py-5 px-5 rounded-lg gap-5 border-green-800 flex-col",
        isFormItem && "cursor-pointer lg:flex-row",
        isHighlighted ? "bg-lime-100" : "bg-white",
        isDisabled && "bg-gray-200 cursor-default",
        className,
      )}
      {...props}
    >
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
      <div className={`flex flex-col ${isFormItem ? "" : "sm:flex-row"} gap-3`}>
        <div className="flex flex-col flex-grow items-start">
          <h3 className="font-bold mb-4 text-xl">Pokój Alfa</h3>
          <p className="mb-1 flex gap-2 items-center">
            <BiArea className="shrink-0 text-green-800 text-opacity-80" />
            <span>
              20 m<sup>2</sup>
            </span>
          </p>
          <p className="mb-1 flex gap-2 items-center">
            <BsFillPersonFill className="shrink-0 text-green-800 text-opacity-80" />
            <span>2-osobowy</span>
          </p>
          <p className="flex gap-2 items-center">
            <AiOutlineCheck className="shrink-0 text-green-800 text-opacity-80" />
            <span>Wi-fi, TV, mikrofalówka</span>
          </p>
        </div>
        <div
          className={`flex-grow-0 flex-shrink-0 flex ${
            isFormItem ? "flex-row-reverse" : "flex-col"
          } gap-3`}
        >
          {isFormItem ? (
            <div
              className={clsx(
                "font-bold bg-green-800 bg-opacity-80 w-40 text-white rounded-md py-2 justify-center flex items-center",
                isDisabled && "bg-gray-600 cursor-not-allowed",
              )}
            >
              {isDisabled ? "Niedostępny" : "2322 zł"}
            </div>
          ) : (
            <Link
              className="bg-green-800 bg-opacity-80 w-40 text-white rounded-md py-2 text-center"
              href={`/reserve/room-choose?highlight=2`}
            >
              Rezerwuj
            </Link>
          )}
          <Link
            onClick={(e) => e.stopPropagation()}
            className="border-green-800 border-opacity-80 border-2 bg-opacity-80 rounded-md px-4 py-1.5 text-sm text-center"
            href="/room/2"
          >
            Szczegóły pokoju
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomPreview;
