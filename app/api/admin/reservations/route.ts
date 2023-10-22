import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export async function GET(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  const reservations = await prisma.reservation.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(reservations, { status: 200 });
}

export async function POST(req: NextRequest) {
  const {
    roomId,
    dateFrom,
    dateTo,
    peopleNo,
    paymentMethodId,
    name,
    phone,
    email,
    address,
    postalCode,
    city,
    price,
    isPaid,
  } = await req.json();

  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  const room = prisma.room.findFirst({ where: { id: roomId } });
  const paymentMethod = prisma.paymentMethod.findFirst({
    where: { id: paymentMethodId },
  });

  if (!room || !paymentMethod) {
    return NextResponse.json(
      { errorMsg: "Nieprawidłowy pokój lub metoda płatności" },
      { status: 400 },
    );
  }

  if (
    !(+peopleNo > 0) ||
    !(+price > 0) ||
    !dayjs(dateTo).isValid() ||
    !dayjs(dateFrom).isValid() ||
    dayjs(dateTo).isBefore(dayjs(dateFrom)) ||
    !name ||
    !phone ||
    !email ||
    !address ||
    !postalCode ||
    !city
  ) {
    return NextResponse.json(
      { errorMsg: "Nieprawidłowy format danych" },
      { status: 400 },
    );
  }

  try {
    const reservation = await prisma.reservation.create({
      data: {
        roomId,
        peopleNo: +peopleNo,
        paymentMethodId,
        name,
        phone,
        email,
        address,
        postalCode,
        city,
        price: +price,
        isPaid: !!isPaid,
        dateTo: dayjs(dateTo).utcOffset(0).toDate(),
        dateFrom: dayjs(dateFrom).utcOffset(0).toDate(),
      },
    });
    return NextResponse.json(reservation, { status: 201 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
