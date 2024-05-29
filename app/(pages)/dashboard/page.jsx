import {
	AdopcionesPorMes,
	Espacios,
	PorcentajeEspecie,
	ReportesPorMunicipio,
} from '@/components/ChartContainter';

import dashboard from './dashboard.module.css';
import { getPrisma } from '@/app/lib/prisma';
import Link from 'next/link';
import { Each } from '@/components/Each';
import {
	IconAlertOctagon,
	IconAlertOctagonFilled,
	IconChevronLeft,
	IconHexagonLetterA,
} from '@tabler/icons-react';
//import { PrismaClient } from "@prisma/client";

const prisma = getPrisma();
//const prisma = new PrismaClient()

export const metadata = {
	title: 'Dashboard',
};

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
		where: { idRefugio: 1 },
	});
	return count;
}

async function getMascotasRescatadas() {
	const count = await prisma.mascota.count({
		where: {
			idRefugio: 1,
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
		},
	});
	return count;
}

async function getReportesAnonimosCount() {
	const count = await prisma.reporte.count({
		where: { idReportador: null },
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
	const reportesTotales = await prisma.reporte.count();
	const reportesPorMunicipio = await getReportesPorMunicipio();
	const adopcionesPorMes = await getAdopcionesPorMes();
	const adoptantesPorMes = await getAdoptantesPorMes();

	return (
		<>
			<div className="grid gap-6">
				<div>
					<Link
						href={'/reportes'}
						className="flex items-center w-fit bg-primary hover:bg-primaryHover p-3 rounded-lg text-white"
					>
						<IconChevronLeft size={35} /> Regresar
					</Link>
				</div>
				<div className="grid grid-cols-3 gap-2 *:bg-white *:size-auto *:p-5 *:shadow-md *:rounded-md *:shadow-zinc-400">
					<div>
						<h3 className="text-xs">Reportes</h3>
						<p className="text-3xl flex gap-5 items-center justify-between">
							<span>
								<IconAlertOctagonFilled size={35} />
							</span>
							{reportes}
						</p>
					</div>
					<div>
						<h3 className="text-xs">reportes anonimos</h3>
						<p className="text-3xl flex gap-5 items-center justify-between">
							<span>
								<IconHexagonLetterA size={35} />
							</span>
							{reportesAnonimos}
						</p>
					</div>
					<div>
						<h3 className="text-xs">Reportes totales</h3>
						<p className="text-3xl">{reportesTotales}</p>
					</div>
				</div>
				<div className={`w-full h-[40vh] overflow-y-auto ${dashboard.table}`}>
					<table className="table-auto w-full">
						<thead>
							<tr className="text-4xl">
								<th>Municipio</th>
								<th>Reportes</th>
							</tr>
						</thead>
						<tbody>
							<Each
								of={reportesPorMunicipio}
								render={(mun) => (
									<tr className="hover:bg-primaryHover hover:text-white cursor-default">
										<th className="text-xl font-normal">{mun.municipio}</th>
										<th>{mun.count}</th>
									</tr>
								)}
							/>
						</tbody>
					</table>
				</div>
				<div className={'flex flex-column items-center'}>
					<div className={dashboard.tarjetas}>
						<div>
							<p>Mascotas adoptadas</p>
							<h3>{mascotasAdoptadas}</h3>
						</div>
						<div>
							<p>Mascotas refugiadas</p>
							<h3>{mascotasRescatadas}</h3>
						</div>
					</div>
					<div className={`${dashboard.canva} w-75`}>
						<AdopcionesPorMes
							adopciones={adopcionesPorMes}
							adoptantes={adoptantesPorMes}
						/>
					</div>
				</div>

				<h2 className=" ">Cantidad de mascotas</h2>
				<div
					className={`${dashboard.espacios} flex flex-column items-center gap-3`}
				>
					<div className={`${dashboard.canva} porcentaje w-50`}>
						<PorcentajeEspecie data={porcentaje} />
					</div>
					<div className={`${dashboard.canva} cantidad w-75`}>
						<Espacios data={espacios} />
					</div>
				</div>
			</div>
		</>
	);
}
