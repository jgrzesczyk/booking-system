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

  const prices = await prisma.priceChange.findMany({
    select: {
      id: true,
      change: true,
      dateFrom: true,
      dateTo: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(prices, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { dateTo, dateFrom, priceChange } = await req.json();
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  if (
    isNaN(+priceChange) ||
    !dayjs(dateTo).isValid() ||
    !dayjs(dateFrom).isValid() ||
    dayjs(dateTo).isBefore(dayjs(dateFrom))
  ) {
    return NextResponse.json(
      { errorMsg: "Nieprawidłowy format danych" },
      { status: 400 },
    );
  }

  try {
    const price = await prisma.priceChange.create({
      data: {
        change: +priceChange,
        dateTo: dayjs(dateTo).utcOffset(0).toDate(),
        dateFrom: dayjs(dateFrom).utcOffset(0).toDate(),
      },
    });
    return NextResponse.json(price, { status: 201 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
