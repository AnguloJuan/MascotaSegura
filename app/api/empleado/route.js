import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { GetUser } from "@/app/lib/user";

const prisma = getPrisma();
const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(request) {
    const { firstName, lastName, email, telefono, NIP, tipoEmpleado, password } = await request.json();
    const numTelefono = parseInt(telefono);

    try {
        // Check if the email is already registered
        const existingUser = await prisma.empleado.findUnique({ where: { correo: email } });

        if (existingUser) {
            return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
        }

        if (!SECRET_KEY) {
            return NextResponse.json({ message: 'Llave secreta no encontrada' }, { status: 500 })
        }

        // Hash the password
        //const hashedPassword = await bcrypt.hash(password, 10);

        let user;
        const date = new Date().toISOString();
        const idRefugio = GetUser().idRefugio;

        // Create the user in the database
        try {
            user = await prisma.empleado.create({
                data: {
                    idRefugio: parseInt(idRefugio),
                    nombre: firstName,
                    apellido: lastName,
                    correo: email,
                    telefono: numTelefono,
                    contrasena: password,
                    NIP: NIP,
                    tipoUsuario: { connect: { id: parseInt(tipoEmpleado) } },
                    fechaRegistro: date,
                },
            });
        } catch (e) {
            console.log(e);
        }
        BigInt.prototype.toJSON = function () { return this.toString() }

        return NextResponse.json({ message: 'User registered', user }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

export async function GET(req) {
    try {
        let empleados;
        const search = req.nextUrl.searchParams.get('search');
        const { id, nombre, tipoEmpleado, userId } = JSON.parse(search);

        try {
            empleados = await prisma.empleado.findMany({
                where: {
                    id: id ? { equals: parseInt(id) } : undefined,
                    nombre: nombre ? { contains: nombre } : undefined,
                    idTipoUsuario: tipoEmpleado ? { equals: parseInt(tipoEmpleado) } : undefined,
                    NOT: {
                        id: userId,
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }

        BigInt.prototype.toJSON = function () { return this.toString() }
        return NextResponse.json({ empleados }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ error: 'Ocurrio un fallo al realizar la busqueda' }, { staus: 500 });
    }
}

export async function PUT(req) {
    try {

        const formData = await req.formData();
        const userInit = formData.get("userInit");
        const user = formData.get("user");
        const userType = formData.get("userType");
        const userInitParsed = JSON.parse(userInit.substring(userInit.indexOf('{'), userInit.lastIndexOf('}') + 1));
        const userParsed = JSON.parse(user.substring(user.indexOf('{'), user.lastIndexOf('}') + 1));

        const { correo, telefono } = userParsed;
        let nombre, apellido, NIP, fechaRegistro, tipoEmpleado;
        let date;
        let image;
        if (userType == 3) {
            ({ nombre, apellido, NIP, fechaRegistro, tipoEmpleado } = userParsed);
            date = new Date(Date.parse(fechaRegistro)).toISOString();
            image = formData.get("image");
        }

        //validate correo
        if (correo !== userInitParsed.correo) {
            const existingUser = await prisma.empleado.findUnique({ where: { correo: correo } });
            if (existingUser) {
                return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
            }
        }

        try {
            let empleado;
            userType == 2 ? (
                empleado = await prisma.empleado.update({
                    where: {
                        id: parseInt(userInitParsed.id),
                    },
                    data: {
                        correo: correo !== userInitParsed.correo ? correo : undefined,
                        telefono: telefono !== userInitParsed.telefono ? parseInt(telefono) : undefined,
                    }
                })
            ) : userType == 3 && (
                empleado = await prisma.empleado.update({
                    where: {
                        id: parseInt(userInitParsed.id),
                    },
                    data: {
                        nombre: nombre !== userInitParsed.nombre ? nombre : undefined,
                        apellido: apellido !== userInitParsed.apellido ? apellido : undefined,
                        correo: correo !== userInitParsed.correo ? correo : undefined,
                        telefono: telefono !== userInitParsed.telefono ? parseInt(telefono) : undefined,
                        NIP: NIP !== userInitParsed.NIP ? NIP : undefined,
                        fechaRegistro: fechaRegistro !== userInitParsed.fechaRegistro ? date : undefined,
                        idTipoUsuario: tipoEmpleado !== userInitParsed.idTipoUsuario ? parseInt(tipoEmpleado) : undefined,
                        imagen: (image != "null" && image !== userInitParsed.imagen) ? image : undefined,
                    }
                })
            );
            //replacing user cookie
            BigInt.prototype.toJSON = function () { return this.toString() }
            const token = jwt.sign(empleado, SECRET_KEY);
            return NextResponse.json({ message: 'User modified', empleado, token }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: 'Modification failed' }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Fields Failed' }, { status: 500 });
    }
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get('id');

    try {

        //delete user
        await prisma.empleado.delete({
            where: {
                id: parseInt(id)
            }
        });

        return NextResponse.json({ message: "Empledo eliminada" }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ error: 'Fallo al eliminar el empleado' }, { staus: 500 });
    }
}