import { CCalendar, PageTitle, RoomGallery } from "@/components";
import { BiArea } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineGateway } from "react-icons/ai";
import Link from "next/link";
import { CCalendarLegend } from "@/components/CCalendar/CCalendar";

const Room = () => {
  return (
    <>
      <PageTitle title="Pokój Alfa" />
      <main className="w-full max-w-screen-lg mx-auto flex flex-col gap-8 md:grid md:grid-cols-2 my-10 md:gap-y-10 md:gap-10 px-5 xl:px-0">
        <div>
          <RoomGallery />
        </div>
        <div>
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
          <p className="mb-1 flex gap-2 items-center">
            <AiOutlineGateway className="shrink-0 text-green-800 text-opacity-80" />
            <span>2 łóżka pojedyncze</span>
          </p>
          <p className="mt-5">
            Featuring free toiletries, this twin room includes a private
            bathroom with a walk-in shower and a hairdryer. The twin room
            features a tea and coffee maker, a wardrobe, a carpeted floor,
            heating, as well as a flat-screen TV. The unit has 2 beds.
          </p>
          <div className="mt-5 mb-2">Udogodnienia w pokoju:</div>
          <div className="flex flex-wrap gap-y-1 text-sm">
            {[
              "biurko",
              "telewizor",
              "przyjazny alergikom",
              "pościel",
              "dojazd windą na wyższe piętra",
              "wykładzina podłogowa",
              "telewizor z płaskim ekranem",
              "czajnik elektryczny",
              "ogrzewanie",
              "ręczniki",
              "szafa lub garderoba",
              "gniazdko koło łóżka",
              "zestaw do parzenia kawy i herbaty",
              "wieszak na ubrania",
            ]
              .sort((a, b) => a.localeCompare(b))
              .map((item) => (
                <p
                  key={item}
                  className="basis-full md:basis-1/2 flex gap-2 items-center pr-3"
                >
                  <AiOutlineCheck className="shrink-0 text-green-800 text-opacity-80" />
                  <span>{item}</span>
                </p>
              ))}
          </div>
          <Link
            className="bg-green-800 bg-opacity-80 text-white rounded-md py-3 text-center mt-5 block"
            href={`/reserve/room-choose?highlight=2`}
          >
            Rezerwuj
          </Link>
        </div>
        <div className="relative col-span-2 bg-gray-100 flex flex-col items-center rounded-md pt-3">
          <CCalendar className="w-80 !bg-gray-100" />
          <CCalendarLegend className="mx-auto mb-4 md:mb-0 md:absolute md:bottom-4 md:right-4" />
        </div>
      </main>
    </>
  );
};

export default Room;
