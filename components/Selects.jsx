'use client'
import { useEffect, useState } from 'react';
import { Each } from './Each';

let cachedEspecies = [];
let cachedEstados = [];

async function fetchData(search) {
	await fetch(`/api/dataFetch?search=${search}`)
		.then((response) => response.json())
		.then((data) => {
			if (search === 'especies') cachedEspecies = data.data;
			else if (search === 'estados') cachedEstados = data.data;
		})
		.catch((error) => console.error('Error fetching data:', error));
}

export function Especies({ onChange, required, value, className }) {
	const [especies, setEspecies] = useState(cachedEspecies);
	useEffect(() => {
		async function fetchEspecies() {
			if (especies.length === 0)
				await fetchData('especies')
					.then(() => setEspecies(cachedEspecies));
		}
		fetchEspecies();
	}, []);

	return (
		<div className="flex flex-col gap-1 h-max">
			<label htmlFor="especies" className="font-bold">
				Especies {required ? '*' : ''}
			</label>
			<select
				id="especies"
				onChange={onChange}
				name="especie"
				required={required}
				value={value}
				className={`outline outline-2 py-2 px-4 rounded-lg max-w-full ${className}`}
			>
				<option value="">Selecciona Especie</option>
				{especies.map((especie) => (
					<option key={especie.id} value={especie.id}>
						{especie.especie}
					</option>
				))}
			</select>
		</div>
	);
}

export function Razas({
	onChange,
	razasInicial,
	selectedEspecie,
	value,
	required,
	disabled,
}) {
	const [razas, setRazas] = useState(razasInicial ? razasInicial : []);

	useEffect(() => {
		// Fetch razas data based on selected especie from the API
		if (selectedEspecie) {
			fetch(`/api/razas?especie=${selectedEspecie}`)
				.then((response) => response.json())
				.then((data) => setRazas(data.razas))
				.catch((error) => console.error('Error fetching razas:', error));
		}
	}, [selectedEspecie]);

	return (
		<>
			<Select
				id="raza"
				label="Raza"
				onChange={onChange}
				value={value ? value : value = 0}
				required={required}
				disabled={selectedEspecie == 0 || disabled ? true : false}
			>
				<option value={1}>Sin raza</option>
				{razas.length !== 0 && (
					<Each
						of={razas}
						render={(item) => (
							<option key={item.id} value={item.id}>
								{item.raza}
							</option>
						)}
					/>
				)}
			</Select>
		</>
	);
}

export function Sexos({ onChange, required, value, className }) {
	return (
		<div className="flex flex-col gap-1 h-max">
			<label htmlFor="sexo" className="font-bold">
				Sexo {required ? '*' : ''}
			</label>
			<select
				id="sexo"
				onChange={onChange}
				name="sexo"
				required={required}
				value={value}
				className={`outline outline-2 py-2 px-4 rounded-lg max-w-md ${className}`}
			>
				<option value="">Selecciona Sexo</option>
				<option value={1}>Macho</option>
				<option value={2}>Hembra</option>
			</select>
		</div>
	);
}
export function Tamanos({ onChange, required, value, className }) {
	return (
		<div className="flex flex-col gap-1 h-max">
			<label htmlFor="tamano" className="font-bold">
				Tamaño {required ? '*' : ''}
			</label>
			<select
				id="tamano"
				onChange={onChange}
				name="tamano"
				required={required}
				value={value}
				className={`outline outline-2 py-2 px-4 rounded-lg max-w-md ${className}`}
			>
				<option value="">Selecciona el tamaño</option>
				<option value={1}>No especificado</option>
				<option value={2}>Diminuto</option>
				<option value={3}>Pequeño</option>
				<option value={4}>Mediano</option>
				<option value={5}>Grande</option>
				<option value={6}>Enorme</option>
			</select>
		</div>
	);
}
export function EstadosReporte({
	onChange,
	required,
	value,
	className,
	disabled,
}) {
	return (
		<div className="flex flex-col gap-1 h-max">
			<label htmlFor="estadoReporte">
				Estado de Reporte {required ? '*' : ''}
			</label>
			<select
				id="estadoReporte"
				onChange={onChange}
				name="estadoReporte"
				required={required}
				value={value}
				disabled={disabled}
				className={`outline outline-2 p-2 rounded-lg max-w-md ${className}`}
			>
				<option value="">Selecciona el estado del reporte</option>
				<option value={1}>Reportado</option>
				<option value={2}>Confirmado</option>
				<option value={3}>En proceso</option>
				<option value={4}>Resuelto</option>
				<option value={5}>Falso</option>
			</select>
		</div>
	);
}

export function Estados({
	onChange,
	value,
	className,
	disabled,
	required,
	...props
}) {
	const [estados, setEstados] = useState(cachedEstados);
	useEffect(() => {
		async function fetchEstados() {
			if (estados.length === 0)
				await fetchData('estados')
					.then(() => setEstados(cachedEstados));
		}
		fetchEstados();
	}, []);

	return (
		<div className="flex flex-col gap-1 h-max">
			<label htmlFor="estado" className="font-bold">
				Estado {required ? '*' : ''}
			</label>
			<select
				id="estado"
				onChange={onChange}
				value={value ? value : 0}
				name="estado"
				disabled={disabled}
				required={required}
				className={`outline outline-2 py-2 px-4 rounded-lg max-w-md ${className}`}
				{...props}
			>
				<option value="">Selecciona Estado</option>
				{estados.map((estado) => (
					<option key={estado.id} value={estado.id}>
						{estado.nombre}
					</option>
				))}
			</select>
		</div>
	);
}

export function Municipios({
	onChange,
	municipiosInicial,
	selectedEstado,
	value,
	required,
	disabled,
}) {
	const [municipios, setMunicipios] = useState(municipiosInicial ? municipiosInicial : []);
	useEffect(() => {
		// Fetch municipios data based on selected estado from the API
		if (selectedEstado) {
			fetch(`/api/municipios?estado=${selectedEstado}`)
				.then((response) => response.json())
				.then((data) => setMunicipios(data.municipios))
				.catch((error) => console.error('Error fetching municipios:', error));
		}
	}, [selectedEstado]);

	return (
		<>
			<Select
				id="municipio"
				label="Municipio"
				onChange={onChange}
				required={required}
				value={value ? value : 0}
				disabled={selectedEstado == 0 || disabled ? true : false}
			>
				<Each
					of={municipios}
					render={(item) => (
						<option key={item.id} value={item.id}>
							{item.nombre}
						</option>
					)}
				/>
			</Select>
		</>
	);
}

export function Select({
	id,
	onChange,
	label,
	placeholder,
	className,
	items,
	children,
	disabled = false,
	required = false,
	value,
	...props
}) {
	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label htmlFor={id} className="font-bold">
					{label} {required ? '*' : ''}
				</label>
			)}
			<select
				id={id}
				onChange={onChange}
				name={id}
				className={`outline outline-2 py-2 px-4 rounded-lg max-w-md bg-white ${className} `}
				disabled={disabled}
				required={required}
				value={value}
				{...props}
			>
				<option value="">{placeholder || 'Selecciona una opcion'}</option>
				{items ? (
					<Each
						of={items}
						render={(item, index) => (
							<>
								<option key={index} value={index + 1}>
									{item}
								</option>
							</>
						)}
					/>
				) : (
					children
				)}
			</select>
		</div>
	);
}
