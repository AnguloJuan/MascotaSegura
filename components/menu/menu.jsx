import { GetUser } from '@/app/lib/user';
import Option from './menuOption';
import Link from 'next/link';
import {
	IconDog,
	IconHomeHeart,
	IconPawFilled,
	IconReport,
	IconTransferOut,
	IconUser,
	IconUsers,
	IconUsersGroup,
} from '@tabler/icons-react';

export default async function Menu() {
	const user = await GetUser();
	return (
		<aside className={`bg-[--primaryColor] h-screen min-w-min px-5 py-9 z-50`}>
			<nav className="flex flex-col gap-20">
				<Logo />
				<ul className="flex flex-col gap-3 px-4">
					<Option url={'/adopcion'} text={'Adopción'} icon={<IconDog />} />
					<Option url={'/reportes'} text={'Reportes'} icon={<IconReport />} />

					{user.idTipoUsuario !== 0 && (
						<>
							<Option url={'/perfil'} text={'Perfil'} icon={<IconUser />} />
							{user.idTipoUsuario !== 1 && (
								<>
									<Option
										url={'/rescate'}
										text={'Rescate'}
										icon={<IconHomeHeart />}
									/>
									{user.idTipoUsuario !== 2 && (
										<>
											<Option
												url={'/adoptantes'}
												text={'Adoptantes'}
												icon={<IconUsers />}
											/>
											<Option
												url={'/empleados'}
												text={'Empleados'}
												icon={<IconUsersGroup />}
											/>
										</>
									)}
								</>
							)}
						</>
					)}
				</ul>
			</nav>
			{user.idTipoUsuario === 0 ? (
				<Link
					href={'/login'}
					className="absolute bottom-4 left-4 flex gap-2 items-center text-white hover:bg-[--hoverPrimaryColor] 
				px-3 py-2 rounded-xl transition-colors duration-500"
				>
					<IconUser size={25} />
					<span className="text-lg font-bold">Iniciar Sesión</span>
				</Link>
			) : (
				<Link
					href={'/logout'}
					className="absolute bottom-4 left-4 flex gap-2 items-center text-white hover:bg-[--hoverPrimaryColor] 
		px-3 py-2 rounded-xl transition-colors duration-500"
				>
					<IconTransferOut size={25} />
					<span className="text-lg font-bold">Cerrar Sesión</span>
				</Link>
			)}
		</aside>
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
