import "@/styles/styles.css";
import Menu from "@/components/menu/menu";
import 'bootstrap/dist/css/bootstrap.css';

const name = 'Mascota Segura';
export const siteTitle = 'Mascota Segura';

export default async function RootLayout({ children }) {
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
        <Menu/>
        <main>
          {children}
        </main>
      </body>
    </html >
  )
}