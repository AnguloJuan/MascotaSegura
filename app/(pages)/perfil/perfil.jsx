'use client';
import Button from '@/components/Button';
import { Input, InputFile } from '@/components/Inputs';
import Popover from '@/components/Popover';
import { Dialog } from '@/components/dialogs';
import { IconMenuDeep } from '@tabler/icons-react';
import { useState } from 'react';

export default function Perfil({ props }) {
	const dataUser = props.user;
	const { imagen, nombre, apellido, correo, telefono, id } = dataUser;
	const [editar, setEditar] = useState(false);

	return (
		<>
			<div className="flex py-8 justify-between">
				<div className="flex gap-8">
					<img
						src={imagen || '/images/defaultUser.png'}
						alt=""
						loading="lazy"
						className="size-32 object-cover rounded-full"
					/>
					<div>
						<h2 className="text-3xl">
							{nombre} {apellido}
						</h2>
						<h2 className="text-lg">{correo}</h2>
						<h2 className="text-lg">{telefono}</h2>
					</div>
				</div>
				<Popover icon={<IconMenuDeep />}>
					<button
						className="bg-primary hover:bg-primaryHover w-full py-1 px-2 text-white rounded-lg"
						onClick={() => setEditar(true)}
					>
						Editar Mi Cuenta
					</button>
					<button className="bg-red-600 hover:bg-red-500 w-full py-1 px-2 text-white rounded-lg">
						Eliminar Mi Cuenta
					</button>
				</Popover>
			</div>
			<Dialog
				isOpen={editar}
				onClose={() => setEditar(false)}
				encabezado={'Editar'}
			>
				<form className="">
					<div className="space-y-3">
						<InputFile
							id="perfil"
							name="perfil"
							onFileUpload={(image) => {}} //setImage(image)
							accept="image/*, .jpg, .png, .svg, .webp, .jfif"
							image={imagen}
							className="mx-auto"
						/>
						<Input
							id={'nombre'}
							label={'Nombre'}
							placeholder={'Nombre'}
							name={'nombre'}
							value={nombre}
							onChange={() => {}}
						/>
						<Input
							id={'apellido'}
							label={'Apellido'}
							placeholder={'Apellido'}
							name={'apellido'}
							onChange={() => {}}
							value={apellido}
						/>
						<Input
							id={'correo'}
							label={'Correo electronico'}
							placeholder={'Correo electrónico'}
							onChange={() => {}}
							value={correo}
						/>
						<Input
							id={'numero'}
							type={'number'}
							label={'Numero de telefono'}
							placeholder={'Numero de telefono'}
							name={'telefono'}
							onChange={() => {}}
							value={telefono}
						/>
						<div className="flex gap-5">
							{/* <Estados onChange={() => {}} estados={} value={''} />
							<Municipios
								onChange={() => {}}
								municipiosInicial={}
								selectedEstado={adoptante.estado}
								value={''}
							/> */}
						</div>
						<div className="contenedor-btn d-flex flex-row justify-content-center gap-2 m-3">
							<Button
								type="submit"
								onClick={() => {}}
								disabled={true}
								text="Guardar"
							/>
						</div>
					</div>
				</form>
			</Dialog>
		</>
	);
}
