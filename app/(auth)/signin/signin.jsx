'use client';
import postImage from '@/app/lib/cloudinaryActions';
import { Input } from '@/components/Inputs';
import { Estados } from '@/components/Selects';
import { Municipios } from '@/components/SelectsClient';
import { Dialog } from '@/components/dialogs';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignIn() {
	const router = useRouter();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [telefono, setTelefono] = useState('');
	const [selectedEstado, setSelectedEstado] = useState('');
	const [selectedMunicipio, setSelectedMunicipio] = useState('');
	const [estados, setEstados] = useState([]);
	const [municipios, setMunicipios] = useState([]);
	const [password, setPassword] = useState('');
	const [isErrorEmail, setIsErrorEmail] = useState(false);
	const [isErrorServidor, setIsErrorServidor] = useState(false);
	const [isFieldsFilled, setIsFieldsFilled] = useState(false);
	const [isRegistrado, setIsRegistrado] = useState(false);

	const [image, setImage] = useState(null);
	const [createObjectURL, setCreateObjectURL] = useState(null);

	const handleEstadoChange = (event) => {
		setSelectedEstado(event.target.value);
		// Reset selected municipio when estado changes
		setSelectedMunicipio('');
		event.target.value
			? (document.getElementById('municipio').disabled = false)
			: (document.getElementById('municipio').disabled = true);
	};

	const handleMunicipioChange = (event) => {
		setSelectedMunicipio(event.target.value);
	};

	const uploadToClient = (event) => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];

			setImage(i);
			setCreateObjectURL(URL.createObjectURL(i));
		}
	};

	const handleSignIn = async (e) => {
		e.preventDefault();

		if (
			!firstName ||
			!lastName ||
			!email ||
			!telefono ||
			isNaN(telefono) ||
			!selectedMunicipio ||
			!password
		) {
			setIsFieldsFilled(true);
		} else {
			try {
				const body = new FormData();
				const user = {
					firstName,
					lastName,
					email,
					telefono,
					selectedMunicipio,
					password,
				};
				body.set('user', JSON.stringify(user));

				if (image) {
					body.set('image', postImage(body, image));
				} else {
					body.set('image', null);
				}

				// Make an HTTP POST request to the sign-in API route
				const response = await fetch('/api/auth/signin', {
					method: 'POST',
					body,
				});
				if (response.ok) {
					if (hasCookie('user')) {
						deleteCookie('user');
					}
					// Sign-in successful, perform any necessary actions (e.g., redirect)
					response
						.json()
						.then((response) => setCookie('user', response.token));

					setIsRegistrado(true);
					router.replace('/');
				} else {
					// Handle sign-in error
					console.error('Sign-in failed');
					response.json().then((response) => console.error(response.message));
					if (response.status == 409) {
						setIsErrorEmail(true);
					}
					if (response.status == 500) {
						response.json().then((response) => console.error(response.message));
						setIsErrorServidor(true);
					}
				}
			} catch (error) {
				console.error('An error occurred', message);
				setIsErrorServidor(true);
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSignIn}>
				<h1>Crear cuenta</h1>
				<label htmlFor="perfil">
					Imagen de perfil{' '}
					<span className="fw-light text-secondary">(Opcional)</span>
				</label>
				<div>
					{image ? (
						<Image
							width={200}
							height={200}
							src={createObjectURL}
							alt="upload image"
						/>
					) : (
						<Image
							width={200}
							height={200}
							src={'/images/defaultUser.png'}
							alt="upload image"
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

				<Input
					id={'name'}
					type={'text'}
					label={'Nombre'}
					placeholder={'Nombre'}
					onChange={(e) => setFirstName(e.target.value)}
				/>

				<Input
					id={'lastName'}
					type={'text'}
					label={'Apellidos'}
					placeholder={'Apellidos'}
					onChange={(e) => setLastName(e.target.value)}
				/>

				<Input
					id={'telefono'}
					type={'text'}
					label={'Teléfono'}
					placeholder={'Teléfono'}
					onChange={(e) => setTelefono(e.target.value)}
				/>

				<Estados
					onChange={handleEstadoChange}
					value={selectedEstado}
				/>
				<Municipios
					selectedEstado={selectedEstado}
					value={selectedMunicipio}
					onChange={handleMunicipioChange}
				/>

				<Input
					id={'email'}
					type={'email'}
					label={'Correo electrónico'}
					placeholder={'Correo electrónico'}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<Input
					id={'password'}
					type={'password'}
					label={'Contraseña'}
					placeholder={'Contraseña'}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button type="submit" className="btn btn-primary mb-3">
					Crear cuenta
				</button>
				<br />
				<p>
					Ya tienes cuenta? <Link href={'/login'}>Iniciar sesión</Link>
				</p>
			</form>
			<Dialog
				id={'errorEmail'}
				isOpen={isErrorEmail}
				onClose={() => setIsErrorEmail(false)}
			>
				<h1>Error al registrarse</h1>
				<p>Ya se registrado una cuenta con ese correo</p>
			</Dialog>
			<Dialog
				id={'errorServidor'}
				isOpen={isErrorServidor}
				onClose={() => setIsErrorServidor(false)}
			>
				<h1>Error de servidor</h1>
				<p>Ocurrió un error de servidor</p>
				<p>Vuelve a intentar más tarde</p>
			</Dialog>
			<Dialog
				id={'errorCampos'}
				isOpen={isFieldsFilled}
				onClose={() => setIsFieldsFilled(false)}
			>
				<h1>Error</h1>
				<p>Rellene todos los campos primero</p>
			</Dialog>
			<Dialog
				id={'registrado'}
				isOpen={isRegistrado}
				onClose={() => setIsRegistrado(false)}
			>
				<h1>Registro exitoso</h1>
				<p>Espere un momento en lo que carga la pagina</p>
			</Dialog>
		</>
	);
}
