import { GetUser } from '@/app/lib/user';
import menu from './menu.module.css';
import Option from './menuOption';
import Link from 'next/link';
import {
	IconDog,
	IconPawFilled,
	IconReport,
	IconUser,
} from '@tabler/icons-react';

export default async function Menu() {
	const user = GetUser();
	return (
		<aside className={`${menu.aside} py-9 z-50`}>
			<nav className="flex flex-col gap-20">
				<Logo />
				<ul className="flex flex-col gap-3 px-4">
					<MenuType user={user.idTipoUsuario} />
				</ul>
			</nav>
		</aside>
	);
}

function MenuType({ user }) {
	return user == 1 ? (
		<>
			<Option
				url={'/adopcion'}
				text={'ADOPCIÓN'}
				icon={'/images/menu/adopcion.png'}
			/>
			<Option
				url={'/reportes'}
				text={'Reportes'}
				icon={'/images/menu/reportes.png'}
			/>
			<Option
				url={'/perfil'}
				text={'Perfil'}
				icon={'/images/menu/perfil.png'}
			/>
			<Option
				url={'/logout'}
				text={'CERRAR SESIÓN'}
				icon={'/images/menu/cerrarSesion.png'}
			/>
		</>
	) : user == 2 ? (
		<>
			<Option
				url={'/rescate'}
				text={'Rescate'}
				icon={'/images/menu/rescate.png'}
			/>
			<Option
				url={'/adopcion'}
				text={'ADOPCIÓN'}
				icon={'/images/menu/adopcion.png'}
			/>
			<Option
				url={'/reportes'}
				text={'Reportes'}
				icon={'/images/menu/reportes.png'}
			/>
			<Option
				url={'/perfil'}
				text={'Perfil'}
				icon={'/images/menu/perfil.png'}
			/>
			<Option
				url={'/logout'}
				text={'CERRAR SESIÓN'}
				icon={'/images/menu/cerrarSesion.png'}
			/>
		</>
	) : user == 3 ? (
		<>
			<Option
				url={'/rescate'}
				text={'Rescate'}
				icon={'/images/menu/rescate.png'}
			/>
			<Option
				url={'/adopcion'}
				text={'Mascotas'}
				icon={'/images/menu/adopcion.png'}
			/>
			<Option
				url={'/adoptantes'}
				text={'Adoptantes'}
				icon={'/images/menu/adoptantes.png'}
			/>
			<Option
				url={'/empleados'}
				text={'Empleados'}
				icon={'/images/menu/empleados.png'}
			/>
			<Option
				url={'/reportes'}
				text={'Reportes'}
				icon={'/images/menu/reportes.png'}
			/>
			<Option
				url={'/perfil'}
				text={'Perfil'}
				icon={'/images/menu/perfilAdmin.png'}
			/>
			<Option
				url={'/logout'}
				text={'Cerrar Sesión'}
				icon={'/images/menu/cerrarSesion.png'}
			/>
		</>
	) : (
		<>
			<Option url={'/logout'} text={'Iniciar Sesión'} icon={<IconUser />} />
			<Option url={'/adopcion'} text={'Mascotas'} icon={<IconDog />} />
			<Option url={'/reportes'} text={'Reportes'} icon={<IconReport />} />
		</>
	);
}

function Logo() {
	return (
		<>
			<Link
				href="/"
				className="flex gap-1 text-2xl items-center justify-center text-white font-black"
			>
				<span>Mascota</span>
				<IconPawFilled />
				<span>Segura</span>
			</Link>
		</>
	);
}
