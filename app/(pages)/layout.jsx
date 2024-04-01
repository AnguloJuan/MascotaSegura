import Menu from '@/components/menu/menu';
import { AuthProvider } from '@/context/AuthContext';
import { Suspense } from 'react';
import Loading from './loading';

export default async function RootLayout({ children }) {
	return (
		<AuthProvider>
			<Menu />
			<div className="w-[240px]" />
			<Suspense fallback={<Loading />}>
				<main className="px-10 py-6">{children}</main>
			</Suspense>
		</AuthProvider>
	);
}
