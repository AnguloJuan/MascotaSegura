export default function Input({
	id,
	type,
	name,
	label,
	placeholder,
	onChange,
	value,
	disabled,
	required,
}) {
	return id !== '' ? (
		<>
			<div className="flex flex-col h-full w-full">
				{label && (
					<label htmlFor={id} className="font-bold">
						{label}
					</label>
				)}
				<input
					id={id}
					type={type}
					name={name}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					className="py-2 px-4 w-full rounded-lg border-black border-2 focu:outline outline-[--primaryColor] outline-offset-4 "
					required={required}
					disabled={disabled}
				/>
			</div>
		</>
	) : (
		<></>
	);
}
