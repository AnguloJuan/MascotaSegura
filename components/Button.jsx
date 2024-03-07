import React from 'react';

export default function Button({ onClick, text }) {
	return (
		<button
			onClick={onClick}
			className="bg-[--primaryColor] h-max px-7 py-2 rounded-lg text-white font-semibold"
		>
			{text}
		</button>
	);
}
