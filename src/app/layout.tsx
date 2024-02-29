import type { Metadata } from 'next'
import './globals.css'
import { titleFont } from '@/config/fonts'


export const metadata: Metadata = {
  title: 'Teslo | Shop',
  description: 'e-comerce shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={titleFont.className}>{children}</body>
    </html>
  )
}
