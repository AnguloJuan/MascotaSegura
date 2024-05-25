'use client';
import CardReporte from '@/components/CardReporte';
import { Each } from '@/components/Each';
// import maltrato from './reporte.module.css';
import { InputBuscar } from '@/components/Inputs';
import { Estados, Select } from '@/components/Selects';
import { Municipios } from '@/components/Selects';
import { useEffect, useState } from 'react';

export default function ListaReportes({ props }) {
	const [searchCriteria, setSearchCriteria] = useState({
		id: '',
		estado: 0,
		municipio: 0,
		estadoReporte: 0,
	});

	const [reportes, setReportes] = useState([]);

	useEffect(() => {
		setSearchCriteria((prevCriteria) => ({
			...prevCriteria,
			userType: props.userType,
		}));
		setReportes(props.reportes);
	}, []);

	const fetchReportes = async () => {
		// Perform the API request to fetch the adoptantes list
		try {
			const search = JSON.stringify(searchCriteria);
			const response = await fetch(`/api/reportes?search=${search}`);
			if (response.ok) {
				const data = await response.json();
				setReportes(data.reportes);
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
		if (name == 'id' && value < 0) {
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
		<>
			<div className="sticky top-0 flex gap-5 justify-center items-center mb-9 bg-white z-20">
				<Select
					onChange={handleInputChange}
					value={searchCriteria.estadoReporte}
					label="Estado del reporte"
				>
					<option value="">Selecciona el estado del reporte</option>
					<option value={1}>Reportado</option>
					<option value={2}>Confirmado</option>
					<option value={3}>En proceso</option>
					<option value={4}>Resuelto</option>
					<option value={5}>Falso</option>
				</Select>
				<Estados
					onChange={handleEstadoChange}
					value={searchCriteria.estado}
				/>
				<Municipios
					selectedEstado={searchCriteria.estado}
					value={searchCriteria.municipio}
					onChange={handleInputChange}
				/>
				<InputBuscar
					id={'reporte'}
					label={'ID del reporte'}
					placeholder={'Id reporte'}
					type={'number'}
					name={'id'}
					value={searchCriteria.id}
					onChange={handleInputChange}
					onClick={fetchReportes}
				/>
			</div>
			<div className="flex flex-wrap gap-4 justify-center">
				<Each
					of={reportes}
					render={(reporte) => <CardReporte {...reporte} key={reporte.id} />}
				/>
			</div>
		</>
	);
}
