'use client';
import { useState } from 'react';

export default function Popover({ children, icon, text }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative h-min">
			<button
				onClick={handleClick}
				onBlur={() => setIsOpen(false)}
				className="px-3 py-2 rounded flex gap-2"
			>
				{icon || null}
				{text || null}
			</button>

			{isOpen && (
				<div className="absolute top-full right-0 w-56 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
					<div className="py-1 grid place-items-center gap-1 px-1">
						{children}
					</div>
				</div>
			)}
		</div>
	);
}
