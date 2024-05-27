'use client';

import postImage from '@/app/lib/cloudinaryActions';
import { Checkbox, Input, InputFile } from '@/components/Inputs';
import { Especies, Razas, Sexos, Tamanos } from '@/components/Selects';
import { useToast } from '@/components/Toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Rescate({ idRefugio }) {
	const [mascota, setMascota] = useState({
		nombre: '',
		especie: 0,
		raza: 0,
		edad: 0,
		sexo: 0,
		tamano: 0,
		maltratado: false,
		motivo: '',
		cartilla: false,
		idRefugio: idRefugio,
	});
	const [image, setImage] = useState(null);

	const { addToast } = useToast();
	const router = useRouter();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name == 'edad' && value < 0) {
			return;
		}
		setMascota((prevCriteria) => ({ ...prevCriteria, [name]: value }));
	};

	const handleTernary = (e) => {
		let value;
		if (e.target.name == 'maltratado') {
			value = mascota.maltratado
				? (mascota.maltratado = false)
				: (mascota.maltratado = true);
			setMascota((prevCriteria) => ({ ...prevCriteria, maltratado: value }));
		} else if (e.target.name == 'cartilla') {
			value = mascota.cartilla
				? (mascota.cartilla = false)
				: (mascota.cartilla = true);
			setMascota((prevCriteria) => ({ ...prevCriteria, cartilla: value }));
		}
	};

	const uploadToServer = async (e) => {
		e.preventDefault();
		if (
			!mascota.nombre ||
			!mascota.especie ||
			!mascota.sexo ||
			!mascota.tamano ||
			mascota.edad < 0
		) {
			addToast(
				'Rellena los campos obligatorios antes de registrar la mascota.',
				'warning'
			);
		} else {
			const body = new FormData();
			body.set('mascota', JSON.stringify(mascota));

			if (image) {
				body.set('image', await postImage(body, image));
			} else {
				body.set('image', null);
			}

			const response = await fetch('/api/mascotas', {
				method: 'POST',
				body,
			});
			if (response.status == 200) {
				addToast('La mascota ha sido registrada en el sistema', 'success');
				response
					.json()
					.then((response) =>
						router.replace(`/adopcion/mascota/${parseInt(response.id.id)}`)
					);
			} else {
				response.json().then((res) => console.log(res.message));
				addToast('Ha ocurrido un error en el servidor', 'error');
			}
		}
	};

	return (
		<>
			<form className="flex flex-col gap-6">
				<div className="grid grid-cols-2 min-h-[300px] gap-6">
					<div className="grid place-content-center">
						<InputFile
							id="perfil"
							accept="image/*, .jpg, .png, .svg, .webp, .jfif"
							onFileUpload={(image) => setImage(image)}
						/>
					</div>
					<div className="flex flex-col justify-center gap-7">
						<div>
							<label htmlFor="nombre" className="font-bold">
								Nombre *
							</label>
							<Input
								id="nombre"
								label="Nombre"
								type="text"
								placeholder="Nombre"
								name="nombre"
								onChange={handleInputChange}
								required
								className="w-full"
								value={mascota.nombre}
							/>
						</div>
						<Especies
							onChange={handleInputChange}
							required={true}
							className="w-full"
							value={mascota.especie}
						/>
						<Razas
							onChange={handleInputChange}
							selectedEspecie={mascota.especie}
							className="w-full"
							value={mascota.raza}
						/>
					</div>
				</div>
				<div className="flex items-end gap-6">
					<div>
						<label htmlFor="edad" className="font-bold">
							Edad *
						</label>
						<Input
							id="edad"
							type="number"
							label="Edad"
							placeholder="Edad"
							name="edad"
							required
							onChange={handleInputChange}
							value={mascota.edad}
						/>
					</div>

					<Sexos
						onChange={handleInputChange}
						required={true}
						value={mascota.sexo}
					/>

					<Tamanos
						onChange={handleInputChange}
						required
						placeholder="Selecciona el tamaño"
						label="Tamaño"
						value={mascota.tamano}
					/>
				</div>

				<div className="flex flex-row gap-4">
					<div className="d-flex flex-column align-items-center">
						<Checkbox
							name="maltratado"
							id="maltratado"
							value={mascota.maltratado}
							onChange={handleTernary}
							text="¿Ha sido maltratado?"
						/>
					</div>
					<div className="flex flex-column align-items-center">
						<Checkbox
							name="cartilla"
							id="cartilla"
							value={mascota.cartilla}
							onChange={handleTernary}
							text="¿Cuenta con cartilla de vacunación?"
						/>
					</div>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="motivo" className="font-bold">
						Motivo de abandono
					</label>
					<textarea
						name="motivo"
						id="motivo"
						rows="4"
						onChange={handleInputChange}
						value={mascota.motivo}
						className="py-2 px-4 w-full rounded-lg border-black border-2 
                        focu:outline outline-prbg-primary outline-offset-4 resize-none"
					></textarea>
				</div>
				<button
					className="bg-primary text-2xl text-white w-max px-8 py-2 rounded-lg
                     hover:bg-primaryHover transition-colors duration-500"
					type="submit"
					onClick={uploadToServer}
				>
					Registrar
				</button>
			</form>
		</>
	);
}
