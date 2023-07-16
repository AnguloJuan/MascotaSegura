"use client"

import { useEffect, useState } from "react";

export function Municipios({ handleChange, municipiosInicial, selectedEstado, value }) {
    const [municipios, setMunicipios] = useState([]);
    useEffect(() => {
        if (municipiosInicial) {
            console.log(municipiosInicial);
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
            <label htmlFor="municipio">Municipio:</label>
            <select
                id="municipio"
                onChange={handleChange}
                value={value ? value : 0}
                name="municipio"
                className="form-select"
                disabled={selectedEstado == 0 ? true : false}>

                <option value="">Selecciona Municipio</option>
                {/* Render municipio options based on selected estado */}
                {municipios.map((municipio) => (
                    <option key={municipio.id} value={municipio.id}>
                        {municipio.nombre}
                    </option>
                ))}
            </select>
        </>
    )
}