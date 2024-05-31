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
	const [warningDialog, setWarningDialog] = useState(false);
	const [image, setImage] = useState(props.reporte.imagen);
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
			addToast('Valores invalidos', 'error');
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
				addToast('Reporte modificado', 'success');
				router.refresh();
			} else {
				response.json().then((res) => console.log(res.message));
				addToast('Error en el servidor', 'error');
				setUnmodified(true);
			}
		} catch (error) {
			console.log(error);
			addToast('Error en el servidor', 'error');
		}
	};

	const deleteReporte = async (e) => {
		setWarningDialog(false);
		const response = await fetch(`/api/reportes?id=${props.reporte.id}`, {
			method: 'DELETE',
		});
		if (response.status == 200) {
			addToast('Reporte eliminado', 'success');
			router.replace('/reportes');
		} else {
			response.json().then((res) => console.log(res.message));
			addToast('Error en el servidor', 'error');
		}
	};
	const warning = (e) => {
		e.preventDefault();
		setWarningDialog(true);
	};

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
								onFileUpload={(image) => {
									setImage(image),
										setUnmodified(false);
								}}
								accept="image/*, .jpg, .png, .svg, .webp, .jfif"
								image={image || '/images/defaultReporte.png'}
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

						{props.reporte.idReportador && (
							<CardUser items={props.reporte.reportador} />
						)}
					</div>
				</div>
			</form>

			<Dialog
				id={'warning'}
				isOpen={warningDialog}
				onClose={() => setWarningDialog(false)}
				fun={deleteReporte}
				confirmar={true}
				contenido={true}
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
