/* eslint-disable @next/next/no-img-element */
import { AdopcionesPorMes } from '@/components/ChartContainter';

import dashboard from './dashboard.module.css';
import { getPrisma } from '@/app/lib/prisma';
import Link from 'next/link';
import { Each } from '@/components/Each';
import {
	IconAlertOctagon,
	IconChevronLeft,
	IconHexagonLetterA,
	IconHomeCheck,
	IconLocationCheck,
} from '@tabler/icons-react';
import ToolTip from '@/components/ToolTip';
import { Suspense } from 'react';
import Loading from '../../loading';

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
	const especieIcon = {
		perro: 'https://cdn-icons-png.flaticon.com/128/2171/2171990.png',
		gato: 'https://cdn-icons-png.flaticon.com/128/6988/6988878.png',
		ave: 'https://cdn-icons-png.flaticon.com/128/3069/3069186.png',
		reptil: 'https://cdn-icons-png.flaticon.com/128/3196/3196017.png',
		roedor: 'https://cdn-icons-png.flaticon.com/128/720/720887.png',
		pez: 'https://cdn-icons-png.flaticon.com/128/10507/10507943.png',
		caballo: 'https://cdn-icons-png.flaticon.com/128/5511/5511666.png',
		vaca: 'https://cdn-icons-png.flaticon.com/128/4594/4594681.png',
		cerdo: 'https://cdn-icons-png.flaticon.com/128/1841/1841026.png',
		chivo: 'https://cdn-icons-png.flaticon.com/128/2298/2298548.png',
	};

	return (
		<>
			<Suspense fallback={<Loading />}>
				<div className="grid gap-6">
					<div>
						<Link
							href={'/reportes'}
							className="flex items-center w-fit bg-primary hover:bg-primaryHover px-3 py-1 rounded-lg text-white"
						>
							<IconChevronLeft size={35} /> Regresar
						</Link>
					</div>
					<div className="grid grid-cols-3 gap-2 *:bg-white *:p-5 *:shadow-md *:rounded-md *:shadow-zinc-400">
						<div>
							<h3 className="text-xs">Reportes</h3>
							<p className="text-3xl flex gap-5 items-center justify-between">
								<span className="bg-primary p-1 text-white rounded-md">
									<IconAlertOctagon />
								</span>
								{reportes}
							</p>
						</div>
						<div>
							<h3 className="text-xs">reportes anonimos</h3>
							<p className="text-3xl flex gap-5 items-center justify-between">
								<span className="bg-primary p-1 text-white rounded-md">
									<IconHexagonLetterA />
								</span>
								{reportesAnonimos}
							</p>
						</div>
						<div>
							<h3 className="text-xs">Reportes totales</h3>
							<p className="text-3xl">{reportesTotales}</p>
						</div>
					</div>

					<div
						className={`w-full max-h-[40vh] overflow-y-auto shadow-lg shadow-zinc-200 rounded-lg ${dashboard.table}`}
					>
						<table className="table-auto w-full">
							<thead className="text-xl text-white bg-primary py-4">
								<tr>
									<th className="py-2">Municipio</th>
									<th className="py-2">Reportes</th>
								</tr>
							</thead>
							<tbody className="">
								<Each
									of={reportesPorMunicipio}
									render={(mun) => (
										<tr className="hover:bg-primaryHover *:text-center *:font-normal *:py-2 hover:text-white cursor-default odd:bg-primaryHover/20">
											<td>{mun.municipio}</td>
											<td>{mun.count}</td>
										</tr>
									)}
								/>
							</tbody>
						</table>
					</div>
					<div className={'flex justify-center h-[50vh] '}>
						<div className="grid gap-5 place-content-center *:min-w-60 *:space-y-2 *:p-5 *:shadow-md *:shadow-zinc-400 *:rounded-md">
							<div>
								<p className="text-xs">Mascotas adoptadas</p>
								<div className="flex justify-between">
									<span className="bg-primary p-1 rounded-md text-white">
										<IconLocationCheck size={30} />
									</span>
									<h3 className="text-3xl">{mascotasAdoptadas}</h3>
								</div>
							</div>
							<div>
								<p className="text-xs">Mascotas refugiadas</p>
								<div className="flex justify-between">
									<span className="bg-primary p-1 rounded-md text-white">
										<IconHomeCheck size={30} />
									</span>
									<h3 className="text-3xl">{mascotasRescatadas}</h3>
								</div>
							</div>
						</div>
						<AdopcionesPorMes
							adopciones={adopcionesPorMes}
							adoptantes={adoptantesPorMes}
						/>
					</div>

					<h2 className="text-2xl">Cantidad de mascotas</h2>
					<div className="flex flex-wrap gap-3">
						<Each
							of={espacios}
							render={(e) => (
								<div className="basis-56 space-y-3 rounded-lg px-4 py-2 shadow-md shadow-zinc-400">
									<h3 className="text-xs">{e.especie}</h3>
									<div className="flex justify-between gap-2 text-3xl">
										<img
											className="aspect-square size-6 object-cover"
											src={especieIcon[e.especie.toLowerCase()]}
											alt={e.especie}
										/>
										<p>{e.cantidad}</p>
									</div>
								</div>
							)}
						/>
					</div>
					<h3 className="text-2xl">Porcentajes</h3>
					<div className="flex shadow-md shadow-zinc-400 rounded-lg w-full">
						<Each
							of={porcentaje}
							render={(e) => (
								<div className="flex-1 flex flex-col items-center">
									<ToolTip text={`${parseInt(e.porcentaje)}%`}>
										{/* <ToolTip text={parseInt(e.porcentaje)}> */}
										<div
											className={`relative overflow-hidden h-28 w-3 bg-primary/20 rounded-full after:bg-primary after:z-10
										${dashboard.porcentaje}`}
											style={{ '--p': `${parseInt(e.porcentaje)}% ` }}
										/>
									</ToolTip>
									{/* </ToolTip> */}
									<p>{e.especie}</p>
								</div>
							)}
						/>
					</div>
				</div>
			</Suspense>
		</>
	);
}
