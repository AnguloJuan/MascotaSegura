"use client"
import { useState } from "react";
import proceso from "../../mascota.module.css"
import { Dialog } from "@/components/dialogs";

export default function EstadoAdopcion({ userId, adopcionId, estadoAdopcion }) {
    const [estado, setEstado] = useState("");
    const [isError, setIsError] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [isEstado, setIsEstado] = useState(false);

    const handleEstadoChange = (event) => {
        setEstado(event.target.value);
    };

    const handleGuardar = async () => {
        // Perform the database update or API call to save the estado value
        if (!estado) {
            setIsEstado(true);
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
                    setIsChanged(true);
                } else {
                    // Handle save error
                    console.log('Failed to save estado');
                    setIsError(true);
                }
            } catch (error) {
                console.error('An error occurred', error);
                // Handle error
                setIsError(true);
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

            <Dialog id={"isError"} isOpen={isError} onClose={() => setIsError(false)}>
                <h1>Error</h1>
                <p>Ha ocurrido un error de servidor</p>
                <p>Intentelo más tarde</p>
            </Dialog>
            <Dialog id={"isChanged"} isOpen={isChanged} onClose={() => setIsChanged(false)}>
                <h1>Cambio realizado</h1>
                <p>Se ha actualizado el proceso de adopción a {estado}</p>
            </Dialog>
            <Dialog id={"isEstado"} isOpen={isEstado} onClose={() => setIsEstado(false)}>
                <h1>Error de cambio</h1>
                <p>Reliza primero un cambio</p>
            </Dialog>
        </>
    )
}