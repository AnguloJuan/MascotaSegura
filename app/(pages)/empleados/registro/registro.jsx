'use client';
import Button from '@/components/Button';
import { Each } from '@/components/Each';
import { Input, InputFile } from '@/components/Inputs';
import { Select } from '@/components/Selects';
import Toast from '@/components/Toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegistroEmpleado() {
	const router = useRouter();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [telefono, setTelefono] = useState('');
	const [password, setPassword] = useState('');
	const [NIP, setNIP] = useState('');
	const [tipoEmpleado, setTipoEmpleado] = useState(0);
	const [image, setImage] = useState(null);
	const [toasts, setToasts] = useState([]);

	const showToast = (message, type) => {
		const id = Math.random();
		setToasts((toasts) => [...toasts, { id, message, type }]);
		setTimeout(() => removeToast(id), 5000);
	};
	const removeToast = (id) => {
		setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
	};

	const uploadToClient = (event) => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];

			setImage(i);
			setCreateObjectURL(URL.createObjectURL(i));
		}
	};

	const registrarEmpleado = async (e) => {
		e.preventDefault();

		if (
			!firstName ||
			!lastName ||
			!email ||
			!telefono ||
			isNaN(telefono) ||
			!password
		) {
			showToast('Se deben de llenar todos los espacios.', 'warning');
		} else {
			try {
				const body = new FormData();
				const empleado = {
					firstName,
					lastName,
					email,
					telefono,
					NIP,
					tipoEmpleado,
					password,
				};
				body.set('empleado', JSON.stringify(empleado));
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

				// Make an HTTP POST request to the sign-in API route
				const response = await fetch('/api/empleado', {
					method: 'POST',
					body,
				});
				if (response.status == 201) {
					showToast('Se a registrado con exito.', 'success');

					response
						.json()
						.then((response) =>
							router.replace(`/empleados/empleado/${response.user.id}`)
						);
				} else {
					// Handle sign-in error
					console.error('register failed');
					response.json().then((response) => console.log(response.message));
					if (response.status == 409) {
						showToast('Ya se registrado una cuenta con ese correo.', 'warning');
					}
					if (response.status == 500) {
						response
							.json()
							.then((response) =>
								console.error('An error occurred', response.message)
							);
						showToast('Ocurrió un error de servidor.', 'error');
					}
				}
			} catch (error) {
				showToast('Ocurrió un error de servidor.', 'error');
			}
		}
	};

	return (
		<>
			<form onSubmit={registrarEmpleado} className="grid place-content-center">
				<label htmlFor="perfil">
					Imagen de perfil
					<span>(Opcional)</span>
				</label>
				<div className="flex gap-8">
					<InputFile
						id="perfil"
						name="perfil"
						onChange={uploadToClient}
						accept="image/*, .jpg, .png, .svg, .webp, .jfif"
					/>
					<div className="grid w-full place-content-center space-y-3 *:w-full">
						<Select
							id="tipoEmpleado"
							onChange={(e) => setTipoEmpleado(e.target.value)}
							name="tipoEmpleado"
						>
							<option value="">Selecciona el tipo empleado</option>
							<option value={2}>Empleado</option>
							<option value={3}>Administrador</option>
						</Select>
						<div className="flex gap-3">
							<Input
								id={'name'}
								type={'text'}
								placeholder={'Nombre'}
								onChange={(e) => setFirstName(e.target.value)}
							/>

							<Input
								id={'lastName'}
								type={'text'}
								placeholder={'Apellidos'}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
						<div className="flex gap-3">
							<Input
								id={'NIP'}
								type={'text'}
								placeholder={'NIP'}
								onChange={(e) => setNIP(e.target.value)}
							/>
							<Input
								id={'telefono'}
								type={'text'}
								placeholder={'Teléfono'}
								onChange={(e) => setTelefono(e.target.value)}
							/>
						</div>
						<div className="flex gap-3">
							<Input
								id={'email'}
								type={'email'}
								placeholder={'Correo electrónico'}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								id={'password'}
								type={'password'}
								placeholder={'Contraseña'}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
				</div>

				<center>
					<Button type="submit" text={'Registrar empleado'} />
				</center>
				<br />
			</form>

			{toasts && (
				<div className="fixed bottom-3 right-2 flex flex-col-reverse gap-2">
					<Each
						of={toasts}
						render={(toast, i) => (
							<Toast
								key={toast.id}
								message={toast.message}
								type={toast.type}
								onClose={() => removeToast(toast.id)}
							/>
						)}
					/>
				</div>
			)}
		</>
	);
}
