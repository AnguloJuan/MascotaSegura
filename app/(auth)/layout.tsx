import "@/styles/globals.css"

export const metadata = {
  title: {
    template: '%s | MascotaSegura',
    default: 'MascotaSegura', // a default is required when creating a template
  },
  icons: {
    icon: '/images/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={'p-6 flex flex-col items-center '}>
        {children}
      </body>
    </html>
  )
}