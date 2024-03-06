'use client';
// import maltrato from './reporte.module.css';
import { Input } from '@/components/Inputs';
import { Estados, Select } from '@/components/Selects';
import { Municipios } from '@/components/SelectsClient';
import Image from 'next/image';
import Link from 'next/link';
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
			<div className="">
				<div className="">
					<div className="">
						<Input
							id={'reporte'}
							label={'ID del reporte'}
							placeholder={'Id reporte'}
							type={'number'}
							name={'id'}
							value={searchCriteria.id}
							onChange={handleInputChange}
						/>
					</div>
					<button className="btn btn-lg btn-success" onClick={fetchReportes}>
						Buscar
					</button>
				</div>
				<div className="">
					<Select
						handleChange={handleInputChange}
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
						estados={props.estados}
						handleChange={handleEstadoChange}
						value={searchCriteria.estado}
					/>
					<Municipios
						selectedEstado={searchCriteria.estado}
						value={searchCriteria.municipio}
						handleChange={handleInputChange}
					/>
				</div>

				{reportes.length !== 0 ? (
					reportes.map((reporte) => (
						<Link
							key={reporte.id}
							href={`/reportes/reporte/${reporte.id}`}
							className="link-dark link-underline-opacity-0 pt-1"
						>
							<div className="">
								<div className="">
									<Image
										width={100}
										height={100}
										src={reporte.imagen || '/images/defaultReporte.png'}
										alt={`ImagenReporte${reporte.id}`}
										loading="lazy"
										className="rounded-circle"
									/>
								</div>
								<div className="">
									<p className="text-secondary fw-lighter pt-3">
										Id: {reporte.id}
									</p>
									<p>
										Fecha reportada:{' '}
										{new Date(reporte.fechaCreada).toLocaleString()}
									</p>
									<p>
										Ubicación: {reporte.municipio.estado.nombre},{' '}
										{reporte.municipio.nombre}
									</p>
									<p>Descripción: {reporte.descripcion}</p>
								</div>
							</div>
						</Link>
					))
				) : (
					<center>
						<h3 className="mt-3">No se encontraron resultados</h3>
					</center>
				)}
			</div>
		</>
	);
}
