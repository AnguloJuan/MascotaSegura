import Link from 'next/link';

export default function CardUser({ items }) {
	return (
		<Link
			href={`/empleados/empleado/${items.id}`}
			className="max-w-[300px] w-full rounded-md shadow-lg shadow-zinc-600 overflow-hidden relative 
            shrink-0 py-8 px-6 bg-zinc-100 flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
		>
			<span className="absolute top-2 left-2 bg-[--primaryColor] text-white px-4 py-1 rounded-full">
				{items.id}
			</span>
			<div className="absolute rounded-full bg-gray-500 z-20 left-1/2 top-[44%] h-[110%] w-[110%] -translate-x-1/2"></div>
			<div className="para uppercase text-center leading-none z-40">
				<h1 className="font-bold">{items.nombre} </h1>
			</div>
			<div className="img w-[180px] aspect-square bg-gray-100 z-40 rounded-md">
				<img
					src={items.imagen || '/images/defaultUser.png'}
					alt={items.nombre}
					className=""
				/>
			</div>
			<div className="z-40 flex flex-row justify-between items-end gap-10">
				<div className="flex flex-col items-start gap-1">
					<div className="flex flex-row gap-2">
						<h2 className="font-semibold text-md text-white">{items.correo}</h2>
					</div>
				</div>
			</div>
		</Link>
	);
}
