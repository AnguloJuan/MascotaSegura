'use client';

import { useEffect, useState } from 'react';
import { Select } from './Selects';
import { Each } from './Each';

export function Municipios({
	handleChange,
	municipiosInicial,
	selectedEstado,
	value,
	disabled,
}) {
	const [municipios, setMunicipios] = useState([]);
	useEffect(() => {
		if (municipiosInicial) {
			setMunicipios(municipiosInicial);
		}
	}, []);

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
				onChange={handleChange}
				value={value ? value : 0}
				disabled={selectedEstado == 0 || disabled ? true : false}
			>
				{/* Render municipio options based on selected estado */}
				<option value="">Selecciona Municipio</option>
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
