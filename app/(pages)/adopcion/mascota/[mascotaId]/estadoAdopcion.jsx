"use client"
import { useState } from "react";
import proceso from "../../mascota.module.css"
import { Dialog } from "@/components/dialogs";

export default function EstadoAdopcion({ userId, adopcionId, estadoAdopcion }) {
    const [estado, setEstado] = useState("");
    const { addToast } = useToast();

    const handleEstadoChange = (event) => {
        setEstado(event.target.value);
    };

    const handleGuardar = async () => {
        // Perform the database update or API call to save the estado value
        if (!estado) {
            addToast('Por favor, selecciona un estado', 'error');
        } else {
            try {
                console.log(JSON.stringify(parseInt(estado) ));
                // Make an HTTP PUT request to the API endpoint
                const response = await fetch('/api/estadoAdopcion', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ adopcionId, estado }),
                });

                if (response.ok) {
                    // Handle successful save
                    console.log('Estado saved successfully');
                    addToast('Estado de adopción actualizado', 'success');
                } else {
                    // Handle save error
                    console.log('Failed to save estado');
                    addToast('Error al actualizar el estado de adopción', 'error');
                }
            } catch (error) {
                console.error('An error occurred', error);
                addToast('Error al actualizar el estado de adopción', 'error');
            }
        }
    };

    return (
        <>
            <div className={proceso}>
                <br />
                <p>Estado: {estadoAdopcion}</p>
                <select onChange={handleEstadoChange}>
                    <option value="1">Procesando</option>
                    <option value="2">Aceptado</option>
                    <option value="3">Denegado</option>
                </select>
                <br />
                <center>
                    <button id="guardar" onClick={handleGuardar} className="btn btn-primary btn-lg">Guardar</button>
                </center>
            </div>
        </>
    )
}