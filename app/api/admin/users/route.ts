import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken, JWT } from "next-auth/jwt";
import { AdminType } from ".prisma/client";

export async function GET(req: NextRequest) {
  const token: JWT | null = await getToken({ req });

  if ((token as any)?.user?.role !== AdminType.SuperUser) {
    return NextResponse.json(null, { status: 403 });
  }

  const users = await prisma.adminUser.findMany({
    select: {
      login: true,
      role: true,
    },
    orderBy: [{ role: "asc" }, { login: "asc" }],
  });

  return NextResponse.json(users, { status: 200 });
}
