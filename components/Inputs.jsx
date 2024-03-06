export function Input({
	id,
	type,
	name,
	label,
	placeholder,
	onChange,
	value,
	disabled,
	required = false,
	className,
}) {
	return (
		<div className="flex flex-col gap-1 h-max min-w-[200px]">
			{label && (
				<label htmlFor={id} className="font-bold">
					{label}
					{required ? '*' : ''}
				</label>
			)}
			<input
				id={id}
				type={type}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				className={`py-2 px-4 max-w-md rounded-lg border-black border-2 
				focu:outline outline-[--primaryColor] outline-offset-4 ${className}`}
				required={required}
				disabled={disabled}
			/>
		</div>
	);
}

export function Checkbox({ text, name, id, value, onChange }) {
	return (
		<div className="flex gap-3">
			<label htmlFor={id}>{text}</label>
			<input
				type="checkbox"
				name={name}
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
			className={`flex h-10 w-max rounded-md border border-input bg-white px-3 py-2 text-sm 
            text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm 
			file:font-medium ${className}`}
			required={required}
		/>
	);
}
