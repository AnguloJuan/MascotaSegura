import "@/styles/styles.css";
import Menu from "@/components/menu/menu";
import 'bootstrap/dist/css/bootstrap.css';

const name = 'Mascota Segura';
export const siteTitle = 'Mascota Segura';

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


export default async function RootLayout({ children }) {
  const userType = await GetUserType();
  console.log(userType);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
        <meta
          property="og:image"
          content={"/images/logo.png"}
        />
        <meta name="og:title" content={siteTitle} />
        <title>Mascota Segura</title>
      </head>
      <body>
        <Menu user={userType}/>
        <main>
          {children}
        </main>
      </body>
    </html >
  )
}