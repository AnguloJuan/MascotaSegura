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

	const props = { reportes };

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