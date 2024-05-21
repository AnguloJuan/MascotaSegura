'use client';
import postImage from '@/app/lib/cloudinaryActions';
import Button from '@/components/Button';
import { Input, InputFile } from '@/components/Inputs';
import Popover from '@/components/Popover';
import { Dialog } from '@/components/dialogs';
import { IconMenuDeep } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/Toast';
import { setCookie, setCookies } from 'cookies-next';

export default function Perfil({ props }) {
	const dataUser = props.user;
	const { imagen, nombre, apellido, correo, telefono, id } = dataUser;
	const userType = props.userType;
	const [editar, setEditar] = useState(false);
	const [unmodified, setUnmodified] = useState(true);
	const { addToast } = useToast();
	const router = useRouter();

	const [user, setUser] = useState({
		nombre: nombre,
		apellido: apellido,
		correo: correo,
		telefono: telefono,
		imagen: imagen,
	});


	const handleInputChange = (e) => {
		setUnmodified(false);
		const { name, value } = e.target;
		if (name == 'telefono' && value < 0) {
			return;
		}

		setUser((prevCriteria) => ({ ...prevCriteria, [name]: value }));
	};

	const submitChanges = async (e) => {
		e.preventDefault();
		if (
			!user.correo ||
			!user.telefono ||
			isNaN(user.telefono)
		) {
			addToast('Por favor, llena todos los campos correctamente', 'error');
			return;
		}
		if (userType == 3) {
			if (
				!user.nombre ||
				!user.apellido
			) {
				addToast('Por favor, llena todos los campos correctamente', 'error');
				return;
			}
		}
		try {
			const body = new FormData();
			BigInt.prototype.toJSON = function () {
				return this.toString();
			};
			body.set('user', JSON.stringify(user));
			body.set('userType', JSON.stringify(userType));
			body.set('userInit', JSON.stringify(props.user));

			if (user.imagen) {
				postImage(body, user.imagen);
			} else {
				body.set('image', null);
			}

			const response = await fetch(`/api/${userType === 1 ? "adoptante" : "empleado"}`, {
				method: 'PUT',
				body,
			});
			if (response.status == 200) {
				setUnmodified(true);
				response.json().then((response) => {
					{
						setCookies('user', response.token)
						addToast('Los cambios han sido guardados correctamente.', 'success');
						router.refresh();
					}
				});
			} else {
				response.json().then((res) => console.log(res.message));
				setUnmodified(false);
				addToast('Ocurrió un error de servidor', 'error');
			}
		} catch (error) {
			console.log(error);
			setUnmodified(false);
			addToast('Ocurrió un error de servidor', 'error');
		}

	};

	const deleteUser = async (e) => {
		setWarningDialog(false);
		const id = props.user.id;
		const userType = props.userType;
		const params = JSON.stringify({ id, userType });
		const response = await fetch(`/api/${userType == 1 ? "adoptante" : "empleado"}?params=${params}`, {
			method: 'DELETE',
		});
		if (response.status == 200) {
			setDeletedDialog(true);
			router.replace('/login');
		} else if (response.status == 409) {
			setAdopcionDialog(true);
		} else {
			response.json().then((res) => console.log(res.message));
			setErrorDialog(true);
		}
	};

	return (
		<>
			<div className="flex py-8 justify-between">
				<div className="flex gap-8">
					<img
						src={imagen || '/images/defaultUser.png'}
						alt=""
						loading="lazy"
						className="size-32 object-cover rounded-full"
					/>
					<div>
						<h2 className="text-3xl">
							{nombre} {apellido}
						</h2>
						<h2 className="text-lg">{correo}</h2>
						<h2 className="text-lg">{telefono}</h2>
					</div>
				</div>
				<Popover icon={<IconMenuDeep />}>
					<button
						className="bg-primary hover:bg-primaryHover w-full py-1 px-2 text-white rounded-lg"
						onClick={() => setEditar(true)}
					>
						Editar Mi Cuenta
					</button>
					<button className="bg-red-600 hover:bg-red-500 w-full py-1 px-2 text-white rounded-lg">
						Eliminar Mi Cuenta
					</button>
				</Popover>
			</div>
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
							onFileUpload={(image) => setUser(
								(prevCriteria) => ({ ...prevCriteria, imagen: image })
							)}
							accept="image/*, .jpg, .png, .svg, .webp, .jfif"
							image={user.imagen || '/images/defaultUser.png'}
							className="mx-auto"
						/>
						<Input
							id={'nombre'}
							label={'Nombre'}
							placeholder={'Nombre'}
							name={'nombre'}
							value={user.nombre}
							onChange={handleInputChange}
						/>
						<Input
							id={'apellido'}
							label={'Apellido'}
							placeholder={'Apellido'}
							name={'apellido'}
							onChange={handleInputChange}
							value={user.apellido}
						/>
						<Input
							id={'correo'}
							name={'correo'}
							label={'Correo electronico'}
							placeholder={'Correo electrónico'}
							onChange={handleInputChange}
							value={user.correo}
						/>
						<Input
							id={'numero'}
							type={'number'}
							label={'Numero de telefono'}
							placeholder={'Numero de telefono'}
							name={'telefono'}
							onChange={handleInputChange}
							value={user.telefono}
						/>
						<div className="flex gap-5">
							{/* <Estados onChange={handleInputChange} estados={} value={''} />
							<Municipios
								onChange={handleInputChange}
								municipiosInicial={}
								selectedEstado={adoptante.estado}
								value={''}
							/> */}
						</div>
						<div className="contenedor-btn d-flex flex-row justify-content-center gap-2 m-3">
							<Button
								type="submit"
								onClick={submitChanges}
								disabled={unmodified}
								text="Guardar"
							/>
						</div>
					</div>
				</form>
			</Dialog>
		</>
	);
}
