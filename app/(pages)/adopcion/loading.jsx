import React from 'react';

export default function Loading() {
	return (
		<div className="h-screen w-full grid place-items-center">
			<div className="size-36 animate-spin border-x-4 border-blue-600 rounded-full" />
		</div>
	);
}
