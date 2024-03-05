import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function CardMascota({ href, src, id, nombre, edad, sexo }) {
	return (
		<Link key={id} href={href}>
			<div class="relative w-80 p-4 bg-zinc-50 rounded-lg shadow-xl transition-shadow">
				<span className="absolute top-4 left-4 px-2  rounded-lg bg-[--primaryColor]">
					<h2 class="text-2xl  font-semibold text-white">{nombre}</h2>
				</span>
				<Image
					class="object-cover rounded-t-lg"
					alt="Card Image"
					src={src || '/images/dogIcon.png'}
					width={300}
					height={300}
				/>
				<div class="p-4 bg-slate-200">
					<div className="flex justify-between">
						<p className="flex gap-1">
							<h2 className="font-bold">Edad:</h2>
							<span>{edad}</span>
						</p>
						<p className="flex gap-1">
							<h2 className="font-bold">Sexo:</h2>
							<span>{sexo.sexo}</span>
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
