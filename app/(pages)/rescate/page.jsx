import { GetUser } from '@/app/lib/user';
import Rescate from './rescate';
import Loading from '../loading';
import { Suspense } from 'react';

export const metadata = {
	title: 'Rescate',
};

export default async function RescatePage() {
	const user = await GetUser();
	const idRefugio = user.idRefugio;
	return (
		<Suspense fallback={<Loading />}>
			<section className="flex flex-col gap-4">
				<h3 className="text-5xl">Registrar Mascota</h3>
				<Rescate idRefugio={idRefugio} />
			</section>
		</Suspense>
	);
}
