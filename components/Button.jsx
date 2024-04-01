import React from 'react';

export default function Button({ onClick, text, className, type }) {
	return (
		<button
			onClick={onClick}
			className={`bg-[--primaryColor] hover:bg-[--hoverPrimaryColor] h-full px-7 py-2 
			rounded-lg text-white font-semibold ${className}`}
			type={type}
		>
			{text}
		</button>
	);
}
