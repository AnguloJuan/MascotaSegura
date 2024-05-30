import RedirectUser from '@/app/(pages)/redirectUser';
import { getPrisma } from '@/app/lib/prisma';
import PerfilPage from './perfil';
import { GetUser } from '@/app/lib/user';
import { Each } from '@/components/Each';
import CardMascota from '@/components/CardMascota';
import { Suspense } from 'react';
import Loading from '@/app/(pages)/loading';

const prisma = getPrisma();

export const metadata = {
	title: 'Adoptante',
};

export default async function Page({ params }) {
	const userType = GetUser().idTipoUsuario;
	const { adoptanteId } = params;
	const adoptante = await prisma.adoptante.findUnique({
		where: {
			id: parseInt(adoptanteId),
		},
	});
	const adoptanteMunicipio = adoptante.idMunicipio;
	const adoptanteEstado = await prisma.municipio.findUnique({
		select: {
			idEstado: true,
		},
		where: {
			id: adoptanteMunicipio,
		},
	});
	const municipios = await prisma.municipio.findMany({
		where: {
			idEstado: adoptanteEstado.idEstado,
		},
	});
	const adopciones = await prisma.adopcion.findMany({
		where: {
			idAdoptante: adoptante.id,
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

	const props = {
		adoptante,
		municipios,
		adoptanteEstado,
		adoptanteMunicipio,
		adopciones,
		userType,
	};
	return userType == 0 ? (
		<Suspense fallback={<Loading />}>
			<RedirectUser />
		</Suspense>
	) : (
		<>
			<Suspense fallback={<Loading />}>
				<PerfilPage props={props} />

				{props.adopciones.length !== 0 && (
					<>
						<h3 className="text-3xl mb-3">Mascota adoptada</h3>
						<div className="flex flex-wrap justify-center gap-3">
							<Each
								of={props.adopciones}
								render={(adopcion) => (
									<CardMascota
										{...adopcion.mascota}
										href={`/adopcion/mascota/${adopcion.mascota.id}`}
									/>
								)}
							/>
						</div>
					</>
				)}
			</Suspense>
		</>
	);
}
