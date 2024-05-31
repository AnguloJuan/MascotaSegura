'use client';
import postImage from '@/app/lib/cloudinaryActions';
import { Input } from '@/components/Inputs';
import { Logo } from '@/components/Logo';
import { Estados } from '@/components/Selects';
import { Municipios } from '@/components/Selects';
import { useToast } from '@/components/Toast';
import { IconChevronLeft } from '@tabler/icons-react';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
	const router = useRouter();
	const [selectedEstado, setSelectedEstado] = useState('');
	const [ user, setUser ] = useState({
		firstName: '',
		lastName: '',
		email: '',
		telefono: '',
		selectedMunicipio: '',
		password: '',
	});

	const [image, setImage] = useState(null);
	const { addToast } = useToast();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		// Check if the input are letter and accpts empty spaces and empty fields
		if ((name === "firstName" || name === "lastName") && !value.match(/^[a-zA-Z\s]*$/)) {
			return;
		}
		if (name == 'telefono' && (value < 0 || value > 9999999999)) {
			return;
		}

		setUser((prevCriteria) => ({ ...prevCriteria, [name]: value }));
		console.log(user);
	};

	const handleEstadoChange = (event) => {
		setSelectedEstado(event.target.value);
		// Reset selected municipio when estado changes
		setUser((prevCriteria) => ({ ...prevCriteria, selectedMunicipio: 0 }));
	};

	const handleMunicipioChange = (event) => {
		setUser((prevCriteria) => ({ ...prevCriteria, selectedMunicipio: event.target.value }));
	};

	const handleSignIn = async (e) => {
		e.preventDefault();

		if (
			!user.firstName ||
			!user.lastName ||
			!user.email ||
			!user.telefono ||
			isNaN(user.telefono) ||
			!user.selectedMunicipio ||
			!user.password
		) {
			addToast('Por favor, llena todos los campos correctamente', 'error');
		} else {
			try {
				const body = new FormData();
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

					addToast('Registro exitoso', 'success');
					router.replace('/');
				} else {
					// Handle sign-in error
					console.error('Sign-in failed');
					response.json().then((response) => console.error(response.message));
					if (response.status == 409) {
						addToast('Ya se ha registrado una cuenta con ese correo', 'error');
					}
					if (response.status == 500) {
						response.json().then((response) => console.error(response.message));
						addToast('Ha ocurrido un error en el servidor', 'error');
					}
				}
			} catch (error) {
				console.error('An error occurred', message);
				addToast('Ha ocurrido un error en el servidor', 'error');
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
				className="min-h-[85vh] min-w-[35vw] grid place-content-center gap-20 py-10 px-20 shadow-xl
				 shadow-slate-400 bg-white/25 backdrop-blur-lg rounded-xl"
				onSubmit={handleSignIn}
			>
				<Logo className="text-primary text-5xl" color="#4844f8" size={40} />

				<div className="flex flex-col items-center justify-center gap-4">
					<h1 className="text-3xl">Crear cuenta</h1>
					<Input
						id={'firstName'}
						type={'text'}
						label={'Nombre'}
						name={'firstName'}
						value={user.firstName}
						placeholder={'Nombre'}
						onChange={handleInputChange}
						className="w-90"
					/>

					<Input
						id={'lastName'}
						name={'lastName'}
						type={'text'}
						label={'Apellidos'}
						placeholder={'Apellidos'}
						onChange={handleInputChange}
						value={user.lastName}
						className="w-90"
					/>

					<Input
						id={'telefono'}
						type={'text'}
						label={'Teléfono'}
						name={'telefono'}
						placeholder={'Teléfono'}
						onChange={handleInputChange}
						value={user.telefono}
						className="w-90"
					/>
					<div className="flex gap-2">
						<Estados onChange={handleEstadoChange} value={selectedEstado} />
						<Municipios
							selectedEstado={selectedEstado}
							value={user.selectedMunicipio}
							onChange={handleMunicipioChange}
						/>
					</div>

					<Input
						id={'email'}
						type={'email'}
						name={'email'}
						label={'Correo electrónico'}
						placeholder={'Correo electrónico'}
						onChange={handleInputChange}
						value={user.email}
						className="w-90"
					/>

					<Input
						id={'password'}
						type={'password'}
						label={'Contraseña'}
						name={'password'}
						placeholder={'Contraseña'}
						onChange={handleInputChange}
						value={user.password}
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
		</section>
	);
}
