import '../public/styles/styles.css';
import Menu from "../components/menu/menu";

const name = 'Mascota Segura';
export const siteTitle = 'Mascota Segura';

export default function RootLayout({ children }) {
  var type = "user";

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
        <Menu menuType={type} />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}