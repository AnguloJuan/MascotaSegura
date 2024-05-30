import { Suspense } from 'react';
import RegistroEmpleado from './registro';
import Loading from '../../loading';

export const metadata = {
	title: 'Registrar empleado',
};

export default function Page() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<h1 className="text-6xl">Registro de empleado</h1>
				<RegistroEmpleado />
			</Suspense>
		</>
	);
}
