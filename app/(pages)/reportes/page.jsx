import { Input } from '@/components/Inputs';
import { getPrisma } from '@/app/lib/prisma';
import Link from 'next/link';
import ListaReportes from './listaReportes';
import Image from 'next/image';
import { IconChartPie, IconChartPieFilled } from '@tabler/icons-react';

const prisma = getPrisma();

export const metadata = {
	title: 'Reportes',
};

export default async function page() {
	const reportes = await prisma.reporte.findMany({
		include: {
			reportado: true,
			municipio: {
				include: {
					estado: true,
				},
			},
		},
	});
	const estados = await prisma.estado.findMany();

	const props = { reportes, estados };

	return (
		<>
			<h1 className="text-7xl">Lista de reportes</h1>
			<div className="flex justify-between py-5">
				<Link
					href={'/dashboard'}
					className="flex bg-primary hover:bg-primaryHover p-3 rounded-lg text-white"
				>
					<IconChartPieFilled />
					<span className="font-bold ms-3">Dashboard</span>
				</Link>
				<Link
					href={'/reportes/reportar'}
					className="bg-primary hover:bg-primaryHover p-3 rounded-lg text-white"
				>
					Crear Reportar
				</Link>
			</div>
			<ListaReportes props={props} />
		</>
	);
}

export function registrarReporte() {
	return (
		<>
			<div className="">
				<h3>Reportar caso de maltrato</h3>
				<div className="">
					<div className=""></div>
					<div className="">
						<Input id={'adoptado'} label={'Adoptado'} placeholder={'Si/no'} />
						<Input
							id={'reporte'}
							label={'reporte'}
							placeholder={'id reporte'}
						/>
						<Input
							id={'adoptante'}
							label={'adoptante'}
							placeholder={'id Adoptante'}
						/>
					</div>
				</div>
				<Input id={'ubicacion'} label={'Ubicacion'} placeholder={'ubicacion'} />
				<Input
					id={'descripcion'}
					label={'Descriocion'}
					placeholder={'descripcion'}
				/>

				<div className="">
					<button>Reportar</button>
				</div>
			</div>
		</>
	);
}
export function editarReporte() {
	return (
		<>
			<div className="">
				<h3>Informacion del reporte</h3>
				<div className="">
					<div className=""></div>
					<div className="">
						<Input id={'adoptado'} label={'Adoptado'} placeholder={'Si/no'} />
						<Input
							id={'reporte'}
							label={'reporte'}
							placeholder={'id reporte'}
						/>
						<Input
							id={'adoptante'}
							label={'adoptante'}
							placeholder={'id Adoptante'}
						/>
					</div>
				</div>
				<Input id={'ubicacion'} label={'Ubicacion'} placeholder={'ubicacion'} />
				<Input
					id={'descripcion'}
					label={'Descriocion'}
					placeholder={'descripcion'}
				/>

				<div className="">
					<div className="">
						<button>Guardar</button>
					</div>
					<div className="">
						<button>Eliminar</button>
					</div>
				</div>
			</div>
		</>
	);
}
