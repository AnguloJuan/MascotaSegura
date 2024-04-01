'use client';
import { Input, InputFile } from '@/components/Inputs';
// import { Estados } from '@/components/Selects';
// import { Municipios } from '@/components/SelectsClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { IconMenuDeep } from '@tabler/icons-react';
import Popover from '@/components/Popover';

export default function Perfil({ props }) {
	console.log(props);
	const dataUser = JSON.parse(props.user.value);
	const { imagen, nombre, apellido, correo, telefono, id } = dataUser;
	// console.log(dataUser);

	//formatting date
	function pad(num, size) {
		num = num.toString();
		while (num.length < size) num = '0' + num;
		return num;
	}
	const day = pad(new Date(props.user.fechaRegistro).getDay(), 2);
	const month = pad(new Date(props.user.fechaRegistro).getMonth(), 2);
	const year = new Date(props.user.fechaRegistro).getFullYear();
	const date = `${year}-${month}-${day}`;

	const router = useRouter();
	const userType = props.userType;

	const [unmodified, setUnmodified] = useState(true);

	const [invalidFieldsDialog, setInvalidFieldsDialog] = useState(false);
	const [modifiedDialog, setModifiedDialog] = useState(false);
	const [errorDialog, setErrorDialog] = useState(false);
	const [unmodifiedDialog, setUnmodifiedDialog] = useState(false);
	const [errorCorreoDialog, setErrorCorreoDialog] = useState(false);
	const [adopcionDialog, setAdopcionDialog] = useState(false);
	const [deletedDialog, setDeletedDialog] = useState(false);
	const [warningDialog, setWarningDialog] = useState(false);

	const [image, setImage] = useState(null);
	const [createObjectURL, setCreateObjectURL] = useState(null);
	//const date =  new Date(Date.parse(props.user.fechaRegistro)).toLocaleDateString("es-mx", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'});

	return (
		<>
			<div className="flex py-8 justify-between">
				<div className="flex gap-8">
					{imagen ? (
						<img
							src={imagen}
							alt=""
							loading="lazy"
							className="size-32 object-cover rounded-full"
						/>
					) : (
						<InputFile
							id="perfil"
							name="perfil"
							accept="image/*, .jpg, .png, .svg, .webp, .jfif"
						/>
					)}
					<div className="">
						<h2 className="text-3xl">
							{nombre} {apellido}
						</h2>
						<h2 className="text-lg">{correo}</h2>
						<h2 className="text-lg">{telefono}</h2>
					</div>
				</div>
				<div>
					<Popover
						options={[
							{
								element: 'Actualizar Mis Datos',
								action: () => console.log('eliminar'),
							},
							{
								element: 'Eliminar Mi Cuenta',
								action: () => console.log('eliminar'),
								className: 'bg-red-600 hover:bg-red-500',
							},
						]}
					>
						<IconMenuDeep size={30} />
					</Popover>
				</div>
			</div>
		</>
	);
}
