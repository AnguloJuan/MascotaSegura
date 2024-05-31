'use client';
import { useState } from 'react';
import { Dialog } from '@/components/dialogs';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { useToast } from '@/components/Toast';

export default function Cancelar({ idAdopcion, idAdoptante, idMascota }) {
	const [warningDialog, setWarningDialog] = useState(false);
	const [cancelando, setCancelando] = useState(false);
	const [motivo, setMotivo] = useState('');
	const router = useRouter();
	const { addToast } = useToast();

	const handleCancelar = async () => {
		setWarningDialog(false);
		setCancelando(true);

		try {
			const params = JSON.stringify({
				idAdopcion,
				idAdoptante,
				idMascota,
				motivo,
			});
			// Make an HTTP POST request to the sign-in API route
			const response = await fetch(`/api/estadoAdopcion?params=${params}`, {
				method: 'DELETE',
			});

			if (response.status === 200) {
				addToast('Adopción cancelada con éxito', 'success');
				setCancelDialog(true);
				router.refresh();
			} else {
				if (response.status === 400) {
					addToast('Ya se ha registrado una adopción con esta mascota', 'error');
				}
				if (response.status === 500) {
					console.error('An error occurred', error);
					addToast('Error de servidor', 'error');
				}
				setCancelando(false);
				response.json().then((response) => console.log(response.error));
			}
		} catch (error) {
			console.error('An error occurred', error);
			addToast('Error de servidor', 'error');
			setCancelando(false);
		}
	};

	return (
		<>
			<div>
				<label htmlFor="motivo">
					Motivo de cancelación
					<span className="text-secondary fw-light">(No es obligatorio)</span>
				</label>
				<textarea
					name="motivo"
					id="motivo"
					rows="5"
					onChange={(e) => {
						e.preventDefault(), setMotivo(e.target.value);
					}}
					className="py-2 px-4 w-full rounded-lg border-black border-2 
                        focu:outline outline-primary outline-offset-4 resize-none"
				></textarea>
				<Button
					type="button"
					onClick={() => setWarningDialog(true)}
					className="bg-red-500 hover:bg-red-400"
					disabled={cancelando}
				>
					Cancelar adopción
				</Button>
			</div>

			<Dialog
				id={'warningDialog'}
				confirmar={true}
				fun={handleCancelar}
				isOpen={warningDialog}
				contenido={true}
				onClose={() => setWarningDialog(false)}
			>
				<h3>Confirmar cancelación</h3>
				<p>¿Estas seguro que va a cancelar la adopción?</p>
				<p>Haga click en confirmar para continuar</p>
			</Dialog>
		</>
	);
}
