import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email } = body;
    console.log("Received:", name, email);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(user);
    // if (user) {
    //   return NextResponse.json(
    //     { message: "User is Exist", status: 2001 },
    //     { status: 201 }
    //   );
    // }
    await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return NextResponse.json(
      { message: "User is successfully Created", status: 2003 },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}