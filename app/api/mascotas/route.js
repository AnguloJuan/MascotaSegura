import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuid } from 'uuid';
import { writeFile } from "fs/promises";
import path from "path";

const prisma = getPrisma();

export async function GET(request) {
    try {
        let mascotas;
        const search = request.nextUrl.searchParams.get('search');
        //console.log(search);
        const { id, nombre, especie, raza, edad, sexo, userType } = JSON.parse(search);
        //console.log({ id, nombre, especie, raza, edad, sexo });
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
                    adopcion: userType === (0 || 1) ? { is: null } : undefined, // Excluir mascotas en adopción si el usuario es adoptante o sin registro
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

        let uniqueName;
        if (image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            uniqueName = `${uuid()}.${image.name.split('.').pop()}`;
            const filePath = path.join(process.cwd(), "public/images/mascotas", uniqueName);
            writeFile(filePath, buffer);
            console.log(uniqueName);
        }
        try {
            await prisma.mascota.create({
                data: {
                    nombre,
                    especie: { connect: { id: parseInt(especie) }, },
                    raza,
                    edad: parseInt(edad),
                    sexo: { connect: { id: parseInt(sexo) } },
                    tamano: { connect: { id: parseInt(tamano) } },
                    maltratado,
                    motivo: motivo,
                    cartilla,
                    imagen: uniqueName,
                    refugio: { connect: { id: idRefugio } },
                },
            });
            return NextResponse.json({ message: "mascota registrada" }, { status: 200 });
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
        const image = formData.get("image");
        const mascotaParsed = JSON.parse(mascota.substring(mascota.indexOf('{'), mascota.lastIndexOf('}') + 1));
        const { id, nombre, especie, raza, edad, sexo, tamano, maltratado, motivo, cartilla, idRefugio } = mascotaParsed;

        let uniqueName;
        if (image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            uniqueName = `${uuid()}.${image.name.split('.').pop()}`;
            const filePath = path.join(process.cwd(), "public/images/mascotas", uniqueName);
            writeFile(filePath, buffer);
            console.log(uniqueName);
        }
        
        try {
            await prisma.mascota.update({
                data: {
                    nombre: nombre ? ,
                    especie: { connect: { id: parseInt(especie) }, },
                    raza,
                    edad: parseInt(edad),
                    sexo: { connect: { id: parseInt(sexo) } },
                    tamano: { connect: { id: parseInt(tamano) } },
                    maltratado,
                    motivo: motivo,
                    cartilla,
                    imagen: uniqueName,
                    refugio: { connect: { id: idRefugio } },
                },
                where: {
                    id
                }
            });
            return NextResponse.json({ message: "mascota registrada" }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "fallo al registrar mascota" }, { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "fallo al registrar mascota" }, { status: 500 });
    }
}