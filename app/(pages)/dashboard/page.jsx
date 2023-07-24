import { AdopcionesPorMes, Espacios, PorcentajeEspecie, ReportesPorMunicipio } from "@/components/ChartContainter";

import dashboard from "./dashboard.module.css";
import { getPrisma } from "@/app/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";

const prisma = getPrisma();
//const prisma = new PrismaClient()

export const metadata = {
    title: 'Dashboard',
}

async function getEspecies() {
    const cantidadMascotasPorEspecie = await prisma.mascota.groupBy({
        by: ['idEspecie'],
        _count: true,
    });

    const resultado = await Promise.all(
        cantidadMascotasPorEspecie.map(async (item) => {
            const especie = await prisma.especie.findUnique({
                where: { id: item.idEspecie },
                select: { especie: true },
            });
            return {
                idEspecie: item.idEspecie,
                especie: especie.especie,
                cantidad: item._count,
            };
        })
    );

    return resultado;
}

async function getPorcentajeEspecie() {
    const cantidadMascotasPorEspecie = await prisma.mascota.groupBy({
        by: ['idEspecie'],
        _count: true,
    });

    const totalMascotas = await prisma.mascota.count();

    const resultado = await Promise.all(
        cantidadMascotasPorEspecie.map(async (item) => {
            const especie = await prisma.especie.findUnique({
                where: { id: item.idEspecie },
                select: { especie: true },
            });
            const porcentaje = ((item._count / totalMascotas) * 100).toFixed(2);
            return {
                idEspecie: item.idEspecie,
                especie: especie.especie,
                cantidad: item._count,
                porcentaje: porcentaje,
            };
        })
    );

    return resultado;
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
            idRefugio: 1,
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
        select: { fechaRegistro: true },
        where: {
            fechaRegistro: {
                gte: startDate,
            },
        },
    });
    return adoptantes;
}

export default async function Dashboard() {
    const espacios = await getEspecies();
    const porcentaje = await getPorcentajeEspecie();
    const mascotasAdoptadas = await getMascotasAdoptadas();
    const mascotasRescatadas = await getMascotasRescatadas();
    const reportes = await getReportesCount();
    const reportesAnonimos = await getReportesAnonimosCount();
    const reportesPorMunicipio = await getReportesPorMunicipio();
    const adopcionesPorMes = await getAdopcionesPorMes();
    const adoptantesPorMes = await getAdoptantesPorMes();

    return (
        <>
            <div>

                <h1>Reportes del generales</h1>
                <div className="btn p-0 w-100 btn-primary">
                    <Link href={"/reportes"} className="link-light link-underline-opacity-0 w-100 p-2 d-flex align-items-center">
                        <div className="bg-white rounded p-1">
                            <Image
                                src={"/images/defaultReporte.png"}
                                alt="reportes"
                                width={30}
                                height={30} />
                        </div>
                        <span className="fw-bold ms-3">Lista de reportes</span>
                    </Link>
                </div>
                <h2 className="mb-2 mt-4">Reportes de adopciones</h2>
                <div className={"d-flex flex-column align-items-center"}>
                    <div className={dashboard.tarjetas}>
                        <div>
                            <p>Cantidad de mascotas adoptadas: </p>
                            <h3>{mascotasAdoptadas}</h3>
                        </div>
                        <div>
                            <p>Cantidad de mascotas refugiadas: </p>
                            <h3>{mascotasRescatadas}</h3>
                        </div>
                    </div>
                    <div className={`${dashboard.canva} w-75`}>
                        <AdopcionesPorMes adopciones={adopcionesPorMes} adoptantes={adoptantesPorMes} />
                    </div>
                </div>

                <h2 className="mt-4 mb-2">Cantidad de mascotas</h2>
                <div className={`${dashboard.espacios} d-flex flex-column align-items-center gap-3`}>
                    <div className={`${dashboard.canva} porcentaje w-50`}>
                        <PorcentajeEspecie data={porcentaje} />
                    </div>
                    <div className={`${dashboard.canva} cantidad w-75`}>
                        <Espacios data={espacios} />
                    </div>
                </div>

                <h2 className="mb-2 mt-4">Reportes de maltrato</h2>
                <div className={"d-flex flex-column align-items-center"}>
                    <div className={dashboard.tarjetas}>
                        <div>
                            <p>Cantidad de reportes: </p>
                            <h3>{reportes}</h3>
                        </div>
                        <div>
                            <p>Cantidad de reportes anonimos: </p>
                            <h3>{reportesAnonimos}</h3>
                        </div>
                    </div>
                    <div className={`${dashboard.canva} w-75`}>
                        <ReportesPorMunicipio className={dashboard.reportesM} data={reportesPorMunicipio} />
                    </div>
                </div>
            </div>
        </>
    )
}