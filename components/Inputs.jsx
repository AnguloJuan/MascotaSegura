'use client';
import { IconFileUpload, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

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
	readOnly = false,
}) {
	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label htmlFor={id} className="font-bold">
					{label}
					{required ? '*' : ''}
				</label>
			)}
			<input
				id={id}
				type={type}
				name={name || id}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				className={`py-2 px-4 focu:outline outline-[--primaryColor] outline-offset-4 border-black border-2 rounded-lg ${className}`}
				required={required}
				disabled={disabled}
				readOnly={readOnly}
			/>
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
		<div className="flex flex-col gap-1">
			{label && (
				<label htmlFor={id} className="font-bold">
					{label}
					{required ? '*' : ''}
				</label>
			)}
			<div className="flex border-black w-max border-2 rounded-lg overflow-hidden">
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
export function InputFile({ id, accept, required = false, className }) {
	const [image, setImage] = useState(null);
	const [createObjectURL, setCreateObjectURL] = useState(null);
	const uploadToClient = (event) => {
		event.preventDefault();
		const files = event.target.files || event.dataTransfer.files;
		if (files && files[0]) {
			const i = files[0];
			setImage(i);
			setCreateObjectURL(URL.createObjectURL(i));
		}
	};

	return (
		<div>
			<label
				htmlFor={id}
				className={`relative grid place-items-center h-80 w-80 border-dashed border-2
			 border-black rounded-lg cursor-pointer ${className}`}
				onDrop={uploadToClient}
				onDragOver={(event) => {
					event.preventDefault();
				}}
			>
				{createObjectURL ? (
					<img
						src={createObjectURL}
						alt="imagen de usuario"
						className="absolute top-0 left-0 w-full h-full object-cover"
					/>
				) : (
					<div className="flex flex-col justify-center items-center ">
						<IconFileUpload size={128} stroke={1} />
						<span>Click para subir una imagen</span>
						<span>o</span>
						<span>Arrastre una imagen</span>
					</div>
				)}

				<input
					id={id}
					type="file"
					name={id}
					onChange={uploadToClient}
					accept={accept}
					className={`hidden`}
					required={required}
				/>
			</label>
		</div>
	);
}
