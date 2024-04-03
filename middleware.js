import { NextResponse } from 'next/server';
import { GetUser } from '@/app/lib/user';

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
	const user = await GetUser();
	console.log(user);

	if (user.idTipoUsuario == 0) {
		return NextResponse.redirect(new URL('/login', req.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: '/adopcion/mascota/:path*',
};
