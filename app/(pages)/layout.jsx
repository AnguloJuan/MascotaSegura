import "@/styles/styles.css";
import Menu from "@/components/menu/menu";
import 'bootstrap/dist/css/bootstrap.css';
import jwt from "jsonwebtoken";

const name = 'Mascota Segura';
export const siteTitle = 'Mascota Segura';
const SECRET_KEY = process.env.SECRET_KEY;

export async function ValidateUser(context) {
  // Get the JWT token from the request headers or cookies
  console.log(1);
  const token = context.req.headers.authorization?.replace('Bearer ', '');
  
  console.log(2);
  if (!token) {
    // Redirect if the token is missing
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  try {
    console.log(3);
    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, SECRET_KEY);
    
    // Retrieve the user ID from the decoded token
    console.log(decodedToken);
    const userId = decodedToken.userId;
    
    console.log(userId);
    // Fetch the user data from the database using the user ID
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
    } catch (e) {
      console.log(e);
    }
    
    console.log(4);
    if (!user) {
      // Redirect if the user does not exist
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    console.log(5);
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    // Redirect if the token is invalid or expired
    console.log(error);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

export default function RootLayout({ children }) {
  //const adoptante = ValidateUser();
  //const user = adoptante.tipoUsuario == 1 && "user";
  const user = "user"
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
        <Menu menuType={user.tipoUsuario} />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}