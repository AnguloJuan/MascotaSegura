'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Option({ url, text, icon }) {
	const pathname = usePathname();

	return (
		<li>
			<Link href={url} className={'group flex flex-col items-center'}>
				<div className="flex items-center gap-3 text-white font-semibold text-2xl self-start">
					{icon}
					<span className="">{text}</span>
				</div>
				<div
					className={`h-[2px] bg-white transition-[width] duration-500
					${pathname.includes(url) ? `w-full` : 'w-0 group-hover:w-full'} `}
				/>
			</Link>
		</li>
	);
}
