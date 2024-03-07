'use client';

import { Checkbox, Input, InputFile } from '@/components/Inputs';
import { Especies, Select } from '@/components/Selects';
import { Dialog } from '@/components/dialogs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Rescate({ especies, idRefugio }) {
	const [mascota, setMascota] = useState({
		nombre: '',
		especie: 0,
		raza: '',
		edad: 0,
		sexo: 0,
		tamano: 0,
		maltratado: false,
		motivo: '',
		cartilla: false,
		idRefugio: idRefugio,
	});
	const [image, setImage] = useState(null);
	const [createObjectURL, setCreateObjectURL] = useState(null);
	const [fieldsDialog, setFieldsDialog] = useState(false);
	const [registradoDialog, setRegistradoDialog] = useState(false);
	const [errorDialog, setErrorDialog] = useState(false);
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

	const uploadToClient = (event) => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];

			setImage(i);
			setCreateObjectURL(URL.createObjectURL(i));
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
			setFieldsDialog(true);
		} else {
			const body = new FormData();
			body.set('mascota', JSON.stringify(mascota));

			if (image) {
				//subir imagen a cloudinary
				body.set('file', image);
				body.set('upload_preset', 'mascotaSegura');

				const data = await fetch(
					'https://api.cloudinary.com/v1_1/dyvwujin9/image/upload',
					{
						method: 'POST',
						body,
					}
				).then((r) => r.json());

				body.set('image', data.secure_url);
			} else {
				body.set('image', null);
			}

			const response = await fetch('/api/mascotas', {
				method: 'POST',
				body,
			});
			if (response.status == 200) {
				setRegistradoDialog(true);
				response
					.json()
					.then((response) =>
						router.replace(`/adopcion/mascota/${parseInt(response.id.id)}`)
					);
			} else {
				response.json().then((res) => console.log(res.message));
				setErrorDialog(true);
			}
		}
	};

	return (
		<section>
			<form className="flex flex-col gap-6">
				<div className="flex gap-6">
					<div>
						<img
							src={createObjectURL || '/images/dogIcon.png'}
							alt="upload image"
							className=" object-contain aspect-video object-top"
						/>

						<InputFile
							id="perfil"
							onChange={uploadToClient}
							accept="image/*, .jpg, .png, .svg, .webp, .jfif"
							required
						/>
					</div>
					<div className="w-full">
						<Input
							id="nombre"
							label="Nombre"
							type="text"
							placeholder="Nombre"
							name="nombre"
							onChange={handleInputChange}
							required
						/>
						<Especies
							especies={especies}
							handleChange={handleInputChange}
							required={true}
						/>
						<Input
							id="raza"
							label="Raza"
							placeholder="Raza"
							name={'raza'}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="flex gap-6">
					<Input
						id="edad"
						type="number"
						label="Edad"
						placeholder="Edad"
						name="edad"
						onChange={handleInputChange}
					/>

					<Select
						handleChange={handleInputChange}
						required
						items={['Macho', 'Hembra']}
						label="Sexo"
					/>

					<Select
						handleChange={handleInputChange}
						required
						placeholder="Selecciona el tamaño"
						label="Tamaño"
					>
						<option value={1}>No especificado</option>
						<option value={2}>Diminuto</option>
						<option value={3}>Pequeño</option>
						<option value={4}>Mediano</option>
						<option value={5}>Grande</option>
						<option value={6}>Enorme</option>
					</Select>
				</div>

				<div className="flex flex-row gap-4">
					<div className="d-flex flex-column align-items-center">
						<Checkbox
							name="maltratado"
							id="maltratado"
							value={false}
							onChange={handleTernary}
							text="¿Ha sido maltratado?"
						/>
					</div>
					<div className="flex flex-column align-items-center">
						<Checkbox
							name="cartilla"
							id="cartilla"
							value={false}
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
						className="py-2 px-4 w-full rounded-lg border-black border-2 
                        focu:outline outline-[--primaryColor] outline-offset-4 resize-none"
					></textarea>
				</div>
				<button
					className="bg-[--primaryColor] text-2xl text-white w-max px-8 py-2 rounded-lg
                     hover:bg-[--hoverPrimaryColor] transition-colors duration-500"
					type="submit"
					onClick={uploadToServer}
				>
					Registrar
				</button>
			</form>

			<Dialog
				id={'errorRellenado'}
				isOpen={fieldsDialog}
				onClose={() => setFieldsDialog(false)}
			>
				<h1>Error de rellenado</h1>
				<p>Rellena los campos obligatorios antes de registrar la mascota</p>
			</Dialog>
			<Dialog
				id={'registrado'}
				isOpen={registradoDialog}
				onClose={() => setRegistradoDialog(false)}
			>
				<h1>Mascota registrada</h1>
				<p>La mascota ha sido registrada en el sistema</p>
				<p>Espere un momento en lo que es redirigido a su perfil</p>
			</Dialog>
			<Dialog
				id={'error'}
				isOpen={errorDialog}
				onClose={() => setErrorDialog(false)}
			>
				<h1>Error de servidor</h1>
				<p>Ha ocurrido un error en el servidor</p>
				<p>Vuelva a intentarlo más tarde</p>
			</Dialog>
		</section>
	);
}
