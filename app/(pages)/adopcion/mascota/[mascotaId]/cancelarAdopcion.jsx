'use client';
import { useState } from 'react';
import { Dialog } from '@/components/dialogs';
import { useRouter } from 'next/navigation';
import Input from '@/components/Inputs';

export default function Cancelar({ idAdopcion, idAdoptante, idMascota }) {
	const [cancelDialog, setCancelDialog] = useState(false);
	const [errorDialog, setErrorDialog] = useState(false);
	const [warningDialog, setWarningDialog] = useState(false);
	const [cancelando, setCancelando] = useState(false);
	const [motivo, setMotivo] = useState('');
	const router = useRouter();

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
				setCancelDialog(true);
				router.refresh();
			} else {
				if (response.status === 400) {
					setIsAdopcionExistenteDialog(true);
				}
				if (response.status === 500) {
					console.error('An error occurred', error);
					setErrorDialog(true);
				}
				setCancelando(false);
				response.json().then((response) => console.log(response.error));
			}
		} catch (error) {
			console.error('An error occurred', error);
			setErrorDialog(true);
			setCancelando(false);
		}
	};

	return (
		<>
			<div className="d-flex flex-column w-100">
				<label htmlFor="motivo">
					Motivo de cancelación{' '}
					<span className="text-secondary fw-light">(No es obligatorio)</span>
				</label>
				<textarea
					name="motivo"
					id="motivo"
					rows="5"
					onChange={(e) => {
						e.preventDefault(), setMotivo(e.target.value);
					}}
					className="form-control w-100 rounded"
				></textarea>
				<button
					type="button"
					onClick={() => setWarningDialog(true)}
					className="btn btn-danger btn-lg mt-4"
					disabled={cancelando}
				>
					Cancelar adopción
				</button>
			</div>

			<Dialog
				id={'warningDialog'}
				confirmar
				fun={handleCancelar}
				isOpen={warningDialog}
				onClose={() => setWarningDialog(false)}
			>
				<h3>Confirmar cancelación</h3>
				<p>¿Estas seguro que va a cancelar la adopción?</p>
				<p>Haga click en confirmar para continuar</p>
			</Dialog>
			<Dialog
				id={'adopcionProcesada'}
				isOpen={cancelDialog}
				onClose={() => setCancelDialog(false)}
			>
				<h3>Adopción cancelada</h3>
				<p>La Adopción ha sido cancelada con exito</p>
			</Dialog>
			<Dialog
				id={'errorServidor'}
				isOpen={errorDialog}
				onClose={() => setErrorDialog(false)}
			>
				<h3>Error de servidor</h3>
				<p>Ocurrió un error de servidor</p>
				<p>Vuelve a intentar más tarde</p>
			</Dialog>
		</>
	);
}
