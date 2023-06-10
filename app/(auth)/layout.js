import "@/styles/styles.css"
import form from "./form.module.css"
import 'bootstrap/dist/css/bootstrap.css'

export const metadata = {
  title: 'Mascota Segura',
  description: '',
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