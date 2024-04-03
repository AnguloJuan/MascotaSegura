import Image from 'next/image';
import Link from 'next/link';

export default function CardMascota({ href, src, id, nombre, edad, sexo }) {
	return (
		<Link key={id} href={href}>
			<div className="relative w-80 p-4 bg-zinc-50 rounded-lg shadow-lg shadow-zinc-600 transition-shadow">
				<span className="absolute top-4 left-4 px-2  rounded-lg bg-[--primaryColor]">
					<h2 className="text-2xl  font-semibold text-white">{nombre}</h2>
				</span>
				<Image
					className="object-cover rounded-t-lg"
					alt="Card Image"
					src={src || '/images/dogIcon.png'}
					width={300}
					height={300}
				/>
				<div className="p-4 bg-slate-200">
					<div className="flex justify-between">
						<div className="flex gap-1">
							<h2 className="font-bold">Edad:</h2>
							<span>{edad}</span>
						</div>
						<div className="flex gap-1">
							<h2 className="font-bold">Sexo:</h2>
							{/* <span>{sexo.sexo}</span> */}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
