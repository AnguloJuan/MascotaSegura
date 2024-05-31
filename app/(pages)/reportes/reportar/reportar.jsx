'use client';
import { useState } from 'react';
import { Dialog } from '@/components/dialogs';
import { useRouter } from 'next/navigation';
import { Estados } from '@/components/Selects';
import { Municipios } from '@/components/Selects';
import { Input, InputFile } from '@/components/Inputs';
import Button from '@/components/Button';
import Toast, { useToast } from '@/components/Toast';
import postImage from '@/app/lib/cloudinaryActions';

export default function Reportar({ props }) {
	const userType = props.user.idTipoUsuario;
	const [reporte, setReporte] = useState({
		descripcion: '',
		municipio: 0,
		nombre: '',
		correo: '',
		idReportador: props.user.id,
		estado: 0,
	});
	const [unmodified, setUnmodified] = useState(true);
	const [warningDialog, setWarningDialog] = useState(false);
	const [image, setImage] = useState(null);
	const router = useRouter();
	const { addToast } = useToast();

	const handleInputChange = (e) => {
		setUnmodified(false);
		const { name, value } = e.target;

		if (name === "nombre" && !value.match(/^[a-zA-Z]+$/)) {
			return;
		}
		if (name === "correo" &&
			!value.match(
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
			)
		) {
			return;
		}

		setReporte((prevCriteria) => ({ ...prevCriteria, [name]: value }));
	};
	const handleEstadoChange = (e) => {
		setUnmodified(false);
		const { name, value } = e.target;
		setReporte((prevCriteria) => ({ ...prevCriteria, [name]: value }));
		// Reset selected municipio when estado reporte
		setReporte((prevCriteria) => ({ ...prevCriteria, municipio: 0 }));
	};

	const reportar = async (e) => {
		setWarningDialog(false);
		setUnmodified(true);
		if (!reporte.municipio || !reporte.descripcion) {
			addToast('No se pueden dejar campos con datos vacios', 'warning');
			return;
		}
		if (userType !== 1 && (!reporte.nombre || !reporte.correo)) {
			addToast('No se pueden dejar campos con datos vacios', 'warning');
			return;
		}
		try {
			const body = new FormData();
			body.set('reporte', JSON.stringify(reporte));
			body.set('userType', JSON.stringify(userType));

			if (image) {
				body.set('image', await postImage(body, image));
			} else {
				body.set('image', null);
			}

			const response = await fetch('/api/reportes', {
				method: 'POST',
				body,
			});
			if (response.status == 200) {
				addToast(
					'El reporte ha sido guardados correctamente en la base de datos',
					'success'
				);
				response
					.json()
					.then((res) => router.replace(`/reportes/reporte/${res.reporte.id}`));
			} else {
				response.json().then((res) => console.log(res.message));
				addToast('Ha ocurrido un error en el servidor', 'error');
				setUnmodified(false);
			}
		} catch (error) {
			addToast('Ha ocurrido un error en el servidor', 'error');
			setUnmodified(false);
		}
	};

	return (
		<>
			<h1 className="text-6xl">Información del reporte</h1>
			<form className="space-y-3">
				<div className="flex gap-9">
					<InputFile
						id="perfil"
						type="file"
						name="perfil"
						accept="image/*, .jpg, .png, .svg, .webp, .jfif"
						onFileUpload={(image) => setImage(image)}
					/>
					<div className="w-full space-y-3">
						{userType !== 1 && (
							<>
								<Input
									id={'nombre'}
									label={'Nombre completo'}
									placeholder={'Nombre completo'}
									value={reporte.nombre}
									name={'nombre'}
									onChange={handleInputChange}
									required
								/>

								<Input
									id={'correo'}
									label={'Correo electrónico'}
									placeholder={'Correo electrónico'}
									value={reporte.correo}
									name={'correo'}
									onChange={handleInputChange}
									required
								/>
							</>
						)}
						<div className="flex gap-3 ">
							<Estados
								onChange={handleEstadoChange}
								value={reporte.estado}
							/>
							<Municipios
								onChange={handleInputChange}
								selectedEstado={reporte.estado}
								value={reporte.municipio}
							/>
						</div>
					</div>
				</div>
				<textarea
					name="descripcion"
					id="descripcion"
					rows="5"
					placeholder="Descripción"
					onChange={handleInputChange}
					value={reporte.descripcion}
					className="py-2 px-4 w-full rounded-lg border-black border-2 
                        focu:outline outline-primary outline-offset-4 resize-none"
					required
				></textarea>

				<center>
					<Button
						type="submit"
						disabled={unmodified}
						onClick={(e) => {
							e.preventDefault();
							reportar();
						}}
						text={'Reportar'}
					/>
				</center>
			</form>
			<Dialog
				id={'warning'}
				isOpen={warningDialog}
				onClose={() => setWarningDialog(false)}
				fun={reportar}
				confirmar={true}
				contenido={
					<>
						<p>Estas por reportar un caso de maltrato animal</p>
						<p>Se investigara y se llevaran acciones legales para este caso</p>
						<p>Haga clic en confirmar para continuar</p>
					</>
				}
			/>
		</>
	);
}
