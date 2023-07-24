import "@/styles/styles.css"
import form from "./form.module.css"
import 'bootstrap/dist/css/bootstrap.css'

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
      <body className={form.form}>
        {children}
      </body>
    </html>
  )
}