import registro from './reporte.module.css';
import actualizar from './reporte.module.css';
import { Input } from '@/components/Inputs';
import { getPrisma } from '@/app/lib/prisma';
import Link from 'next/link';
import ListaReportes from './listaReportes';
import Image from 'next/image';

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
			<div className="btn p-0 w-100 btn-primary">
				<Link
					href={'/dashboard'}
					className="link-light link-underline-opacity-0 w-100 p-2 d-flex align-items-center"
				>
					<div className="bg-white rounded">
						<Image
							src={'/images/menu/reportes.png'}
							alt="Dashboard"
							width={30}
							height={30}
						/>
					</div>
					<span className="fw-bold ms-3">Dashboard</span>
				</Link>
			</div>
			<center>
				<Link
					href={'reportes/reportar'}
					className="btn btn-danger border rounded mt-4 mb-2 d-flex align-items-center"
				>
					<span className="fw-bold fs-4 mx-2">!</span>Reportar un caso
				</Link>
			</center>
			<ListaReportes props={props} />
		</>
	);
}

export function registrarReporte() {
	return (
		<>
			<div className={registro}>
				<h3>Reportar caso de maltrato</h3>
				<div className={registro.contenedorRegistro}>
					<div className={registro.perfil}></div>
					<div className={registro.informacion}>
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

				<div className={registro.buton}>
					<button>Reportar</button>
				</div>
			</div>
		</>
	);
}
export function editarReporte() {
	return (
		<>
			<div className={actualizar}>
				<h3>Informacion del reporte</h3>
				<div className={actualizar.contenedorRegistro}>
					<div className={actualizar.perfil}></div>
					<div className={actualizar.informacion}>
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

				<div className={actualizar.contenedorBotones}>
					<div className={actualizar.buton1}>
						<button>Guardar</button>
					</div>
					<div className={actualizar.buton2}>
						<button>Eliminar</button>
					</div>
				</div>
			</div>
		</>
	);
}
