'use client';
import { Input } from '@/components/Inputs';
// import listaEmpleados from './empleados.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Select } from '@/components/Selects';
import { Each } from '@/components/Each';
import CardUser from '@/components/CardUser';
import Button from '@/components/Button';

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
			<div>
				<h2 className="text-5xl">Lista de empleados</h2>
				<center>
					<Link
						href={'empleados/registro'}
						className="btn btn-success border rounded mt-4 mb-2 d-flex align-items-center"
					>
						<span className="f-bold fs-4 mx-2">+</span>Agregar nuevo empleado
					</Link>
				</center>
				<div className="flex gap-5 items-end">
					<Input
						id={'empleado'}
						type={'number'}
						label={'ID del empleado'}
						placeholder={'Id empleado'}
						name={'id'}
						value={searchCriteria.id}
						onChange={handleInputChange}
					/>

					<Button onClick={fetchEmpleado} text="Buscar" />
				</div>
				<div className="">
					<div className="">
						<Input
							id={'nombre'}
							label={'Nombre'}
							placeholder={'Nombre'}
							name={'nombre'}
							onChange={handleInputChange}
						/>
					</div>
					<div className="">
						<Select
							id="tipoEmpleado"
							onChange={handleInputChange}
							label="Tipo empleado"
						>
							<option value="">Selecciona el tipo empleado</option>
							<option value={2}>Empleado</option>
							<option value={3}>Administrador</option>
						</Select>
					</div>
				</div>
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
