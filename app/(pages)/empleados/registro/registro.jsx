'use client';
import postImage from '@/app/lib/cloudinaryActions';
import Button from '@/components/Button';
import { Input, InputFile } from '@/components/Inputs';
import { Select } from '@/components/Selects';
import Toast, { useToast } from '@/components/Toast';
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
	const { addToast } = useToast();

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
			addToast('Se deben de llenar todos los campos.', 'warning');
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
					body.set('image', postImage(body, image));
				} else {
					body.set('image', null);
				}

				// Make an HTTP POST request to the sign-in API route
				const response = await fetch('/api/empleado', {
					method: 'POST',
					body,
				});
				if (response.status == 201) {
					addToast('Se a registrado con exito.', 'success');

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
						addToast('Ya se registrado una cuenta con ese correo.', 'warning');
					}
					if (response.status == 500) {
						response
							.json()
							.then((response) =>
								console.error('An error occurred', response.message)
							);
						addToast('Ocurrió un error de servidor.', 'error');
					}
				}
			} catch (error) {
				addToast('Ocurrió un error de servidor.', 'error');
			}
		}
	};

	return (
		<>
			<form
				onSubmit={registrarEmpleado}
				className="grid place-content-center self-center"
			>
				<label htmlFor="perfil">
					Imagen de perfil
					<span>(Opcional)</span>
				</label>
				<div className="flex gap-8">
					<InputFile
						id="perfil"
						name="perfil"
						onFileUpload={(image) => setImage(image)}
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
			</form>
		</>
	);
}
