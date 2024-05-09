import Rescate from './rescate';
import { getPrisma } from '@/app/lib/prisma';
import { GetUser } from '@/app/lib/user';

const prisma = getPrisma();

export const metadata = {
	title: 'Rescate',
};

export default async function RescatePage() {
	const user = await GetUser();
	const idRefugio = user.idRefugio;
	return (
		<section className="flex flex-col gap-4">
			<h3 className="text-5xl">Registrar Mascota</h3>
			<Rescate idRefugio={idRefugio} />
		</section>
	);
}
