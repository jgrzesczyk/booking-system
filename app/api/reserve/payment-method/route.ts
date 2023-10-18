import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const paymentMethods = await prisma.paymentMethod.findMany({
    orderBy: {
      id: "asc",
    },

    where: {
      isActive: true,
    },
  });
  return NextResponse.json(paymentMethods, { status: 200 });
}
