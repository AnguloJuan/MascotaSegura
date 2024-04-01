import { useState } from 'react';
import { Each } from './Each';

export default function Popover({
	children,
	options = [{ element, action, className }],
}) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative">
			<button
				onClick={handleClick}
				onBlur={() => setIsOpen(false)}
				className="px-3 py-2 rounded"
			>
				{children}
			</button>

			{isOpen && (
				<div className="absolute  top-full right-0 w-56 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
					<div className="py-1 grid place-items-center gap-1 px-1">
						{options && (
							<Each
								of={options}
								render={(option) => (
									<button
										onClick={option.action}
										className={`rounded-lg w-full px-4 py-2 bg-[--primaryColor] hover:bg-[--hoverPrimaryColor] text-white ${option.className}`}
										role="menuitem"
									>
										{option.element}
									</button>
								)}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
