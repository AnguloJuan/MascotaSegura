"use client"
import { useState } from 'react';
import { Dialog } from "@/components/dialogs";

export default function Adoptar({ mascotaId, adoptanteId }) {
    const [isAdoptarDialogOpen, setIsAdoptarDialogOpen] = useState(false);
    const [isAdopcionProcesadaDialogOpen, setIsAdopcionProcesadaDialogOpen] = useState(false);
    const [isAdopcionExistenteDialogOpen, setIsAdopcionExistenteDialogOpen] = useState(false);
    const [isErrorServidorDialogOpen, setIsErrorServidorDialogOpen] = useState(false);

    const handleAdoptarDialog = () => {
        setIsAdoptarDialogOpen(true);
    };

    const handleAdoptar = async () => {
        setIsAdoptarDialogOpen(false);

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
                setIsAdopcionProcesadaDialogOpen(true);
            } else {
                response.json().then((response) => console.log(response.error));

                if (response.status === 400) {
                    setIsAdopcionExistenteDialogOpen(true);
                }
                if (response.status === 500) {
                    console.error('An error occurred', error);
                    setIsErrorServidorDialogOpen(true);
                }
            }
        } catch (error) {
            console.error('An error occurred', error);
            setIsErrorServidorDialogOpen(true);
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
                isOpen={isAdoptarDialogOpen}
                onClose={() => setIsAdoptarDialogOpen(false)}
            >
                <h1>Confirmar adopción</h1>
                <p>Estas a punto de adoptar una mascota</p>
                <p>Ten en mente que esta acción impactará en la vida del mascota y la tuya</p>
                <br />
                <p>¿Estás seguro que deseas adoptar?</p>
            </Dialog>
            <Dialog
                id={"adopcionProcesada"}
                isOpen={isAdopcionProcesadaDialogOpen}
                onClose={() => setIsAdopcionProcesadaDialogOpen(false)}
            >
                <h1>Adopción en proceso</h1>
                <p>Proceda a recoger a la mascota en la sucursal que pertenece</p>
                <p>Tiene hasta 3 días para recogerlo o de otro modo su adopción será denegada</p>
            </Dialog>
            <Dialog
                id={"adopcionExistente"}
                isOpen={isAdopcionExistenteDialogOpen}
                onClose={() => setIsAdopcionExistenteDialogOpen(false)}
            >
                <h1>Error: Adopción existente</h1>
                <p>Ya se ha registrado una adopción con esta mascota</p>
            </Dialog>
            <Dialog
                id={"errorServidor"}
                isOpen={isErrorServidorDialogOpen}
                onClose={() => setIsErrorServidorDialogOpen(false)}
            >
                <h1>Error de servidor</h1>
                <p>Ocurrió un error de servidor</p>
                <p>Vuelve a intentar más tarde</p>
            </Dialog>
        </>
    );
}
