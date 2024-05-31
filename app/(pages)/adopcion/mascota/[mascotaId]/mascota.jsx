'use client';
import rescate from './rescate.module.css';
import { Checkbox, Input, InputFile } from '@/components/Inputs';
import { Especies, Razas, Select, Sexos, Tamanos } from '@/components/Selects';
import { Dialog } from '@/components/dialogs';
import DescargarDocumentoAdopcion from './documentoAdopcion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cancelar from './cancelarAdopcion';
import postImage from '@/app/lib/cloudinaryActions';
import CardUser from '@/components/CardUser';
import Button from '@/components/Button';
import { useToast } from '@/components/Toast';

export default function MascotaPage({ mascotaInicial }) {
	const [mascota, setMascota] = useState({
		id: mascotaInicial.id,
		nombre: mascotaInicial.nombre,
		especie: mascotaInicial.especie.id,
		raza: mascotaInicial.raza ? mascotaInicial.raza.id : 0,
		edad: mascotaInicial.edad,
		sexo: mascotaInicial.sexo.id,
		tamano: mascotaInicial.idTamano,
		maltratado: mascotaInicial.maltratado,
		motivo: mascotaInicial.motivo,
		cartilla: mascotaInicial.cartilla,
		estadoAdopcion: mascotaInicial.adopcion
			? mascotaInicial.adopcion.estadoAdopcion.id
			: null,
		imagen: mascotaInicial.imagen,
		adopcion: mascotaInicial.adopcion,
	});
	const estado = mascotaInicial.adopcion ? mascotaInicial.adopcion.estadoAdopcion.estadoAdopcion : null;

	const [image, setImage] = useState(null);
	const [warningDialog, setWarningDialog] = useState(false);
	const [unmodified, setUnmodified] = useState(true);

	const { addToast } = useToast();
	const router = useRouter();

	//manejo de cambios en el formulario
	const handleInputChange = (e) => {
		setUnmodified(false);
		const { name, value } = e.target;
		if (name == 'edad' && value < 0) {
			return;
		}
		setMascota((prevMascota) => ({ ...prevMascota, [name]: value }));
	};
	const handleTernary = (e) => {
		let value;
		setUnmodified(false);
		if (e.target.name == 'maltratado') {
			value = mascota.maltratado
				? (mascota.maltratado = false)
				: (mascota.maltratado = true);
			setMascota((prevCriteria) => ({ ...prevCriteria, maltratado: value }));
		} else if (e.target.name == 'cartilla') {
			value = mascota.cartilla
				? (mascota.cartilla = false)
				: (mascota.cartilla = true);
			setMascota((prevCriteria) => ({ ...prevCriteria, cartilla: value }));
		}
	};

	//registro de mascota
	const uploadToServer = async (e) => {
		e.preventDefault();
		if (
			!mascota.nombre ||
			!mascota.especie ||
			!mascota.sexo ||
			!mascota.tamano ||
			mascota.edad < 0
		) {
			addToast('Error valores invalidos', 'error');
		} else {
			const body = new FormData();
			BigInt.prototype.toJSON = function () {
				return this.toString();
			};
			body.set('mascota', JSON.stringify(mascota));
			body.set('mascotaInicial', JSON.stringify(mascotaInicial));

			if (image) {
				body.set('image', await postImage(body, image));
			} else {
				body.set('image', null);
			}

			const response = await fetch('/api/mascotas', {
				method: 'PUT',
				body,
			});
			if (response.status == 200) {
				addToast('Cambios guardados', 'success');
				router.refresh();
				setUnmodified(true);
			} else {
				response.json().then((res) => console.log(res.message));
				addToast('Error en el servidor', 'error');
			}
		}
	};
	const deleteMascota = async (e) => {
		setWarningDialog(false);
		const response = await fetch(`/api/mascotas?id=${mascota.id}`, {
			method: 'DELETE',
		});
		if (response.status == 200) {
			addToast('Mascota eliminada', 'success');
			router.replace('/rescate');
		} else if (response.status == 409) {
			addToast('Error al eliminar mascota, la mascota esta adoptada, cancele adoción antes de eliminar', 'error');
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
			<form className="space-y-5">
				<div className="flex gap-5 items-center justify-center">
					<InputFile
						id="perfil"
						type="file"
						name="perfil"
						onFileUpload={(image) => {
							setImage(image);
							setUnmodified(false);
						}}
						accept="image/*, .jpg, .png, .svg, .webp, .jfif"
						className="mx-auto"
						image={mascota.imagen || '/images/dogIcon.png'}
					/>
					<div className="space-y-5">
						<div className="flex gap-3">
							<div>
								<label htmlFor="nombre" className="font-bold">
									Nombre *
								</label>
								<Input
									type="text"
									placeholder="Nombre"
									name="nombre"
									onChange={handleInputChange}
									value={mascota.nombre}
									className="form-control"
									required={true}
								/>
							</div>
							<Especies
								onChange={handleInputChange}
								value={mascota.especie}
								required={true}
							/>
							<Razas
								onChange={handleInputChange}
								value={mascota.raza}
								selectedEspecie={mascota.especie}
							/>
						</div>
						<div className="flex gap-3">
							<div>
								<label htmlFor="edad" className="font-bold">
									Edad *
								</label>
								<Input
									id={'edad'}
									type={'number'}
									label={'Edad'}
									placeholder={'edad'}
									name={'edad'}
									value={mascota.edad}
									onChange={handleInputChange}
								/>
							</div>

							<div className={rescate.busqueda}>
								<Sexos
									onChange={handleInputChange}
									value={mascota.sexo}
									required={true}
								/>
							</div>

							<div className={rescate.busqueda}>
								<Tamanos onChange={handleInputChange} value={mascota.tamano} />
							</div>
						</div>
						<div className={rescate.cartilla}>
							<Checkbox
								type="checkbox"
								name="maltratado"
								id="maltratado"
								text="Ha sido maltratado?"
								checked={mascota.maltratado}
								onChange={handleTernary}
								className="form-check-input ms-2"
							/>
							<Checkbox
								type="checkbox"
								name="cartilla"
								id="cartilla"
								text="Cuenta con cartilla de vacunación?"
								checked={mascota.cartilla}
								onChange={handleTernary}
								className="form-check-input ms-2"
							/>
						</div>
						<div>
							{mascotaInicial.adopcion && (
								<div className="space-y-3">
									<label htmlFor="estadoAdopcion" className="space-x-3">
										<span>Estado adopción</span>
										<span
											className={`${estado.toLowerCase() == 'aceptado'
													? 'bg-green-500'
													: estado.toLowerCase() == 'procesando'
														? 'bg-yellow-500'
														: 'bg-red-500'
												} p-1 rounded-lg text-white`}
										>
											{estado}
										</span>
									</label>
									<Select
										id="estadoAdopcion"
										name="estadoAdopcion"
										onChange={handleInputChange}
										value={mascota.estadoAdopcion}
										className="form-select mb-4"
									>
										<option value="1">Aceptado</option>
										<option value="3">Procesando</option>
										<option value="2">Cancelado</option>
									</Select>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="flex justify-center gap-5 py-9">
					<Button
						className="bg-red-500 hover:bg-red-400"
						onClick={warning}
						type="submit"
					>
						Eliminar mascota
					</Button>
					<Button type="submit" disabled={unmodified} onClick={uploadToServer}>
						Guardar cambios
					</Button>
				</div>

				{mascotaInicial.adopcion && (
					<>
						<h3>Proceso de adopción</h3>
						<CardUser items={mascotaInicial.adopcion.adoptante} />

						<Cancelar
							idAdopcion={mascotaInicial.adopcion.id}
							idAdoptante={mascotaInicial.adopcion.idAdoptante}
							idMascota={mascotaInicial.id}
						/>

						<DescargarDocumentoAdopcion mascota={mascotaInicial} />

						{(mascotaInicial.motivo ||
							mascotaInicial.historialAdoptivo.length !== 0) && (
								<div>
									<h2 className="text-4xl">Anteriores adopciones</h2>
									<h3 className="text-2xl">Motivos de abandono</h3>
									{mascotaInicial.motivo && <p>{mascotaInicial.motivo}</p>}

									{mascotaInicial.historialAdoptivo.length !== 0 &&
										mascotaInicial.historialAdoptivo.map(
											(historial) =>
												historial.motivo && (
													<p key={historial.id} className="border rounded">
														- {historial.motivo}
													</p>
												)
										)}
								</div>
							)}
					</>
				)}
			</form>

			<Dialog
				id={'warning'}
				isOpen={warningDialog}
				onClose={() => setWarningDialog(false)}
				fun={deleteMascota}
				confirmar={true}
				contenido={true}
			>
				<h3>Advertencia</h3>
				<p>
					Estas apunto de eliminar a una mascota de la pagina
					<br />
					Esta acción sera irreversible
				</p>
				<p>Haga clic en confirmar para continuar</p>
			</Dialog>
		</>
	);
}
