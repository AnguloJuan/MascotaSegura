'use client';
import Input from '@/components/Inputs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import { Dialog } from '@/components/dialogs';

export default function LogIn() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isFieldsFilled, setIsFieldsFilled] = useState(false);
	const [isLoginFailed, setIsLoginFailed] = useState(false);

	const handleLogIn = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			setIsFieldsFilled(true);
		} else {
			try {
				// Make an HTTP POST request to the log-in API route
				const response = await fetch('/api/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
				});

				if (response.ok) {
					if (hasCookie('token')) {
						deleteCookie('token');
					}
					response
						.json()
						.then((response) => setCookie('token', response.token));

					router.replace('/');
				} else {
					// Handle log-in error
					console.error('Log-in failed');
					setIsLoginFailed(true);
				}
			} catch (error) {
				console.error('An error occurred', error);
			}
		}
	};

	return (
		<section className="grid place-content-center w-full h-screen">
			<form
				onSubmit={handleLogIn}
				className="flex flex-col items-center gap-4 py-10 px-20 shadow-xl shadow-slate-400 "
			>
				<h1 className="text-6xl">Iniciar sesión</h1>
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

				<button
					type="submit"
					className="bg-[--primaryColor] w-full py-2 rounded-lg text-white font-bold hover:bg-[#7266f5] transition-colors"
				>
					Iniciar sesión
				</button>
				<Link href={'/signin'} className="text-[--primaryColor] max-w-max">
					Crear cuenta
				</Link>
			</form>
			<Dialog
				id={'errorCampos'}
				isOpen={isFieldsFilled}
				onClose={() => setIsFieldsFilled(false)}
			>
				<h1>Error</h1>
				<p>Rellene todos los campos primero</p>
			</Dialog>
			<Dialog
				id={'loginFailed'}
				isOpen={isLoginFailed}
				onClose={() => setIsLoginFailed(false)}
			>
				<h1>Error</h1>
				<p>Error al iniciar sesión</p>
				<p>Correo o contraseña incorrectos</p>
				<p>Asegurese de ingresar bien los datos</p>
			</Dialog>
		</section>
	);
}
