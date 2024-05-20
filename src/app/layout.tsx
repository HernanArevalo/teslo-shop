import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/config/fonts'
import { Providers } from '@/components'


export const metadata: Metadata = {
  title: {
    template: '%s - Teslo|Shop',
    default: 'Home - Teslo|Shop'
  },
  description: 'e-comerce shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} body-background`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
