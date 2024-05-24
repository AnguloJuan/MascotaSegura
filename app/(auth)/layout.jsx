export const metadata = {
	title: {
		template: '%s | MascotaSegura',
		default: 'MascotaSegura', // a default is required when creating a template
	},
	icons: {
		icon: '/images/logo.png',
	},
};

export default function RootLayout({ children }) {
	return (
		<main>
			{children}
		</main>
	);
}
