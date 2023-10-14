import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import { AdminType } from ".prisma/client";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params: { login = "" } }: { params: { login: string } },
) {
  const token: JWT | null = await getToken({ req });

  if ((token as any)?.user?.role !== AdminType.SuperUser) {
    return NextResponse.json(null, { status: 403 });
  }

  const user = await prisma.adminUser.delete({
    where: {
      login,
    },
  });

  if (!user) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(null, { status: 200 });
}
