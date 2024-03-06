import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-8">
      
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold text-sm`}>Teslo </span>
        <span>| Shop</span>
        <span> © {new Date().getFullYear() }</span>
      </Link>

      <Link href="/" className="mx-3">
        Privacidad & Legal
      </Link>

      <Link href="/" className="mx-3">
        Ubicaciones
      </Link>
    </div>
  )
}
