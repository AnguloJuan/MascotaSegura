import Image from 'next/image';
import Link from 'next/link';

export default function CardMascota({ href, src, id, nombre, edad, sexo }) {
	return (
		<Link key={id} href={href}>
			<div className="relative w-80 rounded-lg overflow-hidden bg-zinc-50 shadow-lg shadow-zinc-600 transition-shadow">
				<span className="absolute top-4 left-4 px-2  rounded-lg bg-primary">
					<h2 className="text-2xl  font-semibold text-white">{nombre}</h2>
				</span>
				<div className="p-4">
					<Image
						className="object-cover rounded-t-lg"
						alt="Card Image"
						src={src || '/images/dogIcon.png'}
						width={300}
						height={300}
					/>
				</div>

				<div className="p-4 bg-primary">
					<div className="flex justify-between">
						<div className="flex gap-1 *:text-white">
							<h2 className="font-bold">Edad:</h2>
							<span>{edad}</span>
						</div>
						<div className="flex gap-1 *:text-white ">
							<h2 className="font-bold">Sexo:</h2>
							{/* <span>{sexo.sexo}</span> */}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
