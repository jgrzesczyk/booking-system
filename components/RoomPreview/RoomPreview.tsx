import Image from "next/image";
import { BiArea } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";

const RoomPreview: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex flex-col border-green-800 border-2 py-5 px-5 rounded-lg bg-white gap-5 ${className}`}
      {...props}
    >
      <div>
        <Image
          className="rounded-md"
          src="/apartment-main.jpg"
          alt="Pokój"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
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
        <div className="flex-grow-0 flex-shrink-0 flex flex-col gap-3">
          <Link
            className="bg-green-800 bg-opacity-80 px-4 text-white rounded-md py-2 text-center"
            href="/reserve"
          >
            Rezerwuj
          </Link>
          <Link
            className="border-green-800 border-2 bg-opacity-80 rounded-md px-4  py-1.5 text-sm text-center"
            href="/"
          >
            Szczegóły pokoju
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomPreview;
