import { Input } from '@/components/Inputs';
import listaRefugios from './refugio.module.css';
import lista from './refugio.module.css';
import actualizar from './refugio.module.css';

export default function registrarRefugio() {
	return (
		<>
			<div className={listaRefugios}>
				<h3>Refugios</h3>

				<div className={listaRefugios.busqueda}>
					<Input
						id={'nombre'}
						label={'Nombre refugio'}
						placeholder={'nombre'}
					/>

					<Input id={'estado'} label={'Estado'} placeholder={'estado'} />
					<Input
						id={'municipio'}
						label={'Municipio'}
						placeholder={'municipio'}
					/>
					<Input
						id={'ubicacion'}
						label={'Ubicacion'}
						placeholder={'ubicacion'}
					/>
				</div>

				<div className={listaRefugios.contenedorBotones}>
					<button type="button" className="btn btn-success">
						Registrar
					</button>
				</div>
			</div>
		</>
	);
}
export function actualizarRefugio() {
	return (
		<>
			<div className={actualizar}>
				<h3>Informacion Refugio</h3>

				<div className={actualizar.busqueda}>
					<Input
						id={'nombre'}
						label={'Nombre refugio'}
						placeholder={'nombre'}
					/>
					<Input id={'estado'} label={'Estado'} placeholder={'estado'} />
					<Input
						id={'municipio'}
						label={'Municipio'}
						placeholder={'municipio'}
					/>
					<Input
						id={'ubicacion'}
						label={'Ubicacion'}
						placeholder={'ubicacion'}
					/>
				</div>
			</div>
			<div className={actualizar.contenedorBotones}>
				<div className={actualizar.buton1}>
					<button>Guardar</button>
				</div>
				<div className={actualizar.buton2}>
					<button>Eliminar refugio</button>
				</div>
			</div>
		</>
	);
}

export function ListaRefugios() {
	return (
		<>
			<div className={lista}>
				<div className={lista.busqueda}>
					<Input id={'nombre'} label={'Nombre'} placeholder={'nombre'} />
					<button type="submit">Buscar</button>
				</div>
				<div className={lista.busquedaAvanzada}>
					<Input id={'estado'} label={'Estado'} placeholder={'Estado'} />
					<Input
						id={'municipio'}
						label={'Municipio'}
						placeholder={'Municipio'}
					/>
				</div>
				<div className={lista.containerRefugios}>
					<div className={lista.info}>
						<p>Nombre</p>
					</div>
					<div className={lista.info}>
						<p>Estado</p>
					</div>
					<div className={lista.info}>
						<p>Municipio</p>
					</div>
				</div>
				<div className={lista.containerRefugios}>
					<div className={lista.info}>
						<p>Nombre</p>
					</div>
					<div className={lista.info}>
						<p>Estado</p>
					</div>
					<div className={lista.info}>
						<p>Municipio</p>
					</div>
				</div>
				<div className={lista.containerRefugios}>
					<div className={lista.info}>
						<p>Nombre</p>
					</div>
					<div className={lista.info}>
						<p>Estado</p>
					</div>
					<div className={lista.info}>
						<p>Municipio</p>
					</div>
				</div>
			</div>
		</>
	);
}
