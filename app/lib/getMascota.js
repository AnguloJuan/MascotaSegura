const { getPrisma } = require("./prisma");

const prisma = getPrisma();
let mascota;

export async function GetMascota(mascotaId) {
    if (!mascota) {
        mascota = await prisma.mascota.findUnique({
            where: {
                id: parseInt(mascotaId),
            },
            include: {
                adopcion: {
                    include: {
                        adoptante: true,
                        refugio: true,
                        estadoAdopcion: true,
                    },
                },
                cartilla: true,
                especie: true,
                historialAdoptivo: true,
            }
        });
    }

    return mascota;
}