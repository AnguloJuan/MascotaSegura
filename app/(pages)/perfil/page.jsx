import { GetUser } from '../../lib/user';
import { getPrisma } from '@/app/lib/prisma';
import { Each } from '@/components/Each';
import CardMascota from '@/components/CardMascota';
import Perfil from './perfil';
import { Suspense } from 'react';
import Loading from '../loading';

const prisma = getPrisma();

export const metadata = {
	title: 'Perfil',
};

export default async function PerfilPage() {
	const user = await GetUser();

	const userType = user.idTipoUsuario;
	const userMunicipio = user.idMunicipio;
	let userEstado;
	let props;
	if (userType == 1) {
		userEstado = await prisma.municipio.findUnique({
			select: {
				idEstado: true,
			},
			where: {
				id: userMunicipio,
			},
		});
		const municipios = await prisma.municipio.findMany({
			where: {
				idEstado: userEstado.idEstado,
			},
		});
		const adopciones = await prisma.adopcion.findMany({
			where: {
				idAdoptante: user.id,
			},
			include: {
				mascota: {
					include: {
						especie: true,
						sexo: true,
					},
				},
				estadoAdopcion: true,
			},
		});

		props = {
			user,
			userType,
			municipios,
			userMunicipio,
			userEstado,
			adopciones,
		};
	} else {
		props = { user, userType };
	}
	return (
		<Suspense fallback={<Loading />}>
			<section>
				<h1 className="text-5xl">Mi Perfil</h1>
				<Perfil props={props} />

				{userType == 1 && props.adopciones.length !== 0 && (
					<>
						<h3 className="text-2xl mb-4">Mascota adoptada</h3>
						<div className="flex flex-wrap justify-center gap-3">
							<Each
								of={props.adopciones}
								render={(adopcion, index) => (
									<CardMascota
										{...adopcion.mascota}
										href={`/adopcion/mascota/${adopcion.mascota.id}`}
										key={index}
										estadoAdopcion={adopcion['estadoAdopcion'].estadoAdopcion}
									/>
								)}
							/>
						</div>
					</>
				)}
			</section>
		</Suspense>
	);
}
