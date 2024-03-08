import { getPrisma } from '@/app/lib/prisma';
import ListaMascota from './listaMascota';
import { GetUser } from '@/app/lib/user';
import { Suspense } from 'react';
import Loading from './loading';

const prisma = getPrisma();

export const metadata = {
	title: 'Mascotas',
};

export default async function Adopcion() {
	const user = GetUser();
	const mascotas = await prisma.mascota.findMany({
		include: {
			sexo: true,
		},
		where: {
			adopcion: user.idTipoUsuario === (0 || 1) ? { is: null } : undefined, // Excluir mascotas en adopción si el usuario es adoptante o sin registro
		},
	});
	const especies = await prisma.especie.findMany();
	const razas = await prisma.mascota.findMany({
		select: {
			id: true,
			raza: true,
		},
		distinct: 'raza',
	});

	return (
		<>
			<h2 className="text-7xl mb-8">Lista de Mascotas</h2>
			<Suspense fallback={<Loading />}>
				<ListaMascota
					inicialMascotas={mascotas}
					especies={especies}
					razas={razas}
					userType={user.idTipoUsuario}
				/>
			</Suspense>
		</>
	);
}
