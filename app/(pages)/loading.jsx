import s from './loader.module.css';
export default async function loading() {
	return (
		<section className="grid place-content-center gap-6 h-screen">
			<div className={`${s.wheel_and_hamster}`}>
				<div className={`${s.wheel}`}></div>
				<div className={`${s.hamster}`}>
					<div className={`${s.hamster__body}`}>
						<div className={`${s.hamster__head}`}>
							<div className={`${s.hamster__ear}`}></div>
							<div className={`${s.hamster__eye}`}></div>
							<div className={`${s.hamster__nose}`}></div>
						</div>
						<div className={`${s.hamster__limb} ${s.hamster__limb_fr}`}></div>
						<div className={`${s.hamster__limb} ${s.hamster__limb_fl}`}></div>
						<div className={`${s.hamster__limb} ${s.hamster__limb_br}`}></div>
						<div className={`${s.hamster__limb} ${s.hamster__limb_bl}`}></div>
						<div className={`${s.hamster__tail}`}></div>
					</div>
				</div>
				<div className={`${s.spoke}`}></div>
			</div>
			<h1 className="text-3xl">Cargando...</h1>
		</section>
	);
}
