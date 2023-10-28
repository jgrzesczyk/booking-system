import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { Amenity } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  const room = await prisma.room.findFirst({
    where: {
      id: +id,
    },
    include: {
      amenities: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!room) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(room, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  const roomToDelete = await prisma.room.findFirst({
    where: {
      id: +id,
    },
    include: {
      reservations: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!roomToDelete || roomToDelete.reservations?.length) {
    return NextResponse.json(
      { errorMsg: "Pokój nie istnieje lub ma aktywne rezerwacje" },
      { status: 400 },
    );
  }

  await prisma.room.delete({
    where: {
      id: +id,
    },
  });

  return NextResponse.json(null, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
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

  const room = await prisma.room.findFirst({
    where: {
      id: +id,
    },
  });

  if (!room) {
    return NextResponse.json(null, { status: 404 });
  }

  const amenitiesResponse = await prisma.amenity.findMany({});
  const amenitiesData = (amenities as number[])
    .map((item) => amenitiesResponse.find((a) => a.id === item))
    .filter((amenity): amenity is Amenity => !!amenity);

  await prisma.room.update({
    where: {
      id: +id,
    },
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

  return NextResponse.json(null, { status: 200 });
}
