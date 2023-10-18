import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  const amenities = await prisma.amenity.findMany({
    select: {
      id: true,
      name: true,
      rooms: true,
    },
  });

  const response = amenities.map(({ id, name, rooms }) => ({
    id,
    name,
    isUsed: !!rooms?.length,
  }));

  return NextResponse.json(response, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  if (!name?.length) {
    return NextResponse.json(null, { status: 400 });
  }

  try {
    const amenity = await prisma.amenity.create({
      data: { name },
    });
    return NextResponse.json(amenity, { status: 201 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
