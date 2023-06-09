import { ChartContainer } from "@/components/ChartContainter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getEspacios() {
    const espacios = await prisma.espacios.findMany({
        where: { idRefugio: 1 },
        include: {
            especie: true,
        },
    });
    return espacios.map((espacio) => ({
        especie: espacio.especie.especie,
        espacioTotal: espacio.espacioTotal,
        espacioDisponible: espacio.espacioDisponible,
    }));
}


export default async function Dashboard() {
    const espacios = await getEspacios();
    console.log(espacios);
    return (
        <>
            <h1>Reporte del refugio</h1>

            <h2>Reportes generales</h2>
            {espacios.map((espacio) => (
                <p key={espacio.id}>{espacio.especie}, {espacio.espacioTotal}, {espacio.espacioDisponible}</p>
            ))}
            <ChartContainer data={espacios} />
        </>
    )
}