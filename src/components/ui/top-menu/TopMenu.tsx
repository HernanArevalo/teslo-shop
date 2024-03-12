"use client"
import { titleFont } from '@/config/fonts'
import { useUiStore } from '@/store'
import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

export const TopMenu = () => {

    const openSideMenu = useUiStore(state => state.openSideMenu)

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
        <div className=''>
            <Link href="/">
                <span className={`${ titleFont.className } antialiased font-bold`}>Teslo</span>
                <span> | Shop</span>
            </Link>
        </div>

         {/* Center Menu */}
        <div className="hidden sm:block">
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">Men</Link>
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Women</Link>
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kids">Kids</Link>
        </div>


        <div className="flex items-center gap-1">
            <Link href="/search" className='m-2'>
                <IoSearchOutline className="w-5 h-5"/>
            </Link>
            <Link href="/cart" className='m-2'>
                <div className='relative'>
                    <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>3</span>
                    <IoCartOutline className="w-5 h-5"/>
                </div>
            </Link>

            <button className='m-2 rounded-md transition-all hover:bg-gray-100' onClick={ openSideMenu }>
                Menú
            </button>

        </div>

    </nav>
  )
}

