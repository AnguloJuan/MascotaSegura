'use client';
import { IconX } from '@tabler/icons-react';
import Button from './Button';

export function Dialog({
	id,
	isOpen,
	onClose,
	okDialog,
	confirmar,
	fun,
	encabezado,
	contenido,
	children,
}) {
	const handleClose = () => {
		onClose();
	};

	const handleConfirm = () => {
		fun();
	};

	return (
		<div
			id={id}
			className={`fixed p-10 inset-0  overflow-y-auto ${
				isOpen ? 'grid' : 'hidden'
			}  place-items-center size-full bg-black/70 z-50`}
		>
			<div className="relative max-w-xl bg-white p-10 rounded-xl space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-4xl">{encabezado} </h1>
					<button
						onClick={handleClose}
						className=" hover:ring-2 ring-zinc-400 rounded-lg transition-all"
					>
						<IconX size={35} />
					</button>
				</div>
				{children && <>{children}</>}
				{contenido && (
					<>
						{contenido}
						{okDialog && <Button onClick={handleClose} text="Ok" />}
						{confirmar && (
							<div className="flex justify-end gap-5">
								<Button
									type="button"
									className="bg-red-600 hover:bg-red-500"
									onClick={handleClose}
								>
									Cancelar
								</Button>
								<Button type="button" onClick={handleConfirm}>
									Confirmar
								</Button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
