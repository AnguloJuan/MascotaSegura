import { v4 as uuid } from 'uuid';
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { getPrisma } from '@/app/lib/prisma';

const prisma = getPrisma();

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