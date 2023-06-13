import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.SECRET_KEY;
let user;

export function GetUser() {

  if (!user) {
    const cookiesManager = cookies();
    const token = cookiesManager.get('token');

    try {
      // Verify and decode the JWT token
      user = jwt.verify(token.value, SECRET_KEY);
      
    } catch (error) {
      // Redirect if the token is invalid or expired
      console.log(error);
      return 0;
    }
  }
  return user;
}