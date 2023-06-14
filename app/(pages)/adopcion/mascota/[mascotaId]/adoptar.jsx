"use client"
import { useState } from 'react';
import { Dialog } from "@/components/dialogs";

export default function Adoptar({ mascotaId, adoptanteId }) {
    const [isAdoptar, setIsAdoptar] = useState(false);
    const [isAdopcionProcesada, setIsAdopcionProcesada] = useState(false);
    const [isAdopcionExistente, setIsAdopcionExistente] = useState(false);
    const [isErrorServidor, setIsErrorServidor] = useState(false);

    const handleAdoptarDialog = () => {
        setIsAdoptar(true);
    };

    const handleAdoptar = async () => {
        setIsAdoptar(false);

        try {

            // Make an HTTP POST request to the sign-in API route
            const response = await fetch('/api/adopcion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mascotaId, adoptanteId }),
            });

            if (response.ok) {
                setIsAdopcionProcesada(true);
            } else {
                response.json().then((response) => console.log(response.error));

                if (response.status === 400) {
                    setIsAdopcionExistente(true);
                }
                if (response.status === 500) {
                    console.error('An error occurred', error);
                    setIsErrorServidor(true);
                }
            }
        } catch (error) {
            console.error('An error occurred', error);
            setIsErrorServidor(true);
        }
    };

    return (
        <>
            <button onClick={handleAdoptarDialog} className="btn btn-primary">
                Adoptar
            </button>
            
            <Dialog
                id={"confirmarAdopcion"}
                confirmar
                fun={handleAdoptar}
                isOpen={isAdoptar}
                onClose={() => setIsAdoptar(false)}
            >
                <h1>Confirmar adopción</h1>
                <p>Estas a punto de adoptar una mascota</p>
                <p>Ten en mente que esta acción impactará en la vida del mascota y la tuya</p>
                <br />
                <p>¿Estás seguro que deseas adoptar?</p>
            </Dialog>
            <Dialog
                id={"adopcionProcesada"}
                isOpen={isAdopcionProcesada}
                onClose={() => setIsAdopcionProcesada(false)}
            >
                <h1>Adopción en proceso</h1>
                <p>Proceda a recoger a la mascota en la sucursal que pertenece</p>
                <p>Tiene hasta 3 días para recogerlo o de otro modo su adopción será denegada</p>
            </Dialog>
            <Dialog
                id={"adopcionExistente"}
                isOpen={isAdopcionExistente}
                onClose={() => setIsAdopcionExistente(false)}
            >
                <h1>Error: Adopción existente</h1>
                <p>Ya se ha registrado una adopción con esta mascota</p>
            </Dialog>
            <Dialog
                id={"errorServidor"}
                isOpen={isErrorServidor}
                onClose={() => setIsErrorServidor(false)}
            >
                <h1>Error de servidor</h1>
                <p>Ocurrió un error de servidor</p>
                <p>Vuelve a intentar más tarde</p>
            </Dialog>
        </>
    );
}
