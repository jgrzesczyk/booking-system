import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ReservationBarData } from "@/app/(other-pages)/reserve/room-choose/types";
import dayjs from "dayjs";
import { getReservationPrices } from "@/app/api/reserve/getReservationPrices";

export async function POST(req: NextRequest) {
  const requestData: ReservationBarData | null = await req.json();

  if (!requestData) {
    return NextResponse.json(null, { status: 400 });
  }

  const { arrival, departure, people } = requestData;

  if (!dayjs(arrival).isBefore(departure)) {
    return NextResponse.json(null, { status: 400 });
  }

  const { reservationDays, reservationDaysToPrice } =
    await getReservationPrices(arrival, departure);

  const rooms = await prisma.room.findMany({
    where: {
      isActive: true,
      peopleNo: {
        gte: people,
      },
      reservations: {
        none: {
          OR: [
            {
              dateFrom: {
                gte: reservationDays[0].toDate(),
                lte: reservationDays[reservationDays.length - 1].toDate(),
              },
            },
            {
              dateTo: {
                gt: reservationDays[0].toDate(),
                lte: reservationDays[reservationDays.length - 1].toDate(),
              },
            },
            {
              dateTo: {
                gt: reservationDays[0].toDate(),
              },
              dateFrom: {
                lte: reservationDays[0].toDate(),
              },
            },
          ],
        },
      },
    },
    include: {
      amenities: {
        select: { name: true, id: true },
      },
      photos: {
        select: { name: true, roomId: true },
      },
    },
  });

  const roomsWithPrice = rooms.map((room) => ({
    ...room,
    fullPrice: reservationDaysToPrice.reduce(
      (prev, dayPrice) => prev + Math.floor((room.price * dayPrice) / 100),
      0,
    ),
  }));

  return NextResponse.json(roomsWithPrice, { status: 200 });
}
