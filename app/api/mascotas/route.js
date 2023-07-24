import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const prisma = getPrisma();

export async function GET(req) {
    try {
        let mascotas;
        const search = req.nextUrl.searchParams.get('search');
        const { id, nombre, especie, raza, edad, sexo, userType, adoptado } = JSON.parse(search);
        try {
            mascotas = await prisma.mascota.findMany({
                include: {
                    sexo: true,
                },
                where: {
                    id: id ? { equals: parseInt(id) } : undefined,
                    nombre: nombre ? { contains: nombre } : undefined,
                    idEspecie: especie ? { equals: parseInt(especie) } : undefined,
                    raza: raza ? { equals: raza } : undefined,
                    edad: edad ? { equals: parseInt(edad) } : undefined,
                    idSexo: sexo ? { equals: parseInt(sexo) } : undefined,
                    adopcion: (userType === 0 || userType === 1) ? { is: null }// Excluir mascotas en adopción si el usuario es adoptante o sin registro
                        : ((userType == 2 || userType == 3) && adoptado === 'adoptado') ? { isNot: null }
                            : adoptado === 'noAdoptado' ? { is: null } : undefined,
                },
            });
        } catch (error) {
            console.log(error);
        }
        return NextResponse.json({ mascotas }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ error: 'Ocurrio un fallo al realizar la busqueda' }, { staus: 500 });
    }
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const mascota = formData.get("mascota");
        const image = formData.get("image");
        const mascotaParsed = JSON.parse(mascota.substring(mascota.indexOf('{'), mascota.lastIndexOf('}') + 1));
        const { nombre, especie, raza, edad, sexo, tamano, maltratado, motivo, cartilla, idRefugio } = mascotaParsed;

        const razaCase = raza.toLowerCase();

        try {
            const id = await prisma.mascota.create({
                data: {
                    nombre,
                    especie: { connect: { id: parseInt(especie) }, },
                    raza: razaCase,
                    edad: parseInt(edad),
                    sexo: { connect: { id: parseInt(sexo) } },
                    tamano: { connect: { id: parseInt(tamano) } },
                    maltratado,
                    motivo: motivo,
                    cartilla,
                    imagen: image != "null" ? image : "",
                    refugio: { connect: { id: idRefugio } },
                },
                select: {
                    id: true,
                }
            });
            return NextResponse.json({ message: "mascota registrada", id }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "fallo al registrar mascota" }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "fallo al registrar mascota" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const formData = await req.formData();
        const mascota = formData.get("mascota");
        const mascotaInit = formData.get("mascotaInicial");
        const image = formData.get("image");
        const mascotaParsed = JSON.parse(mascota.substring(mascota.indexOf('{'), mascota.lastIndexOf('}') + 1));
        const mascotaInitParsed = JSON.parse(mascotaInit.substring(mascotaInit.indexOf('{'), mascotaInit.lastIndexOf('}') + 1));
        const { nombre, especie, raza, edad, sexo, tamano, maltratado, motivo, cartilla, estadoAdopcion } = mascotaParsed;

        const razaCase = raza.toLowerCase();

        try {
            await prisma.mascota.update({
                where: {
                    id: mascotaInitParsed.id
                },
                data: {
                    nombre: nombre !== mascotaInitParsed.nombre ? nombre : undefined,
                    especie: especie !== mascotaInitParsed.especie.id ? { connect: { id: parseInt(especie) } } : undefined,
                    raza: razaCase !== mascotaInitParsed.raza ? razaCase : undefined,
                    edad: edad !== mascotaInitParsed.edad ? parseInt(edad) : undefined,
                    sexo: sexo !== mascotaInitParsed.sexo.id ? { connect: { id: parseInt(sexo) } } : undefined,
                    tamano: tamano !== mascotaInitParsed.idTamano ? { connect: { id: parseInt(tamano) } } : undefined,
                    maltratado: maltratado !== mascotaInitParsed.maltratado ? maltratado : undefined,
                    motivo: motivo !== mascotaInitParsed.motivo ? motivo : undefined,
                    cartilla: cartilla !== mascotaInitParsed.cartilla ? cartilla : undefined,
                    imagen: (image != "null" && image !== mascotaInitParsed.imagen) ? image : undefined,
                },
            });

            if (estadoAdopcion !== null) {
                try {
                    await prisma.adopcion.update({
                        where: { idMascota: mascotaInitParsed.id },
                        data: {
                            estadoAdopcion: estadoAdopcion !== mascotaInitParsed.adopcion.estadoAdopcion.id ? { connect: { id: parseInt(estadoAdopcion) } } : undefined
                        },
                    });
                } catch (error) {
                    console.error('Error occurred while updating adopcion', error);
                    NextResponse.json({ error: 'Failed to update adopcion' }, { staus: 500 });
                }
            }

            return NextResponse.json({ message: "mascota modificada" }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "fallo al modificar mascota" }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "fallo al modificar mascota" }, { status: 500 });
    }
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get('id');
    try {
        const adopcion = await prisma.mascota.findUnique({
            include: {
                adopcion: true
            },
            where: {
                id: parseInt(id)
            }
        });
        console.log(adopcion);
        if (adopcion.adopcion.length !== 0) {
            return NextResponse.json({ message: 'Adopcion encontrada' }, { status: 409 });
        }

        await prisma.mascota.delete({
            where: {
                id: parseInt(id)
            }
        });
        return NextResponse.json({ message: "Mascota eliminada" }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ error: 'Ocurrio al eliminar la mascota' }, { staus: 500 });
    }
}