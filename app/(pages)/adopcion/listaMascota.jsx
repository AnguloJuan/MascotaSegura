/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import { IconAdjustments, IconX } from '@tabler/icons-react';
import { Input, InputBuscar } from '@/components/Inputs';
import CardMascota from '@/components/CardMascota';
import { Each } from '@/components/Each';
import { Especies, Razas, Select, Sexos } from '@/components/Selects';

export default function ListaMascota({ inicialMascotas, userType }) {
	const [searchCriteria, setSearchCriteria] = useState({
		id: '',
		nombre: '',
		especie: '',
		raza: '',
		edad: '',
		sexo: '',
		userType: 0,
		adoptado: '',
	});

	const [mascotas, setMascotas] = useState([]);
	const [openFilter, setOpenFilter] = useState(false);
	useEffect(() => {
		setSearchCriteria((prevCriteria) => ({
			...prevCriteria,
			userType: userType,
		}));
		setMascotas(inicialMascotas);
	}, []);

	const fetchMascotas = async () => {
		// Perform the API request to fetch the mascotas list
		try {
			const search = JSON.stringify(searchCriteria);
			const response = await fetch(`/api/mascotas?search=${search}`);
			if (response.ok) {
				const data = await response.json();
				setMascotas(data.mascotas);
				//console.log(data.mascotas);
			} else {
				console.error('Failed to fetch mascotas');
			}
		} catch (error) {
			console.error('An error occurred while fetching mascotas', error);
		}
	};

	// Function to handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if ((name == 'edad' || name == 'id') && value < 0) {
			return;
		}
		setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
	};

	return (
		<section className="relative">
			<div
				className={`fixed h-screen top-0 -z-10 ${
					openFilter ? 'left-0' : '-left-full'
				}  bg-white z-50 px-12 py-6 shadow-2xl transition-[left] duration-500`}
			>
				<button
					onClick={() => setOpenFilter(false)}
					className={`absolute right-2 top-2`}
				>
					<IconX size={40} />
				</button>
				<h2 className="text-3xl">Filtro</h2>
				<div className="flex flex-col gap-4">
					{(userType == 2 || userType == 3) && (
						<Select
							id="adoptado"
							onChange={handleInputChange}
							value={searchCriteria.adoptado}
							label="Adoptado"
						>
							<option value="">Cualquiera</option>
							<option value="adoptado">Adoptado</option>
							<option value="noAdoptado">No adoptado</option>
						</Select>
					)}
					<div className="flex flex-col">
						<Especies
							onChange={handleInputChange}
							value={searchCriteria.especie}
						/>
					</div>
					<div className="flex flex-col">
						<Razas
							onChange={handleInputChange}
							value={searchCriteria.raza}
							selectedEspecie={searchCriteria.especie}
						/>
					</div>
					<label htmlFor="Edad" className="font-bold">
						Edad
					</label>
					<div className="flex flex-col">
						<Input
							id={'edad'}
							name={'edad'}
							type={'number'}
							label={'Edad'}
							placeholder={'Edad'}
							value={searchCriteria.edad}
							onChange={handleInputChange}
						/>
					</div>
					<div className="contents">
						<Sexos onChange={handleInputChange} value={searchCriteria.sexo} />
					</div>
				</div>
			</div>

			<div className="flex gap-5">
				<button onClick={() => setOpenFilter(true)}>
					<IconAdjustments size={34} />
				</button>
				<InputBuscar
					id={'nombre'}
					name={'nombre'}
					value={searchCriteria.nombre}
					placeholder={'Nombre o ID'}
					onChange={handleInputChange}
					onClick={fetchMascotas}
				/>
			</div>

			{mascotas.length !== 0 ? (
				<div className="flex flex-wrap justify-center gap-6 mt-5">
					<Each
						of={mascotas}
						render={(item) => (
							<CardMascota href={`/adopcion/mascota/${item.id}`} {...item} />
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
