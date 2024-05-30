import Toast from '@/components/Toast';
import '@/styles/styles.css';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata = {
	title: {
		template: '%s | MascotaSegura',
		default: 'MascotaSegura', // a default is required when creating a template
	},
	icons: {
		icon: '/images/logo.png',
	},
};
const poppins = Poppins({
	subsets: ['latin'],
	weight: '400',
});
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${poppins.className}`}>
				<Suspense fallback={<Loading />}>{children}</Suspense>
				<Toast />
			</body>
		</html>
	);
}
