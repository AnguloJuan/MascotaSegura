'use client';
import { useState } from 'react';

export default function ToolTip({ children, text }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative h-min">
			<div
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
			>
				{children}
			</div>
			{isOpen && (
				<div
					className="absolute top-0 right-0 mr-4 px-3 py-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
					onMouseEnter={() => setIsOpen(true)}
					onMouseLeave={() => setIsOpen(false)}
				>
					<h3 className="text-xl">{text}</h3>
				</div>
			)}
		</div>
	);
}
