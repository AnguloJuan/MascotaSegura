//import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { getPrisma } from '@/app/lib/prisma';

const prisma = getPrisma();
const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(request) {
    const { firstName, lastName, email, telefono, municipios, password } = await request.json();
    const numTelefono = parseInt(telefono);

    try {
        // Check if the email is already registered
        const existingUser = await prisma.adoptante.findUnique({ where: { correo: email } });

        if (existingUser) {
            return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
        }

        if (!SECRET_KEY) {
            return NextResponse.json({ message: 'Llave secreta no encontrada' }, { status: 500 })
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
                    fechaRegistro: new Date().toISOString(),
                },
            });
        } catch (e) {
            console.log(e);
        }
        BigInt.prototype.toJSON = function () { return this.toString() }
        const token = jwt.sign(user, SECRET_KEY);
        if (!token || !user) {
            console.log(user);
            console.log(token);
            try {
                await prisma.adoptante.delete({
                    where: {
                        id: user.id
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }

        return NextResponse.json({ message: 'User registered', token, user }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}