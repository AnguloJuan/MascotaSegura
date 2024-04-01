import { NextResponse } from 'next/server';
import { GetUser } from './app/lib/user';

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
	try {
		const user = GetUser();
		if (user.idTipoUsuario == 0) {
			return NextResponse.redirect(new URL('/login', req.url));
		}
	} catch (error) {
		console.log(error);
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/adopcion/mascota/:path*',
};
