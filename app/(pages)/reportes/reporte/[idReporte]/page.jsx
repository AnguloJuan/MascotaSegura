/* eslint-disable @next/next/no-img-element */
import { getPrisma } from '@/app/lib/prisma';
import Image from 'next/image';
import Reporte from './reporte';
import { GetUser } from '@/app/lib/user';
import { Estados, EstadosReporte } from '@/components/Selects';
import { Municipios } from '@/components/Selects';
import EliminarReporte from './deleteReporte';
import Loading from '@/app/(pages)/loading';
import { Suspense } from 'react';

const prisma = getPrisma();

export const metadata = {
	title: 'Reporte',
};

export default async function ReportePage({ params }) {
	const { idReporte } = params;
	const user = await GetUser();
	const userType = user.idTipoUsuario;
	const reporte = await prisma.reporte.findUnique({
		where: {
			id: parseInt(idReporte),
		},
		include: {
			reportador: true,
			municipio: true,
			estadoReporte: true,
		},
	});

	const municipios = await prisma.municipio.findMany({
		where: {
			idEstado: reporte.municipio.idEstado,
		},
	});

	function pad(num, size) {
		num = num.toString();
		while (num.length < size) num = '0' + num;
		return num;
	}
	const day = pad(new Date(reporte.fechaCreada).getDay(), 2);
	const month = pad(new Date(reporte.fechaCreada).getMonth(), 2);
	const year = new Date(reporte.fechaCreada).getFullYear();
	const date = `${year}-${month}-${day}`;

	const props = { reporte, user, userType, municipios, date };
	return userType == 2 || userType == 3 ? (
		<Suspense fallback={<Loading />}>
			<Reporte props={props} />
		</Suspense>
	) : (
		<>
			<Suspense fallback={<Loading />}>
				<form>
					<h1 className="text-5xl">Información del reporte</h1>
					<div className="flex gap-5">
						<img
							src={props.reporte.imagen}
							alt={
								`ImagenReporte${props.reporte.id}` ||
								'/images/defaultReporte.png'
							}
							className="rounded-md size-80 object-cover aspect-square"
						/>
						<div className="grid w-full">
							<div>
								<h3 className="text-xl">Fecha reportada</h3>
								<p className="bg-primary py-2 rounded-md text-white text-center">
									{new Date(reporte.fechaCreada).toLocaleDateString()}
								</p>
							</div>
							<div className="flex gap-5">
								<Estados value={reporte.municipio.idEstado} disabled />

								<Municipios
									municipiosInicial={municipios}
									value={reporte.municipio.id}
									disabled
								/>
							</div>
							<div className="">
								<label htmlFor="descripcion" className="form-label">
									Descripción
								</label>
								<textarea
									name="descripcion"
									id="descripcion"
									rows="5"
									disabled
									value={reporte.descripcion}
									className="py-2 px-4 w-full rounded-lg border-black border-2 focu:outline outline-primary outline-offset-4 resize-none"
								/>
							</div>
						</div>
					</div>

					<EstadosReporte value={reporte.estadoReporte.id} disabled />

					{reporte.reportador && reporte.reportador.id == user.id && (
						<EliminarReporte props={props} />
					)}
				</form>
			</Suspense>
		</>
	);
}
