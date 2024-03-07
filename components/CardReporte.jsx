import Image from 'next/image';
import Link from 'next/link';

export default function CardReporte({
	imagen,
	id,
	fechaCreada,
	municipio,
	descripcion,
}) {
	return (
		<Link
			key={id}
			href={`/reportes/reporte/${id}`}
			className="link-dark link-underline-opacity-0 pt-1"
		>
			<div className="">
				<div className="">
					<Image
						width={100}
						height={100}
						src={imagen || '/images/defaultReporte.png'}
						alt={`ImagenReporte${id}`}
						loading="lazy"
						className="rounded-circle"
					/>
				</div>
				<div className="">
					<p className="text-secondary fw-lighter pt-3">Id: {id}</p>
					<p>Fecha reportada: {new Date(fechaCreada).toLocaleString()}</p>
					<p>
						Ubicación: {municipio.estado.nombre}, {municipio.nombre}
					</p>
					<p>Descripción: {descripcion}</p>
				</div>
			</div>
		</Link>
	);
}
