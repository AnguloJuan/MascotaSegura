'use client';
import Toast, { useToast } from '@/components/Toast';

export default function page() {
	const { addToast } = useToast();

	const handleButtonClick = () => {
		addToast('Hola Mundo!');
	};

	return (
		<section className="grid">
			<button onClick={handleButtonClick}>Mostrar Toast</button>
			<Toast />
		</section>
	);
}
