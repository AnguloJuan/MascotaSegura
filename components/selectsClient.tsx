"use client"

import { municipio } from "@prisma/client";
import React from "react";
import { useEffect, useState } from "react";

export function Municipios({ handleChange, municipiosInicial, selectedEstado, value, disabled }: {
    handleChange: React.ChangeEventHandler<HTMLSelectElement>,
    municipiosInicial?: Array<municipio>,
    selectedEstado: number,
    value: number,
    disabled?: boolean
}) {
    const [municipios, setMunicipios] = useState(Array<municipio>);
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
            <select
                id="municipio"
                onChange={handleChange}
                value={value ? value : 0}
                name="municipio"
                className="rounded py-1.5 px-3 border-2 border-gray-400 border-opacity-75 focus:border-cyan-400 focus:border-opacity-100 focus:outline-0 focus:shadow-lg focus:ring-2 transition-color transition ease-in cursor-pointer"
                disabled={(selectedEstado == 0 || disabled) ? true : false}>

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