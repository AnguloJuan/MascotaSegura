'use client';
import { useState } from 'react';
import { Dialog } from '@/components/dialogs';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { useToast } from '@/components/Toast';

export default function Adoptar({ mascotaId, adoptanteId }) {
	const [isAdoptarDialog, setIsAdoptarDialog] = useState(false);
	const [isAdopcionProcesadaDialog, setIsAdopcionProcesadaDialog] =
		useState(false);
	const [isAdopcionExistenteDialog, setIsAdopcionExistenteDialog] =
		useState(false);
	const [isErrorServidorDialog, setIsErrorServidorDialog] = useState(false);
	const [adoptando, setAdoptando] = useState(false);
	const router = useRouter();
	const { addToast } = useToast();

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
				addToast(
					'Proceda a recoger a la mascota en la sucursal que pertenece',
					'success'
				);
				router.replace('/perfil');
			} else {
				response.json().then((response) => console.log(response.error));
				setAdoptando(false);

				if (response.status === 400) {
					addToast(
						'Ya se ha registrado una adopción con esta mascota',
						'error'
					);
				}
				if (response.status === 500) {
					console.error('An error occurred', error);
					setIsErrorServidorDialog(true);
					addToast('Ocurrió un error de servidor', 'error');
				}
			}
		} catch (error) {
			console.error('An error occurred', error);
			setIsErrorServidorDialog(true);
			addToast('Ocurrió un error de servidor', 'error');
			setAdoptando(false);
		}
	};

	return (
		<>
			<Button
				onClick={handleAdoptarDialog}
				text="Adoptar"
				disabled={adoptando}
			/>

			<Dialog
				id={'confirmarAdopcion'}
				confirmar
				fun={handleAdoptar}
				isOpen={isAdoptarDialog}
				onClose={() => setIsAdoptarDialog(false)}
				encabezado={'Confirmar adopción'}
				contenido={
					<>
						<p>
							Estas a punto de adoptar una mascota Ten en mente que esta acción
							impactará en la vida de la mascota y la tuya
						</p>
						<p>¿Estás seguro que deseas adoptar?</p>
					</>
				}
			/>
		</>
	);
}
