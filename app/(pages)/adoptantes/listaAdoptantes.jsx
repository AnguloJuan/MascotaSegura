'use client';
import { InputBuscar } from '@/components/Inputs';
import { useEffect, useState } from 'react';
import { Estados, Select } from '@/components/Selects';
import { Municipios } from '@/components/Selects';
import { Each } from '@/components/Each';
import CardUser from '@/components/CardUser';

export default function ListaAdoptantes({ props }) {
	const [searchCriteria, setSearchCriteria] = useState({
		nombre: '',
		correo: '',
		id: '',
		telefono: '',
		edad: '',
		estado: 0,
		municipio: 0,
		adopcion: '',
	});

	const [adoptantes, setAdoptantes] = useState([]);

	useEffect(() => {
		setSearchCriteria((prevCriteria) => ({
			...prevCriteria,
			userType: props.userType,
		}));
		setAdoptantes(props.adoptantes);
	}, []);

	const fetchAdoptantes = async () => {
		// Perform the API request to fetch the adoptantes list
		try {
			const search = JSON.stringify(searchCriteria);
			const response = await fetch(`/api/adoptante?search=${search}`);
			if (response.ok) {
				const data = await response.json();
				setAdoptantes(data.adoptantes);
			} else {
				console.error('Failed to fetch adoptantes');
			}
		} catch (error) {
			console.error('An error occurred while fetching adoptantes', error);
		}
	};

	// Function to handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if ((name == 'telefono' || name == 'id') && value < 0) {
			return;
		}
		setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
	};
	const handleEstadoChange = (e) => {
		const { name, value } = e.target;
		setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
		// Reset selected municipio when estado user
		setSearchCriteria((prevCriteria) => ({ ...prevCriteria, municipio: 0 }));
	};

	return (
		<section className="flex flex-col gap-5">
			<h2 className="text-5xl mb-7">Lista de Adoptantes</h2>
			<div className="sticky top-0 flex items-end justify-between gap-5 z-50 bg-white">
				<div className="flex gap-5">
					<Estados
						onChange={handleEstadoChange}
						value={searchCriteria.estado}
					/>
					<Municipios
						selectedEstado={searchCriteria.estado}
						value={searchCriteria.municipio}
						onChange={handleInputChange}
					/>
					<Select id="adopcion" onChange={handleInputChange} label="Adopcion">
						<option value="">Cualquiera</option>
						<option value="conAdopcion">Con adopción</option>
						<option value="sinAdopcion">Sin adopción</option>
					</Select>
				</div>
				<InputBuscar
					id={'buscar'}
					placeholder={'Buscar'}
					name={'buscar'}
					onChange={handleInputChange}
					onClick={fetchAdoptantes}
				/>
			</div>
			{adoptantes.length !== 0 ? (
				<div className="flex flex-wrap place-content-center gap-10">
					<Each
						of={adoptantes}
						render={(adoptante, index) => (
							<CardUser items={adoptante} key={index} />
						)}
					/>
				</div>
			) : (
				<center>
					<h3 className="mt-3">No se encontraron resultados</h3>
				</center>
			)}
		</section>
	);
}
