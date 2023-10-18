import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  const methods = await prisma.paymentMethod.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      isActive: true,
      reservations: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const response = methods.map((method) => ({
    ...method,
    reservations: undefined,
    isUsed: !!method.reservations.length,
  }));

  return NextResponse.json(response, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { name, description, isActive } = await req.json();
  const token: JWT | null = await getToken({ req });

  if (!token) {
    return NextResponse.json(null, { status: 403 });
  }

  if (!name || !description) {
    return NextResponse.json(
      { errorMsg: "Nieprawidłowy format danych" },
      { status: 400 },
    );
  }

  try {
    const price = await prisma.paymentMethod.create({
      data: {
        name,
        description,
        isActive,
      },
    });
    return NextResponse.json(price, { status: 201 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
