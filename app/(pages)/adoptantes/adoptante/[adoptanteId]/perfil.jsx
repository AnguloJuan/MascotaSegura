'use client';
import { Input, InputFile } from '@/components/Inputs';
import { Estados } from '@/components/Selects';
import { Municipios } from '@/components/SelectsClient';
import { useState } from 'react';
import { Dialog } from '@/components/dialogs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';
import Popover from '@/components/Popover';
import { IconMenuDeep } from '@tabler/icons-react';
import Button from '@/components/Button';

export default function PerfilPage({ props }) {
	//formatting date
	function pad(num, size) {
		num = num.toString();
		while (num.length < size) num = '0' + num;
		return num;
	}
	const day = pad(new Date(props.adoptante.fechaRegistro).getDay(), 2);
	const month = pad(new Date(props.adoptante.fechaRegistro).getMonth(), 2);
	const year = new Date(props.adoptante.fechaRegistro).getFullYear();
	const date = `${year}-${month}-${day}`;

	const [adoptante, setAdoptante] = useState({
		nombre: props.adoptante.nombre,
		apellido: props.adoptante.apellido,
		correo: props.adoptante.correo,
		telefono: parseInt(props.adoptante.telefono),
		fechaRegistro: date,
		estado: props.adoptanteEstado.idEstado,
		municipio: props.adoptanteMunicipio,
	});
	const [unmodified, setUnmodified] = useState(true);
	const [warningDialog, setWarningDialog] = useState(false);
	const [editar, setEditar] = useState(false);
	const [image, setImage] = useState(null);
	const router = useRouter();
	const { addToast } = useToast();

	const handleInputChange = (e) => {
		setUnmodified(false);
		const { name, value } = e.target;
		if (name == 'telefono' && value < 0) {
			return;
		}
		setAdoptante((prevCriteria) => ({ ...prevCriteria, [name]: value }));
	};
	const handleEstadoChange = (e) => {
		setUnmodified(false);
		const { name, value } = e.target;
		setAdoptante((prevCriteria) => ({ ...prevCriteria, [name]: value }));
		// Reset selected municipio when estado adoptante
		setAdoptante((prevCriteria) => ({ ...prevCriteria, municipio: 0 }));
		e.target.value
			? (document.getElementById('municipio').disabled = false)
			: (document.getElementById('municipio').disabled = true);
	};

	const modifyAdoptante = async (e) => {
		e.preventDefault();
		if (
			!adoptante.correo ||
			!adoptante.telefono ||
			!adoptante.municipio ||
			isNaN(adoptante.telefono)
		) {
			addToast('No se pueden modificar datos con valores invalidos', 'error');
		} else {
			try {
				const body = new FormData();
				BigInt.prototype.toJSON = function () {
					return this.toString();
				};
				body.set('userType', JSON.stringify(props.userType));
				body.set('user', JSON.stringify(adoptante));
				body.set('userInit', JSON.stringify(props.adoptante));

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

				const response = await fetch('/api/adoptante', {
					method: 'PUT',
					body,
				});
				if (response.status == 200) {
					addToast('Los cambios han sido guardados correctamente.', 'success');
					setEditar(false);

					setUnmodified(true);
				} else {
					response.json().then((res) => console.log(res.message));
					addToast('Ha ocurrido un error en el servidor', 'error');
				}
			} catch (error) {
				console.log(error);
				addToast('Ha ocurrido un error en el servidor', 'error');
			}
		}
	};
	const deleteAdoptante = async (e) => {
		setWarningDialog(false);
		const id = props.adoptante.id;
		const userType = props.userType;
		const params = JSON.stringify({ id, userType });
		const response = await fetch(`/api/adoptante?params=${params}`, {
			method: 'DELETE',
		});
		if (response.status == 200) {
			addToast('Se ha eliminado el adoptante de la pagina', 'success');
			router.replace('/adoptantes');
		} else if (response.status == 409) {
			addToast(
				'No puede eliminar la cuenta si ha adoptado a una mascota \n Cancele la adopción y devuelva la mascota al refugio para que pueda eliminar la cuenta',
				'error'
			);
		} else {
			response.json().then((res) => console.log(res.message));
			addToast('Ha ocurrido un error en el servidor', 'error');
		}
	};
	const warning = (e) => {
		e.preventDefault();
		setWarningDialog(true);
	};

	return (
		<>
			<h3 className="text-6xl">Perfil</h3>
			<>
				<div className="flex py-8 justify-between">
					<div className="flex gap-8">
						<img
							src={props.adoptante.imagen || '/images/defaultUser.png'}
							alt=""
							loading="lazy"
							className="size-32 object-cover rounded-full"
						/>
						<div className="">
							<h2 className="text-3xl">
								{adoptante.nombre} {adoptante.apellido}
							</h2>
							<h2 className="text-lg">{adoptante.correo}</h2>
							<h2 className="text-lg">{adoptante.telefono}</h2>
						</div>
					</div>
					<Popover icon={<IconMenuDeep />}>
						<button
							className="bg-primary hover:bg-primaryHover w-full py-1 px-2 text-white rounded-lg"
							onClick={() => setEditar(true)}
						>
							Editar Mi Cuenta
						</button>
						<button
							className="bg-red-600 hover:bg-red-500 w-full py-1 px-2 text-white rounded-lg"
							onClick={warning}
						>
							Eliminar Mi Cuenta
						</button>
					</Popover>
				</div>
			</>
			<Dialog
				isOpen={editar}
				onClose={() => setEditar(false)}
				encabezado={'Editar'}
			>
				<form className="">
					<div className="space-y-3">
						<InputFile
							id="perfil"
							name="perfil"
							onFileUpload={(image) => setImage(image)}
							accept="image/*, .jpg, .png, .svg, .webp, .jfif"
							image={props.adoptante.imagen}
							className="mx-auto"
						/>
						<Input
							id={'nombre'}
							label={'Nombre'}
							placeholder={'Nombre'}
							name={'nombre'}
							value={adoptante.nombre}
							onChange={handleInputChange}
						/>
						<Input
							id={'apellido'}
							label={'Apellido'}
							placeholder={'Apellido'}
							name={'apellido'}
							value={adoptante.apellido}
							onChange={handleInputChange}
						/>
						<Input
							id={'correo'}
							label={'Correo electronico'}
							placeholder={'Correo electrónico'}
							onChange={handleInputChange}
							value={adoptante.correo}
						/>
						<Input
							id={'numero'}
							type={'number'}
							label={'Numero de telefono'}
							placeholder={'Numero de telefono'}
							name={'telefono'}
							onChange={handleInputChange}
							value={adoptante.telefono}
						/>
						<div className="flex gap-5">
							<Estados
								onChange={handleEstadoChange}
								estados={props.estados}
								value={adoptante.estado}
							/>
							<Municipios
								onChange={handleInputChange}
								municipiosInicial={props.municipios}
								selectedEstado={adoptante.estado}
								value={adoptante.municipio}
							/>
						</div>
						<div className="contenedor-btn d-flex flex-row justify-content-center gap-2 m-3">
							<Button
								type="submit"
								className="btn btn-primary btn-lg"
								onClick={modifyAdoptante}
								disabled={unmodified}
								text="Guardar"
							/>
						</div>
					</div>
				</form>
			</Dialog>
			<Dialog
				isOpen={warningDialog}
				onClose={() => setWarningDialog(false)}
				fun={deleteAdoptante}
				confirmar
				encabezado={'Advertencia'}
				contenido={
					<>
						<p>
							Estas apunto de eliminar a un adoptante de la pagina <br />
							Esta acción sera irreversible
						</p>
						<p>Haga clic en confirmar para continuar</p>
					</>
				}
			/>
		</>
	);
}
