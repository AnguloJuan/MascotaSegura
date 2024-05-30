'use client';

import { useState } from 'react';
import { Dialog } from '@/components/dialogs';
import { useRouter } from 'next/navigation';
import { Estados, EstadosReporte } from '@/components/Selects';
import { Municipios } from '@/components/Selects';
import { InputFile } from '@/components/Inputs';
import postImage from '@/app/lib/cloudinaryActions';
import Button from '@/components/Button';
import { useToast } from '@/components/Toast';
import CardUser from '@/components/CardUser';

export default function Reporte({ props }) {
	const [reporte, setReporte] = useState({
		descripcion: props.reporte.descripcion,
		fechaCreada: props.date,
		estado: props.reporte.municipio.idEstado,
		municipio: props.reporte.municipio.id,
		estadoReporte: props.reporte.estadoReporte.id,
	});
	const [unmodified, setUnmodified] = useState(true);
	const [invalidFieldsDialog, setInvalidFieldsDialog] = useState(false);
	const [modifiedDialog, setModifiedDialog] = useState(false);
	const [errorDialog, setErrorDialog] = useState(false);
	const [unmodifiedDialog, setUnmodifiedDialog] = useState(false);
	const [deletedDialog, setDeletedDialog] = useState(false);
	const [warningDialog, setWarningDialog] = useState(false);
	const [image, setImage] = useState(null);
	const router = useRouter();
	const { addToast } = useToast();

	const handleInputChange = (e) => {
		setUnmodified(false);
		const { name, value } = e.target;
		setReporte((prevCriteria) => ({ ...prevCriteria, [name]: value }));
	};
	const handleEstadoChange = (e) => {
		setUnmodified(false);
		const { name, value } = e.target;
		setReporte((prevCriteria) => ({ ...prevCriteria, [name]: value }));
		// Reset selected municipio when estado reporte
		setReporte((prevCriteria) => ({ ...prevCriteria, municipio: 0 }));
	};

	const modifyReporte = async (e) => {
		e.preventDefault();

		if (!reporte.municipio || !reporte.estadoReporte) {
			setInvalidFieldsDialog(true);
			return;
		}
		try {
			const body = new FormData();
			body.set('reporte', JSON.stringify(reporte));
			body.set('reporteInit', JSON.stringify(props.reporte));

			if (image) {
				body.set('image', await postImage(body, image));
			} else {
				body.set('image', null);
			}

			const response = await fetch('/api/reportes', {
				method: 'PUT',
				body,
			});
			if (response.status == 200) {
				setModifiedDialog(true);
				router.refresh();
			} else {
				response.json().then((res) => console.log(res.message));
				setErrorDialog(true);
				setUnmodified(true);
			}
		} catch (error) {
			console.log(error);
			setErrorDialog(true);
		}
	};

	const deleteReporte = async (e) => {
		setWarningDialog(false);
		const response = await fetch(`/api/reportes?id=${props.reporte.id}`, {
			method: 'DELETE',
		});
		if (response.status == 200) {
			setDeletedDialog(true);
			router.replace('/reportes');
		} else {
			response.json().then((res) => console.log(res.message));
			addToast('', 'error');
			setErrorDialog(true);
		}
	};
	const warning = (e) => {
		e.preventDefault();
		setWarningDialog(true);
	};

	console.log(props.reporte.reportador);
	return (
		<>
			<form className="m-3">
				<div className="perfilEmpleado">
					<h1 className="text-4xl">Información del reporte</h1>
					<div className="datos-reporte">
						<div className="flex gap-5">
							<InputFile
								id="perfil"
								type="file"
								name="perfil"
								onFileUpload={(image) => setImage(image)}
								accept="image/*, .jpg, .png, .svg, .webp, .jfif"
							/>
							<div className="space-y-5">
								<div className="flex gap-5">
									<Estados
										onChange={handleEstadoChange}
										value={reporte.estado}
									/>
									<Municipios
										onChange={handleInputChange}
										municipiosInicial={props.municipios}
										selectedEstado={reporte.estado}
										value={reporte.municipio}
									/>
									<EstadosReporte
										onChange={handleInputChange}
										value={reporte.estadoReporte}
									/>
								</div>
								<textarea
									name="descripcion"
									id="descripcion"
									type="textarea"
									rows="5"
									placeholder="Descripción"
									onChange={handleInputChange}
									value={reporte.descripcion}
									className="py-2 px-4 w-full rounded-lg border-black border-2 focu:outline outline-primary outline-offset-4 resize-none"
								/>
							</div>
						</div>
						<div className="flex justify-center gap-5">
							<Button
								type="submit"
								disabled={unmodified}
								onClick={modifyReporte}
							>
								Guardar
							</Button>
							<Button
								type="submit"
								className="bg-red-600 hover:bg-red-500"
								onClick={warning}
							>
								Eliminar
							</Button>
						</div>

						{props.reporte.idReportador ? (
							<CardUser items={props.reporte.reportador} />
						) : (
							<>
								<CardUser items={props.reporte.reportador} />
							</>
						)}
					</div>
				</div>
			</form>

			<Dialog
				id={'invalidField'}
				isOpen={invalidFieldsDialog}
				onClose={() => setInvalidFieldsDialog(false)}
			>
				<h1>Error valores invalidos</h1>
				<p>No se pueden modificar datos con valores invalidos</p>
				<p>
					En los campos estado, municipio, y Estado reporte debe haber
					seleccionado una opción
				</p>
			</Dialog>
			<Dialog
				id={'unmodified'}
				isOpen={unmodifiedDialog}
				onClose={() => setUnmodifiedDialog(false)}
			>
				<h1>Error de modificación</h1>
				<p>No se ha registrado ningun cambio</p>
			</Dialog>
			<Dialog
				id={'modified'}
				isOpen={modifiedDialog}
				onClose={() => setModifiedDialog(false)}
			>
				<h1>Se han guardado los cambios</h1>
				<p>Los cambios han sido guardados correctamente en la base de datos</p>
			</Dialog>
			<Dialog
				id={'error'}
				isOpen={errorDialog}
				onClose={() => setErrorDialog(false)}
			>
				<h1>Error de servidor</h1>
				<p>Ha ocurrido un error en el servidor</p>
				<p>Vuelva a intentarlo más tarde</p>
			</Dialog>
			<Dialog
				id={'deleted'}
				isOpen={deletedDialog}
				onClose={() => setDeletedDialog(false)}
			>
				<h1>Reporte Eliminado</h1>
				<p>Se ha eliminado el reporte de la pagina</p>
				<p>Sera redirigido a la pagina reportes</p>
			</Dialog>
			<Dialog
				id={'warning'}
				isOpen={warningDialog}
				onClose={() => setWarningDialog(false)}
				fun={deleteReporte}
				confirmar={true}
			>
				<h1>Advertencia</h1>
				<p>
					Estas apunto de eliminar a un reporte de la pagina
					<br />
					Esta accion sera irreversible
				</p>
				<p>Haga clic en confirmar para continuar</p>
			</Dialog>
		</>
	);
}
