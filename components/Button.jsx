export default function Button({
	onClick,
	text,
	className,
	type,
	children,
	...props
}) {
	return (
		<button
			onClick={onClick}
			className={`bg-primary hover:bg-primaryHover h-full px-7 py-2 
			rounded-lg text-white font-semibold ${className}`}
			type={type}
			{...props}
		>
			{text || children}
		</button>
	);
}
