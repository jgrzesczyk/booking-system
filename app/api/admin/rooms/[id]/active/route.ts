import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import prisma from "@/lib/prisma";

export async function PUT(
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
  });

  if (!room) {
    return NextResponse.json(null, { status: 404 });
  }

  await prisma.room.update({
    where: {
      id: +id,
    },
    data: {
      isActive: !room.isActive,
    },
  });

  return NextResponse.json(null, { status: 200 });
}
