import { GetUser } from '@/app/lib/user';
import Rescate from './rescate';

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
