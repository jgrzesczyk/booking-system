import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  const rooms = await prisma.room.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(rooms, { status: 200 });
}
