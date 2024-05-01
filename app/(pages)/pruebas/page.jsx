'use client';
import messages from '@/app/lib/messageToast';
import Button from '@/components/Button';
import { Each } from '@/components/Each';
import Toast from '@/components/Toast';
import { useState } from 'react';

export default function Page() {
	const [toasts, setToasts] = useState([]);

	const showToast = (message, type) => {
		setToasts((toasts) => [...toasts, { message, type }]);
		setTimeout(() => removeToast(id), 5000);
	};

	const removeToast = (id) => {
		setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
	};

	return (
		<section>
			<Button
				text="Agregar toasts"
				onClick={() => showToast('message', 'error')}
			/>
			<Each
				of={toasts}
				render={(toast) => (
					<Toast
						key={toast.id}
						message={toast.message}
						type={toast.type}
						onClose={() => removeToast(toast.id)}
					/>
				)}
			/>
		</section>
	);
}
