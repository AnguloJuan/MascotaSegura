import { getPrisma } from '@/app/lib/prisma';
import ListaAdoptantes from './listaAdoptantes';
import { GetUser } from '@/app/lib/user';
import { Suspense } from 'react';
import Loading from '../loading';

const prisma = getPrisma();

export const metadata = {
	title: 'Adoptantes',
};

export default async function adoptantes() {
	const user = await GetUser();
	const adoptantes = await prisma.adoptante.findMany();

	const props = { user, adoptantes };
	return (
		<Suspense fallback={<Loading />}>
			<ListaAdoptantes props={props} />{' '}
		</Suspense>
	);
}
