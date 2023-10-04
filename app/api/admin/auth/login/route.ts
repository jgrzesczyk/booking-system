import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/app/api/admin/auth/utils";
export async function POST(req: NextRequest) {
  const { login, password } = await req.json();

  if (!login || !password) {
    return NextResponse.json(null, { status: 400 });
  }
  try {
    const user = await prisma.adminUser.findUnique({
      where: { login },
      select: {
        login: true,
        password: true,
      },
    });
    if (user && user.password === hashPassword(password)) {
      return NextResponse.json({ login: user.login }, { status: 200 });
    } else {
      return NextResponse.json(null, { status: 401 });
    }
  } catch (e) {
    return NextResponse.json(null, { status: 400 });
  }
}
