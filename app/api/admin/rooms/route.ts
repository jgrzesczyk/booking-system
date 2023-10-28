import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { Amenity } from "@prisma/client";

export async function GET(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  const data = await prisma.room.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      reservations: {
        select: {
          id: true,
        },
      },
    },
  });

  const rooms = data.map((item) => ({
    ...item,
    isUsed: !!item.reservations?.length,
  }));

  return NextResponse.json(rooms, { status: 200 });
}

export async function POST(req: NextRequest) {
  const {
    name,
    area,
    peopleNo,
    bedsDescription,
    description,
    price,
    amenities,
    isActive,
  } = await req.json();

  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  if (
    !name ||
    !(+area > 0) ||
    !(+peopleNo > 0) ||
    !bedsDescription ||
    !description ||
    !(+price > 0) ||
    !amenities?.length
  ) {
    return NextResponse.json(
      { errorMsg: "Nieprawidłowy format danych" },
      { status: 400 },
    );
  }

  const amenitiesResponse = await prisma.amenity.findMany();
  const amenitiesData = (amenities as number[])
    .map((item) => amenitiesResponse.find((a) => a.id === item))
    .filter((amenity): amenity is Amenity => !!amenity);

  const newRoom = await prisma.room.create({
    data: {
      name,
      area: +area,
      peopleNo: +peopleNo,
      bedsDescription,
      description,
      price: +price,
      amenities: {
        connect: amenitiesData,
      },
      isActive: !!isActive,
    },
  });

  return NextResponse.json(newRoom, { status: 201 });
}
