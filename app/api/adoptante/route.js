import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const prisma = getPrisma();
const SECRET_KEY = process.env.SECRET_KEY;

export async function GET(req) {
    try {
        let adoptantes;
        const search = req.nextUrl.searchParams.get('search');
        const { id, nombre, correo, telefono, edad, estado, municipio } = JSON.parse(search);
        try {
            adoptantes = await prisma.adoptante.findMany({
                include: {
                    municipio: true,
                },
                where: {
                    nombre: nombre ? { contains: nombre } : undefined,
                    correo: correo ? { contains: correo } : undefined,
                    id: id ? { equals: parseInt(id) } : undefined,
                    telefono: telefono ? { equals: parseInt(telefono) } : undefined,
                    // Comprobamos si se proporciona el municipio o el estado para filtrar en consecuencia
                    AND: [
                        municipio
                            ? { municipio: { id: (parseInt(municipio)) } }
                            : estado
                                ? { municipio: { estado: { id: parseInt(estado) } } }
                                : undefined,
                    ],
                },
            });
        } catch (error) {
            console.log(error);
        }
        BigInt.prototype.toJSON = function () { return this.toString() }
        return NextResponse.json({ adoptantes }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ error: 'Ocurrio un fallo al realizar la busqueda' }, { staus: 500 });
    }
}

export async function PUT(req) {
    try {
        //obtaining data
        const formData = await req.formData();
        const userType = formData.get("userType");
        const user = formData.get("user");
        const userInit = formData.get("userInit");
        const image = formData.get("image");

        const userParsed = JSON.parse(user.substring(user.indexOf('{'), user.lastIndexOf('}') + 1));
        const userInitParsed = JSON.parse(userInit.substring(userInit.indexOf('{'), userInit.lastIndexOf('}') + 1));

        const { correo, telefono, municipio } = userParsed;
        let nombre, apellido;
        userType == 3 && ({ nombre, apellido } = userParsed);

        //check existing correo
        if (correo !== userInitParsed.correo) {
            const existingUser = await prisma.adoptante.findUnique({ where: { correo: correo } });
            if (existingUser) {
                return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
            }
        }

        let userToken;
        try {
            if (userType == 1) {
                userToken = await prisma.adoptante.update({
                    where: {
                        id: parseInt(userInitParsed.id),
                    },
                    data: {
                        correo: correo !== userInitParsed.correo ? correo : undefined,
                        telefono: telefono !== userInitParsed.telefono ? parseInt(telefono) : undefined,
                        idMunicipio: municipio !== userInitParsed.idMunicipio ? parseInt(municipio) : undefined,
                        imagen: (image != "null" && image !== userInitParsed.imagen) ? image : undefined,
                    }
                });
            } else if (userType == 3) {
                userToken = await prisma.adoptante.update({
                    where: {
                        id: parseInt(userInitParsed.id),
                    },
                    data: {
                        nombre: nombre !== userInitParsed.nombre ? nombre : undefined,
                        apellido: apellido !== userInitParsed.apellido ? apellido : undefined,
                        correo: correo !== userInitParsed.correo ? correo : undefined,
                        telefono: telefono !== userInitParsed.telefono ? parseInt(telefono) : undefined,
                        idMunicipio: municipio !== userInitParsed.idMunicipio ? parseInt(municipio) : undefined,
                        imagen: (image != "null" && image !== userInitParsed.imagen) ? image : undefined,
                    }
                });
            }

            //replacing user cookie
            BigInt.prototype.toJSON = function () { return this.toString() }
            let token;
            userType == 1 && (token = jwt.sign(userToken, SECRET_KEY));

            return NextResponse.json({ message: 'User modified', token }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: 'Modification failed' }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(req) {
    const params = req.nextUrl.searchParams.get('params');
    const { id, userType } = JSON.parse(params);
    try {
        const adopcion = await prisma.adoptante.findUnique({
            include: {
                adopcion: true,
            },
            where: {
                id: parseInt(id)
            }
        });
        if (adopcion.adopcion.length !== 0) {
            return NextResponse.json({ message: 'Adopcion encontrada' }, { status: 409 });
        }

        //delete user
        await prisma.adoptante.delete({
            where: {
                id: parseInt(id)
            }
        });

        return NextResponse.json({ message: "Adoptante eliminada" }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ error: 'Fallo al eliminar el adoptante' }, { staus: 500 });
    }
}