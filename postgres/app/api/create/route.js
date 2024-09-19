import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, comment, feedback, city, postcode, phone, facebook } = body;
    console.log("Received:", name, email, comment, feedback, city, postcode, phone, facebook);

    // Check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "User already exists", status: 2001 },
        { status: 409 } // Use status code 409 for conflict
      );
    }

    // Create a new user
    await prisma.user.create({
      data: {
        name,
        email,
        comment,
        feedback,
        city,
        postcode,
        phone,
        facebook,
      },
    });

    return NextResponse.json(
      { message: "User is successfully created", status: 2003 },
      { status: 201 } // Use status code 201 for created
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
