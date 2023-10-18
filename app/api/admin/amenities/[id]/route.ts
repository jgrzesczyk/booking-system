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

  const amenity = await prisma.amenity.delete({
    where: {
      id: +id,
    },
  });

  if (!amenity) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(null, { status: 200 });
}
