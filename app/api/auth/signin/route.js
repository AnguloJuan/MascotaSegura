//import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
    const { firstName, lastName, email, telefono, municipio, password } = await request.json();
    const numTelefono = parseInt(telefono);

    try {
        // Check if the email is already registered
        const existingUser = await prisma.adoptante.findUnique({ where: { correo: email } });

        if (existingUser) {
            return NextResponse.json({ message: 'Email already registered' }, {status: 409});
        }

        // Hash the password
        //const hashedPassword = await bcrypt.hash(password, 10);

        let user;
        // Create the user in the database
        try {
            user = await prisma.adoptante.create({
                data: {
                    municipio: { connect: { id: 1 } },
                    nombre: firstName,
                    apellido: lastName,
                    correo: email,
                    telefono: numTelefono,
                    contrasena: password,
                    tipoUsuario: { connect: { id: 1 } },
                },
            });
        } catch (e) {
            console.log(e);
        }

        const token = jwt.sign(user, SECRET_KEY);

        return NextResponse.json({ message: 'User registered', token, user}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'Something went wrong'},{status: 500})
    }
}