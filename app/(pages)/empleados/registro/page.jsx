import RegistroEmpleado from './registro';

export const metadata = {
	title: 'Registrar empleado',
};

export default function Page() {
	return (
		<>
			<h1 className="text-6xl">Registro de empleado</h1>
			<RegistroEmpleado />
		</>
	);
}
