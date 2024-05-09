import { getPrisma } from '@/app/lib/prisma';
import ListaMascota from './listaMascota';
import { GetUser } from '@/app/lib/user';

const prisma = getPrisma();

export const metadata = {
	title: 'Mascotas',
};

export default async function Adopcion() {
	const user = await GetUser();
	const mascotas = await prisma.mascota.findMany({
		include: {
			sexo: true,
		},
		where: {
			adopcion: user.idTipoUsuario === (0 || 1) ? { is: null } : undefined, // Excluir mascotas en adopción si el usuario es adoptante o sin registro
		},
	});

	return (
		<>
			<h2 className="text-7xl mb-8">Lista de Mascotas</h2>
			<ListaMascota
				inicialMascotas={mascotas}
				userType={user.idTipoUsuario}
			/>
		</>
	);
}
