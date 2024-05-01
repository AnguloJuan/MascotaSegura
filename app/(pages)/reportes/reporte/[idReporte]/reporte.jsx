'use client';
// import InputLabel from '@/components/Inputs';
import style from '../../reporte.module.css';
import { useState } from 'react';
import { Dialog } from '@/components/dialogs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Estados, EstadosReporte } from '@/components/Selects';
import { Municipios } from '@/components/SelectsClient';
import Link from 'next/link';

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
	const [createObjectURL, setCreateObjectURL] = useState(null);
	const router = useRouter();

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
		e.target.value
			? (document.getElementById('municipio').disabled = false)
			: (document.getElementById('municipio').disabled = true);
	};
	//actualizacion de imagen
	const uploadToClient = (event) => {
		if (event.target.files && event.target.files[0]) {
			setUnmodified(false);
			const i = event.target.files[0];

			setImage(i);
			setCreateObjectURL(URL.createObjectURL(i));
		}
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
				//subir imagen a cloudinary
				body.set('file', image);
				body.set('upload_preset', 'mascotaSegura');

				const data = await fetch(
					'https://api.cloudinary.com/v1_1/dyvwujin9/image/upload',
					{
						method: 'POST',
						body,
					}
				).then((r) => r.json());

				body.set('image', data.secure_url);
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
			setErrorDialog(true);
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
					<h1>Información del reporte</h1>
					<div className="datos-reporte">
						<center>
							<div className={style.perfil}>
								{image ? (
									<Image
										width={200}
										height={200}
										src={createObjectURL}
										alt={`Uploaded Image`}
										className="rounded-top"
									/>
								) : props.reporte.imagen ? (
									<Image
										width={250}
										height={250}
										src={props.reporte.imagen}
										alt={`ImagenReporte${props.reporte.id}`}
										className="rounded-top"
									/>
								) : (
									<Image
										width={250}
										height={250}
										src={'/images/defaultReporte.png'}
										alt="DefaultIcon"
										className="rounded-top"
									/>
								)}
								<input
									id="perfil"
									type="file"
									name="perfil"
									onChange={uploadToClient}
									accept="image/*, .jpg, .png, .svg, .webp, .jfif"
									className="form-control"
								/>
							</div>
						</center>
						{/* <InputLabel
							id={'fecRegistro'}
							type={'date'}
							label={'Fecha de registro'}
							name={'fechaRegistro'}
							value={reporte.fechaCreada}
							onChange={handleInputChange}
							disabled
						/> */}

						<div className="input mb-3 mt-3">
							<label htmlFor="estado" className="form-label">
								Estado
							</label>
							<Estados
								handleChange={handleEstadoChange}
								estados={props.estados}
								value={reporte.estado}
							/>
						</div>
						<div className="input mb-3 mt-3">
							<label htmlFor="municipio" className="form-label">
								Municipio
							</label>
							<Municipios
								handleChange={handleInputChange}
								municipiosInicial={props.municipios}
								selectedEstado={reporte.estado}
								value={reporte.municipio}
							/>
						</div>
						<div className="input mb-3 mt-3">
							<label htmlFor="descripcion" className="form-label">
								Descripción
							</label>
							<textarea
								name="descripcion"
								id="descripcion"
								rows="5"
								placeholder="Descripción"
								onChange={handleInputChange}
								value={reporte.descripcion}
								className="form-control"
							></textarea>
						</div>

						<EstadosReporte
							handleChange={handleInputChange}
							value={reporte.estadoReporte}
						/>

						<center className="my-3">
							<button
								className="btn btn-primary m-2 btn-lg"
								type="submit"
								disabled={unmodified}
								onClick={modifyReporte}
							>
								Guardar
							</button>
							<button
								type="submit"
								className="btn btn-danger btn-lg"
								onClick={warning}
							>
								Eliminar reporte
							</button>
						</center>

						{props.reporte.idReportador ? (
							<>
								{/* Muestra adoptante */}
								<div className="border p-2 rounded mb-4">
									<Link
										href={`/adoptantes/adoptante/${props.reporte.reportador.id}`}
										className="link-dark link-underline-opacity-0"
									>
										<div className={'d-flex align-items-center'}>
											<div className={'rounded my-2 bg-body-light'}>
												{props.reporte.reportador.imagen ? (
													<Image
														src={props.reporte.reportador.imagen}
														alt="userImage"
														width={200}
														height={200}
													/>
												) : (
													<Image
														src={'/images/defaultUser.png'}
														alt="defaultUser.png"
														width={200}
														height={200}
													/>
												)}
											</div>
											<div
												className={'d-flex flex-column justify-content-between'}
											>
												<h3>Persona reportante</h3>
												<p>id: {props.reporte.reportador.id}</p>
												<p>Nombre: {props.reporte.reportador.nombre}</p>
												<p>correo: {props.reporte.reportador.correo}</p>
											</div>
										</div>
									</Link>
								</div>
							</>
						) : (
							<>
								<div
									className={
										'd-flex flex-column justify-content-between border rounded p-4'
									}
								>
									<h3>Persona reportante</h3>
									<p>Nombre: {props.reporte.nombre}</p>
									<p>correo: {props.reporte.correo}</p>
								</div>
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
