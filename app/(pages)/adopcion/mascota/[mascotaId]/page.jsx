import { GetMascota } from '@/app/lib/getMascota';
import Adoptar from './adoptar';
import { GetUser } from '@/app/lib/user';
import { getPrisma } from '@/app/lib/prisma';
import MascotaPage from './mascota';
import Cancelar from './cancelarAdopcion';

const prisma = getPrisma();

export const metadata = {
	title: 'Mascota',
};

export default async function Page({ params }) {
	const { mascotaId } = params;
	const mascota = await GetMascota(mascotaId);
	const especies = await prisma.especie.findMany();
	/*const refugio = await prisma.refugio.findUnique({
		where: {
			id: mascota.idRefugio,
		}
	})*/
	const user = await GetUser();
	const userId = user.id;
	const userType = user.idTipoUsuario;
	return (
		<>
			<center>
				<h1 className="text-5xl">Información de la mascota</h1>
			</center>
			{userType == 2 || userType == 3 ? (
				<MascotaPage especies={especies} mascotaInicial={mascota} />
			) : (
				<div
					className={`relative flex flex-col justify-end pt-3 overflow-hidden border rounded-lg bg-contain h-full w-full bg-no-repeat bg-center`}
					style={{
						backgroundImage: `url(${mascota.imagen || '/images/dogIcon.png'})`,
					}}
				>
					<span className="absolute top-3 left-3 bg-[--primaryColor] p-2 rounded-lg text-3xl text-white">
						{mascota.nombre}
					</span>
					<div className="absolute flex flex-col gap-1 top-3 right-3 *:min-w-max *:bg-[--primaryColor] *:p-2 *:rounded-lg text-2xl text-white *:text-center">
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
					<div className="flex flex-col gap-5 bg-[--primaryColor] p-3 text-2xl text-white">
						<div className="flex justify-center gap-4 ">
							<p>{mascota.especie.especie}</p>-<p>{mascota.raza}</p>-
							<p>{mascota.edad} años</p>-<p>{mascota.sexo.sexo}</p>-
							<p>{mascota.tamano.tamano}</p>
						</div>
					</div>
					{/* Muestra adoptante 
                        {mascota.adopcion && (
                            <div className={edorAdoptante}>
                                <div className={}>
                                    <Image
                                        src={"/images/adoptante1.jpg"}
                                        alt='mascota.png'
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <div className={acion}>
                                    <h3>Persona adoptante</h3>
                                    <p>id: {mascota.adopcion.adoptante.id}</p>
                                    <p>Nombre: {mascota.adopcion.adoptante.nombre}</p>
                                    <p>correo: {mascota.adopcion.adoptante.correo}</p>

                                </div>
                            </div>
                        )}
                        */}

					{mascota.adopcion && mascota.adopcion.adoptante.id == userId && (
						<p>
							Estado de adopción:{' '}
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
						<div className={edordatos}>
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
			)}
		</>
	);
}
