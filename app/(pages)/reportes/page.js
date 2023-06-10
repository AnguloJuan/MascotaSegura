import { AdopcionesPorMes, Espacios, PorcentajeEspecie, ReportesPorMunicipio } from "@/components/ChartContainter";
import { PrismaClient } from "@prisma/client";
import { dashboard } from "./dashboard.module.css";
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

async function getPorcentajeEspecie() {
    const espacios = await prisma.espacios.findMany({
        where: { idRefugio: 1 },
        include: {
            especie: true,
        },
    });

    const totalEspacios = espacios.reduce((acc, espacio) => acc + (espacio.espacioTotal - espacio.espacioDisponible), 0);

    return espacios.map((espacio) => ({
        especie: espacio.especie.especie,
        cantidad: (espacio.espacioTotal - espacio.espacioDisponible),
        porcentaje: (((espacio.espacioTotal - espacio.espacioDisponible) / totalEspacios) * 100).toFixed(2),
    }));
}

async function getMascotasAdoptadas() {
    const count = await prisma.adopcion.count({
        where: { idRefugio: 1 }
    });
    return count;
}

async function getMascotasRescatadas() {
    const count = await prisma.mascota.count({
        where: {
            idRefugio: 1
        },
    });
    return count;
}

async function getReportesPorMunicipio() {
    const municipiosConReportes = await prisma.reporte.groupBy({
        by: ['idMunicipio'],
        _count: {
            id: true,
        },
    });

    const reportesPorMunicipio = [];

    for (const item of municipiosConReportes) {
        const municipio = await prisma.municipio.findUnique({
            where: {
                id: item.idMunicipio,
            },
        });

        reportesPorMunicipio.push({
            municipio: municipio.nombre,
            count: item._count.id,
        });
    }

    return reportesPorMunicipio;
}


async function getReportesCount() {
    const count = await prisma.reporte.count({
        where: {
            NOT: {
                idReportador: null,
                idReportado: null,
                idMascota: null,
            },
        }
    });
    return count;
}

async function getReportesAnonimosCount() {
    const count = await prisma.reporte.count({
        where: {
            OR: [
                { idReportador: null },
                { idReportado: null },
                { idMascota: null },
            ],
        },
    });
    return count;
}

async function getAdopcionesPorMes() {
    /*
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nextYear = currentYear + 1;

    const adopciones = await prisma.adopcion.findMany({
        where: {
            fechaCreada: {
                lt: new Date(currentYear, 7, 1), // Primer día del año siguinte
            },
        }
    })
    console.log(adopciones);
    const adopcionesPorMes = await prisma.adopcion.groupBy({
        by: ['fechaCreada'],
        _count: {
            id: true,
        },
        where: {
            fechaCreada: {
                gte: new Date(currentYear, 0, 1), // Primer día del año actual
            },
        },
    });
    */
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear - 1, 0, 1); // Primer día del año pasado
    //const endDate = new Date(currentYear, 11, 31); // Último día del año actual

    const adopciones = await prisma.adopcion.findMany({
        where: {
            fechaCreada: {
                gte: startDate,
            },
        },
    });
    //console.log(adopciones);
    return adopciones;
}

async function getAdoptantesPorMes() {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear - 1, 0, 1); // Primer día del año pasado

    const adoptantes = await prisma.adoptante.findMany({
        select: {fechaRegistro: true},
        where: {
            fechaRegistro: {
                gte: startDate,
            },
        },
    });
    return adoptantes;
}

export default async function Dashboard() {
    const espacios = await getEspacios();
    const porcentaje = await getPorcentajeEspecie();
    const mascotasAdoptadas = await getMascotasAdoptadas();
    const mascotasRescatadas = await getMascotasRescatadas();
    const reportes = await getReportesCount();
    const reportesAnonimos = await getReportesAnonimosCount();
    const reportesPorMunicipio = await getReportesPorMunicipio();
    const adopcionesPorMes = await getAdopcionesPorMes();
    const adoptantesPorMes = await getAdoptantesPorMes();

    return (
        <div className={dashboard}>

            <h1>Reporte del refugio</h1>

            <h2>Reportes generales</h2>
            <h3>Cantidad de mascotas adoptadas: {mascotasAdoptadas}</h3>
            <h3>Cantidad de mascotas rescatadas: {mascotasRescatadas}</h3>
            <div className="espacios">
                <Espacios data={espacios} />
            </div>
            <div className="espacios">
                <PorcentajeEspecie data={porcentaje} />
            </div>
            <h3>Cantidad de Reportes: {reportes}</h3>
            <h3>Cantidad de Reportes anonimos: {reportesAnonimos}</h3>
            <div>
                <ReportesPorMunicipio data={reportesPorMunicipio} />
            </div>
            <div>
                <AdopcionesPorMes adopciones={adopcionesPorMes} adoptantes={adoptantesPorMes} />
            </div>
        </div>
    )
}