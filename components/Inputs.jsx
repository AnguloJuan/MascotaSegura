import { IconSearch } from '@tabler/icons-react';

export function Input({
	id,
	type = 'text',
	label,
	placeholder,
	onChange,
	name,
	value,
	disabled,
	required = false,
	className,
}) {
	return (
		<div className="flex flex-col gap-1 h-max min-w-[100px]">
			{label && (
				<label htmlFor={id} className="font-bold">
					{label}
					{required ? '*' : ''}
				</label>
			)}
			<div className="flex border-black border-2 rounded-lg overflow-hidden">
				<input
					id={id}
					type={type}
					name={name || id}
					placeholder={placeholder}
					onChange={onChange ? onChange : () => { }}
					value={value}
					className={`py-2 px-4   
				focu:outline outline-[--primaryColor] outline-offset-4 ${className}`}
					required={required}
					disabled={disabled}
				/>
			</div>
		</div>
	);
}

export function InputBuscar({
	id,
	type = 'text',
	label,
	placeholder,
	onChange,
	name,
	value,
	disabled,
	required = false,
	className,
	onClick,
	btnText = 'Buscar',
}) {
	return (
		<div className="flex flex-col gap-1 h-max min-w-[100px] max-w-max">
			{label && (
				<label htmlFor={id} className="font-bold">
					{label}
					{required ? '*' : ''}
				</label>
			)}
			<div className="flex border-black border-2 rounded-lg overflow-hidden">
				<input
					id={id}
					type={type}
					name={name || id}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					className={`py-2 px-4   
		focu:outline outline-[--primaryColor] outline-offset-4 ${className}`}
					required={required}
					disabled={disabled}
				/>
				<button
					onClick={onClick}
					className="flex place-items-center gap-2 min-h-max text-white px-5 md:px-3 
					bg-[--primaryColor] hover:bg-[--hoverPrimaryColor]"
				>
					<span>
						<IconSearch />
					</span>
					<h2 className="hidden md:block">{btnText}</h2>
				</button>
			</div>
		</div>
	);
}

export function Checkbox({ text, id, value, onChange }) {
	return (
		<div className="flex gap-3">
			<label htmlFor={id}>{text}</label>
			<input
				type="checkbox"
				name={id}
				id={id}
				value={value}
				onChange={onChange}
				className="transition-all duration-500 ease-in-out w-5 h-5"
			/>
		</div>
	);
}
export function InputFile({
	id,
	onChange,
	accept,
	required = false,
	className,
}) {
	return (
		<input
			id={id}
			type="file"
			name={id}
			onChange={onChange}
			accept={accept}
			className={`flex h-10 w-max rounded-md border border-black bg-white px-3 py-2 text-sm 
            text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm 
			file:font-medium ${className}`}
			required={required}
		/>
	);
}
