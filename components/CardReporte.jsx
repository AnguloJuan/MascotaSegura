/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';

export default function CardReporte({
	imagen,
	id,
	fechaCreada,
	municipio,
	descripcion,
}) {
	const date = {
		day: new Date(fechaCreada).getDate().toLocaleString(),
		month: new Date(fechaCreada).getMonth(),
		year: new Date(fechaCreada).getFullYear(),
	};

	const monthMonth = {
		1: 'Ene',
		2: 'Feb',
		3: 'Mar',
		4: 'Abr',
		5: 'May',
		6: 'Jun',
		7: 'Jul',
		8: 'Ago',
		9: 'Sep',
		10: 'Oct',
		11: 'Nov',
		12: 'Dic',
	};
	return (
		<Link
			key={id}
			href={`/reportes/reporte/${id}`}
			className="relative w-[350px] bg-white shadow-lg shadow-zinc-400 p-3 rounded-lg"
		>
			<span className="absolute top-2 left-2 bg-primary text-white px-4 py-1 rounded-full">
				{id}
			</span>
			<span className="absolute top-2 right-2 bg-primary text-white px-4 py-1 rounded-full">
				{`${date.day}/${monthMonth[date.month]}${
					new Date().getFullYear() == date.year ? '' : `/${date.year}`
				}`}
			</span>

			<img
				width={100}
				height={100}
				src={imagen || '/images/defaultReporte.png'}
				alt={`ImagenReporte${id}`}
				className="rounded-md size-24 object-cover"
			/>
			<div className="flex flex-col gap-2">
				<p>
					{municipio.estado.nombre}, {municipio.nombre}
				</p>
				<p className="line-clamp-2">{descripcion}</p>
			</div>
		</Link>
	);
}
