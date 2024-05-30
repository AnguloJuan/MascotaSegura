/* eslint-disable @next/next/no-img-element */
import { GetMascota } from '@/app/lib/getMascota';
import Adoptar from './adoptar';
import { GetUser } from '@/app/lib/user';
import { getPrisma } from '@/app/lib/prisma';
import MascotaPage from './mascota';
import Cancelar from './cancelarAdopcion';
import Image from 'next/image';
import { Suspense } from 'react';
import Loading from '../../../../(auth)/loading';

const prisma = getPrisma();

export const metadata = {
	title: 'Mascota',
};

export default async function Page({ params }) {
	const { mascotaId } = params;
	const mascota = await GetMascota(mascotaId);
	const user = await GetUser();
	const userId = user.id;
	const userType = user.idTipoUsuario;
	return (
		<>
			{userType == 2 || userType == 3 ? (
				<Suspense fallback={<Loading />}>
					<MascotaPage mascotaInicial={mascota} />
				</Suspense>
			) : (
				<Suspense fallback={<Loading />}>
					<div className="grid grid-cols-2 gap-6">
						<img
							src={mascota.imagen || '/images/dogIcon.png'}
							alt={mascota.nombre}
							className="object-cover w-full h-full object-center"
						/>
						<div className="space-y-6">
							<span className="bg-primary rounded-lg text-6xl text-white px-3">
								{mascota.nombre}
							</span>
							<div className="flex flex-col gap-3 *:bg-primary *:rounded-lg text-2xl text-white *:text-center">
								<span>
									{mascota.cartilla
										? 'Con cartilla de vacunación'
										: 'Sin cartilla de vacunación'}
								</span>
								<span>
									{mascota.maltratado
										? 'Ha sido maltratado'
										: 'No ha sido maltratado'}
								</span>
							</div>
							<div
								className="flex gap-x-12 gap-y-3 flex-wrap
						[&_h2]:text-sm [&_h2]:bg-primary [&_h2]:w-fit [&_h2]:rounded-lg [&_h2]:px-1 
						[&_h2]:text-white  
						[&_span]:text-4xl"
							>
								<div>
									<h2>Especie</h2>
									<span>{mascota.especie.especie}</span>
								</div>
								<div>
									<h2>Raza</h2>
									<span>{mascota.raza.raza}</span>
								</div>
								<div>
									<h2>Edad</h2>
									<span>{mascota.edad} años</span>
								</div>
								<div>
									<h2>Sexo</h2>
									<span>{mascota.sexo.sexo}</span>
								</div>
								<div>
									<h2>Tamaño</h2>
									<span>{mascota.tamano.tamano}</span>
								</div>
							</div>
							Muestra adoptante
							{mascota.adopcion && (
								<div className="">
									<div className="">
										<Image
											src={'/images/adoptante1.jpg'}
											alt="mascota.png"
											width={200}
											height={200}
										/>
									</div>
									<div className="">
										<h3>Persona adoptante</h3>
										<p>id: {mascota.adopcion.adoptante.id}</p>
										<p>Nombre: {mascota.adopcion.adoptante.nombre}</p>
										<p>correo: {mascota.adopcion.adoptante.correo}</p>
									</div>
								</div>
							)}
							{mascota.adopcion && mascota.adopcion.adoptante.id == userId && (
								<p>
									Estado de adopción:
									{mascota.adopcion.estadoAdopcion.estadoAdopcion}
								</p>
							)}
							{mascota.adopcion &&
								mascota.adopcion.estadoAdopcion.id == 3 &&
								mascota.adopcion.adoptante.id == userId && (
									<div className="">
										<Cancelar
											idAdopcion={mascota.adopcion.id}
											idAdoptante={mascota.adopcion.adoptante.id}
											idMascota={mascota.id}
										/>
									</div>
								)}
							{!mascota.adopcion && (
								<div className="">
									<Adoptar mascotaId={mascota.id} adoptanteId={userId} />
								</div>
							)}
							{(mascota.motivo || mascota.historialAdoptivo.length !== 0) && (
								<div className="">
									<p>Anteriores adopciones</p>
									<p>Motivos de abandono</p>
									{mascota.motivo && (
										<p className="border rounded">- {mascota.motivo}</p>
									)}

									{mascota.historialAdoptivo.length !== 0 &&
										mascota.historialAdoptivo.map(
											(historial) =>
												historial.motivo && (
													<p key={historial.id} className="border rounded">
														- {historial.motivo}
													</p>
												)
										)}
								</div>
							)}
						</div>
					</div>
				</Suspense>
			)}
		</>
	);
}
