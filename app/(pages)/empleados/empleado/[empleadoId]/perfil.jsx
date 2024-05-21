'use client';
import { Input, InputFile } from '@/components/Inputs';
import { useState } from 'react';
import { Dialog } from '@/components/dialogs';
import { useRouter } from 'next/navigation';
import Popover from '@/components/Popover';
import { IconMenuDeep } from '@tabler/icons-react';
import Button from '@/components/Button';
import { useToast } from '@/components/Toast';
import postImage from '@/app/lib/cloudinaryActions';

export default function PerfilPage({ props }) {
	const { addToast } = useToast();
	const [empleado, setAdoptante] = useState({
		nombre: props.empleado.nombre,
		apellido: props.empleado.apellido,
		correo: props.empleado.correo,
		telefono: parseInt(props.empleado.telefono),
		NIP: props.empleado.NIP,
		fechaRegistro: props.date,
		tipoEmpleado: props.empleado.idTipoUsuario,
	});
	const [unmodified, setUnmodified] = useState(true);
	const [modifiedDialog, setModifiedDialog] = useState(false);
	const [warningDialog, setWarningDialog] = useState(false);
	const [image, setImage] = useState(null);
	const router = useRouter();
	const [editar, setEditar] = useState(false);
	const { nombre, apellido, correo, telefono, NIP } = empleado;

	const handleInputChange = (e) => {
		setUnmodified(false);
		const { name, value } = e.target;
		if (name == 'telefono' && value < 0) {
			return;
		}
		setAdoptante((prevCriteria) => ({ ...prevCriteria, [name]: value }));
	};

	const submitChanges = async (e) => {
		e.preventDefault();

		try {
			const body = new FormData();
			BigInt.prototype.toJSON = function () {
				return this.toString();
			};
			body.set('user', JSON.stringify(empleado));
			body.set('userType', JSON.stringify(props.userType));
			body.set('userInit', JSON.stringify(props.empleado));

			if (image) {
				body.set('image', postImage(body, image));
			} else {
				body.set('image', null);
			}

			const response = await fetch('/api/empleado', {
				method: 'PUT',
				body,
			});
			if (response.status == 200) {
				setModifiedDialog(true);
				addToast(
					'Los cambios han sido guardados correctamente en la base de datos.',
					'success'
				);
				router.refresh();
			} else {
				response.json().then((res) => console.log(res.message));
				addToast('Ha ocurrido un error en el servidor', 'error');
				setUnmodified(true);
			}
		} catch (error) {
			addToast('Ha ocurrido un error en el servidor', 'error');
		}
	};

	const deleteEmpleado = async (e) => {
		setWarningDialog(false);
		const response = await fetch(`/api/empleado?id=${props.empleado.id}`, {
			method: 'DELETE',
		});
		if (response.status == 200) {
			addToast('Se ha eliminado el empleado de la pagina', 'success');
			router.replace('/empleados');
		} else {
			response.json().then((res) => console.log(res.message));
			addToast('Ha ocurrido un error en el servidor.', 'error');
		}
	};
	const warning = (e) => {
		e.preventDefault();
		setWarningDialog(true);
	};

	return (
		<>
			<div className="flex py-8 justify-between">
				<div className="flex gap-8">
					<img
						src={props.empleado.imagen || '/images/defaultUser.png'}
						alt={nombre}
						loading="lazy"
						className="size-32 object-cover rounded-full"
					/>
					<div>
						<h2 className="text-4xl">
							{nombre} {apellido}
						</h2>
						<h2 className="text-2xl">{correo}</h2>
						<h2 className="text-lg">{telefono}</h2>
						<h2 className="text-base">{NIP}</h2>
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
			<Dialog
				isOpen={editar}
				onClose={() => setEditar(false)}
				encabezado={'Editar Perfil'}
			>
				<form className="">
					<div className="space-y-3">
						<InputFile
							id="perfil"
							name="perfil"
							onFileUpload={(image) => setImage(image)} //
							accept="image/*, .jpg, .png, .svg, .webp, .jfif"
							image={props.empleado.imagen}
							className="mx-auto"
						/>
						<Input
							id={'nombre'}
							label={'Nombre'}
							placeholder={'Nombre'}
							name={'nombre'}
							value={nombre}
							onChange={handleInputChange}
						/>
						<Input
							id={'apellido'}
							label={'Apellido'}
							placeholder={'Apellido'}
							name={'apellido'}
							onChange={handleInputChange}
							value={apellido}
						/>
						<Input
							id={'correo'}
							label={'Correo electronico'}
							placeholder={'Correo electrónico'}
							onChange={handleInputChange}
							value={correo}
						/>
						<Input
							id={'numero'}
							type={'number'}
							label={'Numero de telefono'}
							placeholder={'Numero de telefono'}
							name={'telefono'}
							onChange={handleInputChange}
							value={telefono}
						/>
						<Input
							id={'NIP'}
							label={'NIP'}
							name={'nip'}
							onChange={handleInputChange}
							value={NIP}
							disabled
						/>

						<div className="contenedor-btn d-flex flex-row justify-content-center gap-2 m-3">
							<Button
								type="submit"
								onClick={submitChanges}
								disabled={modifiedDialog}
								text="Guardar"
							/>
						</div>
					</div>
				</form>
			</Dialog>

			<Dialog
				id={'warning'}
				isOpen={warningDialog}
				onClose={() => setWarningDialog(false)}
				fun={deleteEmpleado}
				confirmar
				encabezado="Advertencia"
				contenido={
					<>
						<p>
							Estas apunto de eliminar a un empleado de la pagina
							<br />
							Esta accion sera irreversible
						</p>
						<p>Haga clic en confirmar para continuar</p>
					</>
				}
			/>
		</>
	);
}
