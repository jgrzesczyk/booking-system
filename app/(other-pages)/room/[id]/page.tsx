import { CCalendar, PageTitle, RoomGallery } from "@/components";
import { BiArea } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineGateway } from "react-icons/ai";
import Link from "next/link";
import { CCalendarLegend } from "@/components/CCalendar/CCalendar";
import prisma from "@/lib/prisma";
import { Amenity, Reservation, Room } from "@prisma/client";

async function getData(id: number) {
  const room = await prisma.room.findUnique({
    where: {
      id: id,
      isActive: true,
    },
    include: {
      amenities: {
        select: { name: true, id: true },
      },
    },
  });

  const reservationDates = await prisma.reservation.findMany({
    where: {
      roomId: id,
    },
    select: {
      dateFrom: true,
      dateTo: true,
    },
  });

  return { room, reservationDates };
}

const RoomPage = async ({ params }: { params: { id: number } }) => {
  const data = await getData(+params.id);
  const room: (Room & { amenities: Amenity[] }) | null = data.room;
  const reservations: Pick<Reservation, "dateTo" | "dateFrom">[] =
    data.reservationDates;

  if (!room) {
    return null;
  }

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
              {room.area} m<sup>2</sup>
            </span>
          </p>
          <p className="mb-1 flex gap-2 items-center">
            <BsFillPersonFill className="shrink-0 text-green-800 text-opacity-80" />
            <span>{room.peopleNo}-osobowy</span>
          </p>
          <p className="mb-1 flex gap-2 items-center">
            <AiOutlineGateway className="shrink-0 text-green-800 text-opacity-80" />
            <span>{room.bedsDescription}</span>
          </p>
          <p className="mt-5">{room.description}</p>
          <div className="mt-5 mb-2">Udogodnienia w pokoju:</div>
          <div className="flex flex-wrap gap-y-1 text-sm">
            {room.amenities
              .map(({ name }) => name)
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
            href={`/reserve/room-choose?highlight=${room.id}`}
          >
            Rezerwuj
          </Link>
        </div>
        <div className="relative col-span-2 bg-gray-100 flex flex-col items-center rounded-md pt-3">
          <CCalendar
            reservations={reservations}
            className="w-80 !bg-gray-100"
          />
          <CCalendarLegend className="mx-auto mb-4 md:mb-0 md:absolute md:bottom-4 md:right-4" />
        </div>
      </main>
    </>
  );
};

export default RoomPage;
