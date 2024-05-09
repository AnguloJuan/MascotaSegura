import { getPrisma } from '@/app/lib/prisma';
import ListaAdoptantes from './listaAdoptantes';
import { GetUser } from '@/app/lib/user';

const prisma = getPrisma();

export const metadata = {
	title: 'Adoptantes',
};

export default async function adoptantes() {
	const user = await GetUser();
	const adoptantes = await prisma.adoptante.findMany();

	const props = { user, adoptantes };
	return <ListaAdoptantes props={props} />;
}
