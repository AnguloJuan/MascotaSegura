import "@/styles/styles.css";
import Menu from "@/components/menu/menu";
import 'bootstrap/dist/css/bootstrap.css';

export const metadata = {
  title: {
    template: '%s | MascotaSegura',
    default: 'MascotaSegura', // a default is required when creating a template
  },
  icons: {
    icon: '/images/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Menu />
        <main>
          {children}
        </main>
      </body>
    </html >
  )
}