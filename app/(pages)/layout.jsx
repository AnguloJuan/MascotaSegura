import Menu from '@/components/menu/menu';
import { AuthProvider } from '@/context/AuthContext';
import { Suspense } from 'react';
import Loading from './loading';

export default async function RootLayout({ children }) {
	return (
		<AuthProvider>
			<main className="flex h-screen overflow-hidden">
				<Menu />
				<Suspense fallback={<Loading />}>
					<section className="px-10 py-6 overflow-y-auto w-full">
						{children}
					</section>
				</Suspense>
			</main>
		</AuthProvider>
	);
}
