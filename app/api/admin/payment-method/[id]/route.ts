import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import prisma from "@/lib/prisma";

export async function DELETE(
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
    include: {
      reservations: {
        select: { id: true },
      },
    },
  });
  if (!method) {
    return NextResponse.json(null, { status: 404 });
  }

  if ((method.reservations as unknown[]).length) {
    return NextResponse.json(null, { status: 400 });
  }

  await prisma.paymentMethod.delete({
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
  const { name, description } = await req.json();

  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  const method = await prisma.paymentMethod.findFirst({
    where: {
      id: +id,
    },
    include: {
      reservations: {
        select: { id: true },
      },
    },
  });

  if (!method) {
    return NextResponse.json(null, { status: 404 });
  }

  if (!name || !description) {
    return NextResponse.json(null, { status: 400 });
  }

  const data = await prisma.paymentMethod.update({
    where: {
      id: +id,
    },
    data: {
      name,
      description,
    },
  });

  return NextResponse.json(data, { status: 200 });
}
