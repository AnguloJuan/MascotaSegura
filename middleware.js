import { NextResponse } from 'next/server';
import { GetUser } from '@/app/lib/user';

// This function can be marked `async` if using `await` inside
export function middleware(req) {
	const { idTipoUsuario } = GetUser();

	if (idTipoUsuario !== 0) {
		return NextResponse.next();
	}
	return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
	matcher: '/adopcion/mascota/:path*',
};
