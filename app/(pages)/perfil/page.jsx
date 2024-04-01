import perfilAdoptador from './perfil.module.css';
import { GetUser } from '../../lib/user';
import { getPrisma } from '@/app/lib/prisma';
import Perfil from './perfil';
import LogoutPage from '../logout/page';
import Link from 'next/link';
import Image from 'next/image';
import { Each } from '@/components/Each';
import CardMascota from '@/components/CardMascota';

const prisma = getPrisma();

export const metadata = {
	title: 'Perfil',
};

export default async function PerfilPage() {
	const user = GetUser();
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
		const estados = await prisma.estado.findMany();
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
					},
				},
				estadoAdopcion: true,
			},
		});

		props = {
			user,
			userType,
			estados,
			municipios,
			userMunicipio,
			userEstado,
			adopciones,
		};
	} else {
		props = { user, userType };
	}
	return userType == 0 ? (
		<LogoutPage />
	) : (
		<>
			<h1 className="text-5xl">Mi Perfil</h1>
			<Perfil props={props} />
			{userType == 1 && props.adopciones.length !== 0 && (
				<>
					<h3>Mascota adoptada</h3>
					<div className="flex flex-col gap-3">
						<Each
							of={props.adopciones}
							render={(adopcion, index) => (
								<CardMascota {...adopcion} key={index} />
							)}
						/>
					</div>
				</>
			)}
		</>
	);
}
