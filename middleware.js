import { NextResponse } from 'next/server';
import { GetUser } from '@/app/lib/user';

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
	// Get user from the api request /api/user
	const url = new URL('/api/user', req.url);
	const response = await fetch(url, {
		headers: req.headers,
	}).then((res) => res.json());
	const user = response.user;

	if (user.idTipoUsuario == 0) {
		return NextResponse.redirect(new URL('/login', req.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: '/adopcion/mascota/:path*',
};
