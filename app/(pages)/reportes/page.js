import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getEspacios() {
    const espacio = await prisma.espacios.findMany({
        where: {idRefugio: 1},
        include: {
            especie: true,
        },
    });

    /*const espaciosLibres = refugios.map(refugio => ({
        refugioId: refugio.id,
        municipio: refugio.municipio,
        espacios: refugio.espacios,
    }));*/
    return espacio;
}


export default async function Dashboard() {
    const espacios = await getEspacios();
    console.log(espacios);
    return (
        <>
            <h1>Reporte del refugio</h1>

            <h2>Reportes generales</h2>
            {espacios.map((espacio) => (
                <p key={espacio.id}>{espacio.refugioId}, {espacio.especie.especie}, {espacio.espacios}</p>
            ))}
        </>
    )
}