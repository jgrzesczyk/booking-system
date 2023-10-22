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

  const reservation = await prisma.reservation.findFirst({
    where: {
      id: +id,
    },
  });

  if (!reservation) {
    return NextResponse.json(null, { status: 404 });
  }

  await prisma.reservation.update({
    where: {
      id: +id,
    },
    data: {
      isPaid: !reservation.isPaid,
    },
  });

  return NextResponse.json(null, { status: 200 });
}
