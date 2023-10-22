import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  const reservation = await prisma.reservation.delete({
    where: {
      id: +id,
    },
  });

  if (!reservation) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(null, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
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
    const reservation = await prisma.reservation.update({
      where: {
        id: +id,
      },
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
    return NextResponse.json(reservation, { status: 200 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
