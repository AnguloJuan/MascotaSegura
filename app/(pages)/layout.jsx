import '@/styles/styles.css';
import Menu from '@/components/menu/menu';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
	subsets: ['latin'],
	weight: '400',
});

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
		<html lang="en">
			<body className={poppins.className}>
				<Menu />
				<div className="w-[240px]" />
				<main className="px-10 py-6">{children}</main>
			</body>
		</html>
	);
}
