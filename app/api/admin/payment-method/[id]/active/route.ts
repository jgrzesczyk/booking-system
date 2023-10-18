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

  const method = await prisma.paymentMethod.findFirst({
    where: {
      id: +id,
    },
  });

  if (!method) {
    return NextResponse.json(null, { status: 404 });
  }

  await prisma.paymentMethod.update({
    where: {
      id: +id,
    },
    data: {
      isActive: !method.isActive,
    },
  });

  return NextResponse.json(null, { status: 200 });
}
