'use client';
import { InputBuscar } from '@/components/Inputs';
// import listaEmpleados from './empleados.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Each } from '@/components/Each';
import CardUser from '@/components/CardUser';

export default function ListaEmpleados({ props }) {
	const [searchCriteria, setSearchCriteria] = useState({
		id: '',
		nombre: '',
		tipoEmpleado: 0,
		userId: props.user.id,
	});

	const [empleados, setEmpleados] = useState([]);

	useEffect(() => {
		setEmpleados(props.empleados);
	}, []);

	const fetchEmpleado = async () => {
		// Perform the API request to fetch the empleados list
		try {
			const search = JSON.stringify(searchCriteria);
			const response = await fetch(`/api/empleado?search=${search}`);
			if (response.ok) {
				const data = await response.json();
				setEmpleados(data.empleados);
				//console.log(data.empleados);
			} else {
				console.error('Failed to fetch empleados');
			}
		} catch (error) {
			console.error('An error occurred while fetching empleados', error);
		}
	};

	// Function to handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name == 'id' && value < 0) {
			return;
		}
		setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
	};

	return (
		<section>
			<h2 className="text-5xl">Lista de empleados</h2>
			<div className=" flex justify-between items-center sticky top-0 py-14 z-50">
				<InputBuscar
					id={'empleado'}
					type={'number'}
					placeholder={'Buscar'}
					name={'id'}
					value={searchCriteria.id}
					onChange={handleInputChange}
					className="rounded-r-none"
					onClick={fetchEmpleado}
				/>
				<Link
					href={'empleados/registro'}
					className="bg-[--primaryColor] hover:bg-[--hoverPrimaryColor] min-h-max h-full border rounded px-4 py-1 text-white"
				>
					Nuevo empleado
				</Link>
			</div>
			<div className="flex flex-wrap place-content-center gap-10">
				<Each
					of={empleados}
					render={(empleado, index) => (
						<CardUser items={empleado} key={index} />
					)}
				/>
			</div>
		</section>
	);
}
