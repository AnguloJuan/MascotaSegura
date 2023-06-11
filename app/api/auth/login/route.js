//import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY

export async function POST(request) {
    if (request.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    const { email, password } = await request.json();

    try {

        const user = await prisma.adoptante.findUnique({ where: { correo: email } });

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 409 });
        }

        // Compare passwords
        //console.log(await bcrypt.hash(password, 10));
        //console.log(user.contrasena);
        //const isPasswordValid = await bcrypt.compare(password, user.contrasena);
        const isPasswordValid = password == user.contrasena ? 1 : 0;
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, SECRET_KEY);

        // Return user data along with the token
        BigInt.prototype.toJSON = function () { return this.toString() }
        return NextResponse.json({ message: 'Logged in', token, user }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
