import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import dayjs, { Dayjs } from "dayjs";
import { getReservationPrices } from "@/app/api/reserve/getReservationPrices";

export async function POST(req: NextRequest) {
  const requestData: { arrival: Dayjs; departure: Dayjs; roomId: number } =
    await req.json();

  if (!requestData) {
    return NextResponse.json(null, { status: 400 });
  }

  const { arrival, departure, roomId } = requestData;

  if (!dayjs(arrival).isBefore(departure)) {
    return NextResponse.json(null, { status: 400 });
  }

  const { reservationDays, reservationDaysToPrice } =
    await getReservationPrices(arrival, departure);

  const room = await prisma.room.findFirst({
    where: {
      isActive: true,
      id: roomId,
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
      photos: {
        select: {
          roomId: true,
          name: true,
        },
      },
    },
  });

  if (!room) {
    return NextResponse.json(null, { status: 400 });
  }

  const roomWithPrice = {
    ...room,
    fullPrice: reservationDaysToPrice.reduce(
      (prev, dayPrice) => prev + Math.floor((room.price * dayPrice) / 100),
      0,
    ),
  };

  return NextResponse.json(roomWithPrice, { status: 200 });
}
