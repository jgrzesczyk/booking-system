import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ReservationRequest } from "@/app/(other-pages)/reserve/room-choose/types";
import dayjs from "dayjs";
import { getReservationPrices } from "@/app/api/reserve/getReservationPrices";

export async function POST(req: NextRequest) {
  const requestData: ReservationRequest | null = await req.json();

  if (!requestData) {
    return NextResponse.json(null, { status: 400 });
  }

  const {
    arrival,
    departure,
    people,
    roomId,
    name,
    city,
    email,
    phone,
    postalCode,
    paymentType,
    address,
  } = requestData;

  if (!dayjs(arrival).isBefore(departure)) {
    return NextResponse.json(null, { status: 400 });
  }

  const { reservationDays, reservationDaysToPrice } =
    await getReservationPrices(arrival, departure);

  const room = await prisma.room.findFirst({
    where: {
      isActive: true,
      id: roomId,
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
  });

  if (!room) {
    return NextResponse.json(null, { status: 400 });
  }

  const paymentMethod = await prisma.paymentMethod.findFirst({
    where: {
      id: paymentType,
    },
  });

  if (!paymentMethod) {
    return NextResponse.json(null, { status: 400 });
  }

  const fullPrice = reservationDaysToPrice.reduce(
    (prev, dayPrice) => prev + Math.floor((room.price * dayPrice) / 100),
    0,
  );

  await prisma.reservation.create({
    data: {
      room: { connect: { id: roomId } },
      paymentMethod: { connect: { id: paymentType } },
      isPaid: false,
      dateFrom: dayjs(arrival).toDate(),
      dateTo: dayjs(departure).toDate(),
      city,
      address,
      postalCode,
      name,
      email,
      peopleNo: people,
      phone,
      price: fullPrice,
    },
  });

  return NextResponse.json(paymentMethod.description, { status: 200 });
}
