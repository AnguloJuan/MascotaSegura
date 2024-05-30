import { getPrisma } from '@/app/lib/prisma';
import { GetUser } from '@/app/lib/user';
import Reportar from './reportar';
import { Suspense } from 'react';
import Loading from '../../loading';

const prisma = getPrisma();

export const metadata = {
	title: 'Reportar',
};

export default async function ReportarPage() {
	const user = await GetUser();

	const props = { user };

	return (
		<Suspense fallback={<Loading />}>
			<Reportar props={props} />
		</Suspense>
	);
}
