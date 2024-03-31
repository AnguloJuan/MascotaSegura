// pages/api/user.js
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.SECRET_KEY;

const anonUser = {
	id: 0,
	idTipoUsuario: 0,
};

export async function GET(req) {
  const token = req.cookies.get('user');
  
  if (!token) {
    return NextResponse.json({ user: anonUser }, { status: 200 });
  }
  
  try {
    const user = jwt.verify(token.value, SECRET_KEY);
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}