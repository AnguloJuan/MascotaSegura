//import bcrypt from 'bcryptjs';
import { getPrisma } from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = getPrisma();
const SECRET_KEY = process.env.SECRET_KEY;

async function setCookie(user) {
  "use server";
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  const token = jwt.sign(user, SECRET_KEY);
  cookies().set("user", token);
}

export async function POST(request) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  const { email, password } = await request.json();

  try {
    //find either adoptante or empleado
    let user = await prisma.adoptante.findUnique({ where: { correo: email } });
    if (!user) {
      user = await prisma.empleado.findUnique({ where: { correo: email } });
      if (!user) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 409 }
        );
      }
    }

    // Compare passwords
    //console.log(await bcrypt.hash(password, 10));

    //const isPasswordValid = await bcrypt.compare(password, user.contrasena);
    const isPasswordValid = password == user.contrasena ? 1 : 0;
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    setCookie(user);

    // Return user data along with the token
    return NextResponse.json({ message: "Logged in", user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
