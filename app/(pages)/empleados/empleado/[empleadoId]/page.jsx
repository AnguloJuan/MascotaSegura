import RedirectUser from '@/app/(pages)/redirectUser';
import { getPrisma } from '@/app/lib/prisma';
import PerfilPage from './perfil';
import { GetUser } from '@/app/lib/user';
import { Suspense } from 'react';
import Loading from '@/app/(pages)/loading';

const prisma = getPrisma();

export const metadata = {
	title: 'Empleado',
};

export default async function Page({ params }) {
	const user = await GetUser();
	const userType = user.idTipoUsuario;
	const { empleadoId } = params;
	const empleado = await prisma.empleado.findUnique({
		where: {
			id: parseInt(empleadoId),
		},
	});
	//formatting date
	function pad(num, size) {
		num = num.toString();
		while (num.length < size) num = '0' + num;
		return num;
	}
	const day = pad(new Date(empleado.fechaRegistro).getDay(), 2);
	const month = pad(new Date(empleado.fechaRegistro).getMonth(), 2);
	const year = new Date(empleado.fechaRegistro).getFullYear();
	const date = `${year}-${month}-${day}`;

	const props = { empleado, userType, date };
	return (
		<Suspense fallback={<Loading />}>
			{userType == 0 ? <RedirectUser /> : <PerfilPage props={props} />}
		</Suspense>
	);
}
