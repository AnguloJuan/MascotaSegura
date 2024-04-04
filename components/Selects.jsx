import { Each } from './Each';

export function Especies({ onChange, especies, required, value, className }) {
	return (
		<div className="flex flex-col gap-1 h-max">
			<select
				id="especies"
				onChange={onChange}
				name="especie"
				required={required}
				value={value}
				className={`outline outline-2 py-2 px-4 rounded-lg max-w-full ${className}`}
			>
				<option value="">Selecciona Especie</option>
				{especies.map((especie) => (
					<option key={especie.id} value={especie.id}>
						{especie.especie}
					</option>
				))}
			</select>
		</div>
	);
}
export function Raza({ onChange, razas, className }) {
	return (
		<div className="flex flex-col gap-1 h-max">
			<label htmlFor="raza" className="font-bold">
				Raza
			</label>
			<select
				id="razas"
				onChange={onChange}
				name="raza"
				className={`outline outline-2 py-2 px-4 rounded-lg max-w-md ${className}`}
			>
				<option value="">Selecciona Raza</option>
				<Each
					of={razas}
					render={(item) => (
						<option key={item.id} value={item.raza}>
							{item.raza}
						</option>
					)}
				/>
			</select>
		</div>
	);
}
export function Sexos({ onChange, required, value, className }) {
	return (
		<div className="flex flex-col gap-1 h-max">
			<label htmlFor="sexo" className="font-bold">
				Sexo {required ? '*' : ''}
			</label>
			<select
				id="sexo"
				onChange={onChange}
				name="sexo"
				required={required}
				value={value}
				className={`outline outline-2 py-2 px-4 rounded-lg max-w-md ${className}`}
			>
				<option value="">Selecciona Sexo</option>
				<option value={1}>Macho</option>
				<option value={2}>Hembra</option>
			</select>
		</div>
	);
}
export function Tamanos({ onChange, required, value, className }) {
	return (
		<div className="flex flex-col gap-1 h-max">
			<label htmlFor="tamano" className="font-bold">
				Tamaño{required ? '*' : ''}
			</label>
			<select
				id="tamano"
				onChange={onChange}
				name="tamano"
				required={required}
				value={value}
				className={`outline outline-2 py-2 px-4 rounded-lg max-w-md ${className}`}
			>
				<option value="">Selecciona el tamaño</option>
				<option value={1}>No especificado</option>
				<option value={2}>Diminuto</option>
				<option value={3}>Pequeño</option>
				<option value={4}>Mediano</option>
				<option value={5}>Grande</option>
				<option value={6}>Enorme</option>
			</select>
		</div>
	);
}
export function EstadosReporte({
	onChange,
	required,
	value,
	className,
	disabled,
}) {
	return (
		<div className="flex flex-col gap-1 h-max">
			<label htmlFor="estadoReporte">
				Estado de Reporte {required ? '*' : ''}
			</label>
			<select
				id="estadoReporte"
				onChange={onChange}
				name="estadoReporte"
				required={required}
				value={value}
				disabled={disabled}
				cclassName={`outline outline-2 p-2 rounded-lg max-w-md ${className}`}
			>
				<option value="">Selecciona el estado del reporte</option>
				<option value={1}>Reportado</option>
				<option value={2}>Confirmado</option>
				<option value={3}>En proceso</option>
				<option value={4}>Resuelto</option>
				<option value={5}>Falso</option>
			</select>
		</div>
	);
}
export function Estados({ onChange, estados, value, className, disabled }) {
	return (
		<div className="flex flex-col gap-1 h-max">
			<label htmlFor="estado" className="font-bold">
				Estado
			</label>
			<select
				id="estado"
				onChange={onChange}
				value={value ? value : 0}
				name="estado"
				disabled={disabled}
				className={`outline outline-2 py-2 px-4 rounded-lg max-w-md ${className}`}
			>
				<option value="">Selecciona Estado</option>
				{estados.map((estado) => (
					<option key={estado.id} value={estado.id}>
						{estado.nombre}
					</option>
				))}
			</select>
		</div>
	);
}

export function Select({
	id,
	onChange,
	label,
	placeholder,
	className,
	items,
	children,
	disabled = false,
	required = false,
	value,
}) {
	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label htmlFor={id} className="font-bold">
					{label} {required ? '*' : ''}
				</label>
			)}
			<select
				id={id}
				onChange={onChange}
				name={id}
				className={`outline outline-2 py-2 px-4 rounded-lg max-w-md bg-white ${className} `}
				disabled={disabled}
				required={required}
				value={value}
			>
				<option value="">{placeholder || 'Selecciona una opcion'}</option>
				{items ? (
					<Each
						of={items}
						render={(item, index) => (
							<>
								<option key={index} value={index + 1}>
									{item}
								</option>
							</>
						)}
					/>
				) : (
					children
				)}
			</select>
		</div>
	);
}
