'use client';
import { Input } from '@/components/Inputs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';
import { Dialog } from '@/components/dialogs';
import { AuthContext } from '@/context/AuthContext';

export default function LogIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isDialogUnfilledFields, setIsDialogUnfilledFields] = useState(false);
	const [isDialogFailedLogin, setIsDialogFailedLogin] = useState(false);
	const { logIn } = useContext(AuthContext);

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
					className="w-full"
				/>

				<Input
					id={'password'}
					type={'password'}
					label={'Contraseña'}
					placeholder={'Contraseña'}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full"
				/>

				<button
					type='button'
					onClick={() => logIn(email, password, {
						setIsDialogUnfilledFields,
						setIsDialogFailedLogin,
					})}
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
				isOpen={isDialogUnfilledFields}
				onClose={() => setIsDialogUnfilledFields(false)}
			>
				<h1>Error</h1>
				<p>Rellene todos los campos primero</p>
			</Dialog>
			<Dialog
				id={'loginFailed'}
				isOpen={isDialogFailedLogin}
				onClose={() => setIsDialogFailedLogin(false)}
			>
				<h1>Error</h1>
				<p>Error al iniciar sesión</p>
				<p>Correo o contraseña incorrectos</p>
				<p>Asegurese de ingresar bien los datos</p>
			</Dialog>
		</section>
	);
}
