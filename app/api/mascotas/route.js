import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

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
