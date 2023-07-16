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
                    adoptante: true,
                    estadoAdopcion: true,
                },
            },
            especie: true,
            historialAdoptivo: true,
            sexo: true,
            refugio: true,
        }
    });

    return mascota;
}
