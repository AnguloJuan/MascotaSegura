const { getPrisma } = require("./prisma");

const prisma = getPrisma();

export async function GetMascota(mascotaId) {
    const mascota = await prisma.mascota.findUnique({
        where: {
            id: parseInt(mascotaId),
        },
        include: {
            adopcion: {
                include: {
                    adoptante: {
                        include: {
                            municipio:{
                                include:{
                                    estado:true,
                                }
                            }
                        },
                    },
                    estadoAdopcion: true,
                },
            },
            especie: true,
            raza: true,
            historialAdoptivo: true,
            sexo: true,
            refugio: true,
            tamano: true,
        }
    });

    return mascota;
}
