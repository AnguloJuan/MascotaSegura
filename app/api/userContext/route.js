import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.SECRET_KEY;

export async function GET(request) {
    console.log(1);
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    
    try {
        // Verify and decode the JWT token
        console.log(2);
        const decodedToken = jwt.verify(token.value, SECRET_KEY);
        
        console.log(3);
        // Retrieve the user ID from the decoded token
        const userId = decodedToken.idTipoUsuario;
        console.log(userId);
        return NextResponse.json(userId, {status:200});
    } catch (error) {
        // Redirect if the token is invalid or expired
        console.log(error);
        return NextResponse.json({message:"something went wrong"}, {status:500});
    }
}