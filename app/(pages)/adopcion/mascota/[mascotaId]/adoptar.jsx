"use client"
import { useState } from 'react';
import { Dialog } from "@/components/dialogs";
import { useRouter } from 'next/navigation';

export default function Adoptar({ mascotaId, adoptanteId }) {
    const [isAdoptarDialog, setIsAdoptarDialog] = useState(false);
    const [isAdopcionProcesadaDialog, setIsAdopcionProcesadaDialog] = useState(false);
    const [isAdopcionExistenteDialog, setIsAdopcionExistenteDialog] = useState(false);
    const [isErrorServidorDialog, setIsErrorServidorDialog] = useState(false);
    const [adoptando, setAdoptando] = useState(false);
    const router = useRouter();

    const handleAdoptarDialog = () => {
        setIsAdoptarDialog(true);
    };

    const handleAdoptar = async () => {
        setAdoptando(true);
        setIsAdoptarDialog(false);
        
        try {

            // Make an HTTP POST request to the sign-in API route
            const response = await fetch('/api/estadoAdopcion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mascotaId, adoptanteId }),
            });

            if (response.ok) {
                setIsAdopcionProcesadaDialog(true);
                router.replace("/perfil");
            } else {
                response.json().then((response) => console.log(response.error));
                setAdoptando(false);

                if (response.status === 400) {
                    setIsAdopcionExistenteDialog(true);
                }
                if (response.status === 500) {
                    console.error('An error occurred', error);
                    setIsErrorServidorDialog(true);
                }
            }
        } catch (error) {
            console.error('An error occurred', error);
            setIsErrorServidorDialog(true);
            setAdoptando(false);
        }
    };

    return (
        <>
            <button onClick={handleAdoptarDialog} className="btn btn-primary btn-lg" disabled={adoptando}>
                Adoptar
            </button>
            
            <Dialog
                id={"confirmarAdopcion"}
                confirmar
                fun={handleAdoptar}
                isOpen={isAdoptarDialog}
                onClose={() => setIsAdoptarDialog(false)}
            >
                <h1>Confirmar adopción</h1>
                <p>Estas a punto de adoptar una mascota</p>
                <p>Ten en mente que esta acción impactará en la vida de la mascota y la tuya</p>
                <br />
                <p>¿Estás seguro que deseas adoptar?</p>
            </Dialog>
            <Dialog
                id={"adopcionProcesada"}
                isOpen={isAdopcionProcesadaDialog}
                onClose={() => setIsAdopcionProcesadaDialog(false)}
            >
                <h1>Adopción en proceso</h1>
                <p>Proceda a recoger a la mascota en la sucursal que pertenece</p>
                <p>Tiene hasta 3 días para recogerlo o de otro modo su adopción será denegada</p>
            </Dialog>
            <Dialog
                id={"adopcionExistente"}
                isOpen={isAdopcionExistenteDialog}
                onClose={() => setIsAdopcionExistenteDialog(false)}
            >
                <h1>Error: Adopción existente</h1>
                <p>Ya se ha registrado una adopción con esta mascota</p>
            </Dialog>
            <Dialog
                id={"errorServidor"}
                isOpen={isErrorServidorDialog}
                onClose={() => setIsErrorServidorDialog(false)}
            >
                <h1>Error de servidor</h1>
                <p>Ocurrió un error de servidor</p>
                <p>Vuelve a intentar más tarde</p>
            </Dialog>
        </>
    );
}
