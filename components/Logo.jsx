import { IconPawFilled } from '@tabler/icons-react';
import Link from 'next/link';

export function Logo({ className, color = '#fff', size = 30 }) {
	return (
		<>
			<Link
				href="/"
				className={`${className} flex gap-1 text-2xl items-center text-[${color}] justify-center font-black `}
			>
				<span>Mascota</span>
				<IconPawFilled size={size} />
				<span>Segura</span>
			</Link>
		</>
	);
}
