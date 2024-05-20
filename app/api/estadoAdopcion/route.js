import { getPrisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const prisma = getPrisma();

export async function POST(request) {
    if (request.method !== 'POST') {
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

    const { mascotaId, adoptanteId } = await request.json();

    try {
        // Extract the necessary data from the request body

        // Check if the mascota has already been adopted
        const existingAdoption = await prisma.adopcion.findFirst({
            where: {
                idMascota: mascotaId,
                estadoAdopcion: {
                    estadoAdopcion: 'Aceptado',
                },
            },
        });

        if (existingAdoption) {
            return NextResponse.json({ error: 'Mascota has already been adopted' }, { status: 400 });
        }

        // Check if the user has already adopted a mascota
        /*const userAdoptions = await prisma.adopcion.findMany({
          where: {
            idAdoptante: adoptanteId,
            idMascota: mascotaId,
          },
        });
    
        if (userAdoptions.length > 0) {
          return NextResponse.json({ error: 'User has already adopted a mascota' }, { status: 400 });
        }*/

        const mascota = await prisma.mascota.findUnique({
            where: { id: mascotaId },
        });

        if (!mascota) {
            return NextResponse.json({ error: 'Mascota not found' }, { status: 404 });
        }
        const adoptante = await prisma.adoptante.findUnique({
            where: { id: adoptanteId },
        });

        if (!adoptante) {
            return NextResponse.json({ error: 'Adoptante not found' }, { status: 404 });
        }

        // Access the idRefugio value from the mascota record
        const idRefugio = mascota.idRefugio;
        // Perform the adoption creation in the database
        let adoption;
        const date = new Date().toISOString();
        try {
            adoption = await prisma.adopcion.create({
                data: {
                    mascota: { connect: { id: mascotaId } },
                    adoptante: { connect: { id: adoptanteId } },
                    estadoAdopcion: { connect: { id: 3 } },
                    refugio: { connect: { id: idRefugio } },
                    fechaCreada: date,
                },
            });
        } catch (e) {
            console.log(e);
        }

        return NextResponse.json(adoption, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create adoption' }, { status: 500 });
    }
}

export async function PUT(req) {
    if (req.method !== 'PUT') {
        return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

    const { adopcionId, estado } = await req.json();
    console.log(adopcionId);
    try {
        const updatedAdopcion = await prisma.adopcion.update({
            where: { id: adopcionId },
            data: { estadoAdopcion: { connect: { id: parseInt(estado) } } },
        });
        return NextResponse.json({ success: true, adopcion: updatedAdopcion }, { status: 200 });
    } catch (error) {
        console.error('Error occurred while updating adopcion', error);
        return NextResponse.json({ error: 'Failed to update adopcion' }, { staus: 500 });
    }
}

export async function DELETE(req) {
    try {
        const params = req.nextUrl.searchParams.get('params');
        const { idAdopcion, idAdoptante, idMascota, motivo } = JSON.parse(params);

        await prisma.historialAdoptivo.create({
            data: {
                motivo: motivo,
                adoptante: { connect: { id: parseInt(idAdoptante) } },
                mascota: { connect: { id: parseInt(idMascota) } }
            }
        })
        await prisma.adopcion.delete({
            where: {
                id: parseInt(idAdopcion)
            }
        });
        return NextResponse.json({ message: "Adopción eliminada" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Ocurrio un fallo al cancelar la adopción' }, { staus: 500 });
    }
}