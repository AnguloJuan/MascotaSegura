'use client';
import { Input } from '@/components/Inputs';
import { useEffect, useState } from 'react';
import { Estados, Select } from '@/components/Selects';
import { Municipios } from '@/components/SelectsClient';
import { Each } from '@/components/Each';
import CardUser from '@/components/CardUser';
import Button from '@/components/Button';

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
				//console.log(data.adoptantes);
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
		e.target.value
			? (document.getElementById('municipio').disabled = false)
			: (document.getElementById('municipio').disabled = true);
	};

	return (
		<section>
			<h2 className="text-5xl">Lista de adoptantes</h2>
			<div className="w-full py-5">
				<div className="flex justify-around items-end">
					<Input
						id={'nombre'}
						label={'Nombre'}
						placeholder={'Nombre'}
						name={'nombre'}
						onChange={handleInputChange}
						className="w-[300px]"
					/>
					<Input
						id={'correo'}
						label={'Correo Electronico'}
						placeholder={'correo electronico'}
						name={'correo'}
						onChange={handleInputChange}
						className="w-[300px]"
					/>
					<Button onClick={fetchAdoptantes} text="Buscar" />
				</div>
				<div className="">
					<div className="">
						<Input
							id={'adoptante'}
							label={'ID del adoptante'}
							placeholder={'Id adoptante'}
							type={'number'}
							name={'id'}
							value={searchCriteria.id}
							onChange={handleInputChange}
						/>
					</div>
					<div className="">
						<Input
							id={'numero'}
							label={'Numero de telefono'}
							placeholder={'Numero telefono'}
							name={'telefono'}
							type={'number'}
							value={searchCriteria.telefono}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="flex justify-around">
					<Estados
						estados={props.estados}
						onChange={handleEstadoChange}
						value={searchCriteria.estado}
					/>
					<div className="">
						<Municipios
							selectedEstado={searchCriteria.estado}
							value={searchCriteria.municipio}
							onChange={handleInputChange}
						/>
					</div>
					<Select id="adopcion" onChange={handleInputChange} label="Adopcion">
						<option value="">Cualquiera</option>
						<option value="conAdopcion">Con adopción</option>
						<option value="sinAdopcion">Sin adopción</option>
					</Select>
				</div>
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
