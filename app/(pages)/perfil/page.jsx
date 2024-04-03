import { GetUser } from '../../lib/user';
import { getPrisma } from '@/app/lib/prisma';
import LogoutPage from '../logout/page';
import { Each } from '@/components/Each';
import CardMascota from '@/components/CardMascota';
import dynamic from 'next/dynamic';
import { IconMenuDeep } from '@tabler/icons-react';
const Popover = dynamic(() => import('@/components/Popover'), { ssr: false });

const prisma = getPrisma();

export const metadata = {
	title: 'Perfil',
};

export default async function PerfilPage() {
	const user = await GetUser();
	const { imagen, nombre, apellido, correo, telefono } = user;

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
		<section>
			<h1 className="text-5xl">Mi Perfil</h1>
			{/* <Perfil props={props} /> */}
			<div className="flex py-8 justify-between">
				<div className="flex gap-8">
					<img
						src={imagen || '/images/defaultUser.png'}
						alt=""
						loading="lazy"
						className="size-32 object-cover rounded-full"
					/>
					<div className="">
						<h2 className="text-3xl">
							{nombre} {apellido}
						</h2>
						<h2 className="text-lg">{correo}</h2>
						<h2 className="text-lg">{telefono}</h2>
					</div>
				</div>
				<Popover icon={<IconMenuDeep />}>
					<button className="bg-[--primaryColor] hover:bg-[--hoverPrimaryColor] w-full py-1 px-2 text-white rounded-lg">
						Editar Mi Cuenta
					</button>
					<button className="bg-red-600 hover:bg-red-500 w-full py-1 px-2 text-white rounded-lg">
						Eliminar Mi Cuenta
					</button>
				</Popover>
			</div>

			{userType == 1 && props.adopciones.length !== 0 && (
				<>
					<h3>Mascota adoptada</h3>
					<div className="flex flex-col gap-3">
						<Each
							of={props.adopciones}
							render={(adopcion, index) => (
								<CardMascota {...adopcion.mascota} key={index} />
							)}
						/>
					</div>
				</>
			)}
		</section>
	);
}
