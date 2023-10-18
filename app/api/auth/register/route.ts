import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/app/api/auth/utils";

export async function POST(req: NextRequest) {
  const { login, password } = await req.json();

  if (password?.length < 8) {
    return NextResponse.json(null, { status: 400 });
  }
  try {
    const user = await prisma.adminUser.create({
      data: { login, password: hashPassword(password) },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
