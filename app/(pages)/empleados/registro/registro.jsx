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
	const [image, setImage] = useState(null);
	const { addToast } = useToast();

	const [empleado, setEmpleado] = useState({
		firstName: '',
		lastName: '',
		email: '',
		telefono: '',
		NIP: '',
		tipoEmpleado: '',
		password: '',
	});


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		// Check if the input are letter and accpts empty spaces and empty fields
		if ((name === "firstName" || name === "lastName") && !value.match(/^[a-zA-Z\s]*$/)) {
			return;
		}
		if (name == 'telefono' && (value < 0 || value > 9999999999)) {
			return;
		}

		setEmpleado((prevCriteria) => ({ ...prevCriteria, [name]: value }));
		console.log(empleado);
	};

	const registrarEmpleado = async (e) => {
		e.preventDefault();

		if (
			!empleado.firstName ||
			!empleado.lastName ||
			!empleado.email ||
			!empleado.telefono ||
			isNaN(empleado.telefono) ||
			!empleado.password ||
			!empleado.NIP || 
			!empleado.tipoEmpleado
		) {
			addToast('Se deben de llenar todos los campos.', 'warning');
		} else {
			try {
				const body = new FormData();
				body.set('empleado', JSON.stringify(empleado));
				if (image) {
					body.set('image', await postImage(body, image));
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
						.then((response) =>{
							console.log(response);
							router.replace(`/empleados/empleado/${response.user.id}`)
						}
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
						value={image}
						onFileUpload={(image) => setImage(image)}
						accept="image/*, .jpg, .png, .svg, .webp, .jfif"
					/>
					<div className="grid w-full place-content-center space-y-3 *:w-full">
						<Select
							id="tipoEmpleado"
							onChange={handleInputChange}
							name="tipoEmpleado"
							value={empleado.tipoEmpleado}
						>
							<option value={2}>Empleado</option>
							<option value={3}>Administrador</option>
						</Select>
						<div className="flex gap-3">
							<Input
								id={'name'}
								type={'text'}
								placeholder={'Nombre'}
								name={'firstName'}
								value={empleado.firstName}
								required
								onChange={handleInputChange}
							/>

							<Input
								id={'lastName'}
								type={'text'}
								placeholder={'Apellidos'}
								name={'lastName'}
								value={empleado.lastName}
								required
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex gap-3">
							<Input
								id={'NIP'}
								type={'text'}
								name={'NIP'}
								placeholder={'NIP'}
								required
								value={empleado.NIP}
								onChange={handleInputChange}
							/>
							<Input
								id={'telefono'}
								type={'text'}
								name={'telefono'}
								placeholder={'Teléfono'}
								required
								value={empleado.telefono}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex gap-3">
							<Input
								id={'email'}
								type={'email'}
								name={'email'}
								placeholder={'Correo electrónico'}
								required
								value={empleado.email}
								onChange={handleInputChange}
							/>
							<Input
								id={'password'}
								type={'password'}
								name={'password'}
								placeholder={'Contraseña'}
								required
								value={empleado.password}
								onChange={handleInputChange}
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
