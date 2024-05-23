'use client';
import { Input } from '@/components/Inputs';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog } from '@/components/dialogs';
import { useToast } from '@/components/Toast';
import { useRouter } from 'next/navigation';

export default function LogIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { addToast } = useToast();
	const router = useRouter();

	const logIn = async function () {
		if (!email || !password) {
			addToast('Rellene todos los campos primero', 'error');
			return;
		}
		try {
			// Make an HTTP POST request to the log-in API route
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.status != 200) {
				addToast('Error al iniciar sesión, correo o contraseña incorrectos', 'error');
				return;
			}

			if (response.ok) router.replace("/");
		} catch (error) {
			addToast('Error al iniciar sesión', 'error');
			console.error('An error occurred', error);
		}
	}

	return (
		<section className="grid place-content-center w-full h-screen">
			<form className="flex flex-col items-center gap-4 py-10 px-20 shadow-xl shadow-slate-400 ">
				<h1 className="text-6xl">Iniciar sesión</h1>
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
					type="button"
					onClick={logIn}
					className="bg-primary w-full py-2 rounded-lg text-white font-bold hover:bg-primaryHover transition-colors"
				>
					Iniciar sesión
				</button>
				<Link href={'/signin'} className="text-primary max-w-max">
					Crear cuenta
				</Link>
			</form>
		</section>
	);
}
