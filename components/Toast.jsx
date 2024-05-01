'use client';

import {
	IconAlertTriangle,
	IconCircleCheck,
	IconHexagonLetterX,
	IconX,
} from '@tabler/icons-react';

export default function Toast({ message, type, onClose }) {
	const styleType = {
		success: {
			bg: 'bg-green-100',
			iconStyle: 'bg-green-300 text-green-700',
			lineColor: 'bg-green-500',
			icon: <IconCircleCheck />,
		},
		warning: {
			bg: 'bg-yellow-100',
			iconStyle: 'bg-yellow-300 text-yellow-700',
			lineColor: 'bg-yellow-500',
			icon: <IconAlertTriangle />,
		},
		error: {
			bg: 'bg-red-100',
			iconStyle: 'bg-red-300 text-red-700',
			lineColor: 'bg-red-500',
			icon: <IconHexagonLetterX />,
		},
	};

	return (
		<div
			className={`relative w-full max-w-sm p-4 text-gray-500 ${styleType[type].bg} rounded-lg shadow overflow-hidden`}
		>
			<div className="flex items-center gap-2">
				<div
					className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${styleType[type].iconStyle} rounded-lg `}
				>
					{styleType[type].icon}
				</div>
				<p className="text-sm font-normal">{message}</p>
				<button
					onClick={onClose}
					className="ms-auto -mx-1.5 -my-1.5 text-black hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
				>
					<IconX />
				</button>
				<div
					className={`absolute bottom-0 right-0 ${styleType[type].lineColor} h-1 animate-line-load`}
				/>
			</div>
		</div>
	);
}
