import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.SECRET_KEY;

export async function GetUserType() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  try {
    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token.value, SECRET_KEY);

    // Retrieve the user ID from the decoded token
    const userId = decodedToken.idTipoUsuario;

    return userId;
  } catch (error) {
    // Redirect if the token is invalid or expired
    console.log(error);
    return 0;
  }
}