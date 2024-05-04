import Image from 'next/image';
import Link from 'next/link';

export default function CardMascota({
	href,
	src,
	id,
	nombre,
	edad,
	estadoAdopcion,
}) {
	const styleEstado = {
		procesando: 'bg-yellow-400',
		aceptado: 'bg-green-400',
		rechazado: 'bg-red-400',
	};

	return (
		<Link key={id} href={href}>
			<div className="relative w-80 rounded-lg overflow-hidden bg-zinc-50 shadow-lg shadow-zinc-600 transition-shadow">
				<div className="absolute flex justify-between w-full top-0 left-0 p-2 *:px-2  *:rounded-lg">
					<h2 className="text-2xl bg-primary font-semibold text-white">
						{nombre}
					</h2>
					{estadoAdopcion && (
						<span
							className={`font-semibold ${
								styleEstado[estadoAdopcion.toLowerCase()]
							} text-white flex items-center`}
						>
							{estadoAdopcion}
						</span>
					)}
				</div>
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
