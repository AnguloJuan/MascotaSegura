import { NextResponse } from 'next/server';
import { GetUser } from '@/app/lib/user';

export async function middleware(request) {
	const url = new URL('/api/user', request.url);
	const response = await fetch(url, {
		headers: request.headers,
	}).then((res) => res.json());
	const user = response.user;

	if (user.idTipoUsuario == 0) return NextResponse.redirect(new URL('/login', request.url));
	if (request.nextUrl.pathname.startsWith('/adoptantes') && user.idTipoUsuario !== 3) return NextResponse.redirect(new URL('/not-found', request.url));
	if (request.nextUrl.pathname.startsWith('/empleados') && user.idTipoUsuario !== 3) return NextResponse.redirect(new URL('/not-found', request.url));
	if (request.nextUrl.pathname.startsWith('/rescate') && (user.idTipoUsuario === 0 || user.idTipoUsuario === 1)) return NextResponse.redirect(new URL('/not-found', request.url));
	return NextResponse.next();
}

export const config = {
	matcher: [
		'/adopcion/mascota/:path*',
		'/adoptantes/:path*',
		'/empleados/:path*',
		'/rescate/:path*',
	]
};
