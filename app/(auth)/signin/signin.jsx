'use client';
import postImage from '@/app/lib/cloudinaryActions';
import { Input } from '@/components/Inputs';
import { Logo } from '@/components/Logo';
import { Estados } from '@/components/Selects';
import { Municipios } from '@/components/Selects';
import { Dialog } from '@/components/dialogs';
import { IconChevronLeft } from '@tabler/icons-react';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
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
		setSelectedMunicipio(0);
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
					body.set('image', await postImage(body, image));
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
					response.json().then((response) => setCookie('user', response.token));

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
		<section className="relative grid place-content-center py-24 w-full bg-[url('/images/background.jpg')] bg-cover bg-fixed bg-no-repeat">
			<Link
				href={'/'}
				className="fixed top-9 left-9 py-1 px-4 rounded-full bg-white/25 backdrop-blur-lg flex items-center gap-3"
			>
				<IconChevronLeft size={30} />
				<span className="text-xl">Regresar</span>
			</Link>
			<form
				className="min-h-[85vh] min-w-[35vw] grid place-content-center gap-20 py-10 px-20 shadow-xl shadow-slate-400 bg-white/25 backdrop-blur-lg"
				onSubmit={handleSignIn}
			>
				<Logo className="text-primary text-5xl" color="#4844f8" size={40} />

				<div className="flex flex-col items-center justify-center gap-4">
					<h1 className="text-3xl">Crear cuenta</h1>
					<Input
						id={'name'}
						type={'text'}
						label={'Nombre'}
						placeholder={'Nombre'}
						onChange={(e) => setFirstName(e.target.value)}
						className="w-90"
					/>

					<Input
						id={'lastName'}
						type={'text'}
						label={'Apellidos'}
						placeholder={'Apellidos'}
						onChange={(e) => setLastName(e.target.value)}
						className="w-90"
					/>

					<Input
						id={'telefono'}
						type={'text'}
						label={'Teléfono'}
						placeholder={'Teléfono'}
						onChange={(e) => setTelefono(e.target.value)}
						className="w-90"
					/>
					<div className="flex gap-2">
						<Estados onChange={handleEstadoChange} value={selectedEstado} />
						<Municipios
							selectedEstado={selectedEstado}
							value={selectedMunicipio}
							onChange={handleMunicipioChange}
						/>
					</div>

					<Input
						id={'email'}
						type={'email'}
						label={'Correo electrónico'}
						placeholder={'Correo electrónico'}
						onChange={(e) => setEmail(e.target.value)}
						className="w-90"
					/>

					<Input
						id={'password'}
						type={'password'}
						label={'Contraseña'}
						placeholder={'Contraseña'}
						onChange={(e) => setPassword(e.target.value)}
						className="w-90"
					/>

					<button
						type="submit"
						className="bg-primary w-full py-2 rounded-lg text-white font-bold hover:bg-primaryHover transition-colors"
					>
						Crear cuenta
					</button>
					<br />
					<p>
						Ya tienes cuenta?{' '}
						<Link href={'/login'} className="text-primary font-black">
							Iniciar sesión
						</Link>
					</p>
				</div>
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
		</section>
	);
}
