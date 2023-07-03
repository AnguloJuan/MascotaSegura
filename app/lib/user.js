import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.SECRET_KEY;

export function GetUser() {
  const cookiesManager = cookies();
  const token = cookiesManager.get('token');

  if (token) {
    try {
      // Verify and decode the JWT token
      const user = jwt.verify(token.value, SECRET_KEY);
      return user;
    } catch (error) {
      // Redirect if the token is invalid or expired
      console.log(error);
      return null;
    }
  }

  return null;
}
