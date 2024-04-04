import { NextResponse } from 'next/server';
import { GetUser } from '@/app/lib/user';

const user = GetUser();
export async function middleware(req) {
	console.log(user);

	if (user.idTipoUsuario == 0) {
		return NextResponse.redirect(new URL('/login', req.url));
	} else {
		return NextResponse.next();
	}
}

export const config = {
	matcher: '/adopcion/mascota/:path*',
};
