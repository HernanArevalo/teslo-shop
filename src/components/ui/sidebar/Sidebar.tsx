'use client';

import Link from 'next/link';
import clsx from 'clsx';
import {
  IoCloseCircleOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import { useUiStore } from '@/store';
import { logout } from '@/actions/auth';
import { useSession } from 'next-auth/react';

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;

  return (
    <div className="">
      {/* black background */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30  backdrop-filter backdrop-blur-xl" />
      )}

      {/* blur */}
      {isSideMenuOpen && (
        <div
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-xl"
          onClick={closeSideMenu}
        />
      )}

      {/* sidemenu */}
      <nav
        // TODO: slide effect
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen,
          }
        )}
      >
        <IoCloseCircleOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        <Link
          href={'/profile'}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
          onClick={closeSideMenu}
        >
          <IoPersonOutline size={30} />
          <span className="text-xl">Profile</span>
        </Link>

        <Link
          href={'/'}
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
          onClick={closeSideMenu}
        >
          <IoTicketOutline size={30} />
          <span className="text-xl">Orders</span>
        </Link>

        {isAuthenticated ? (
          <button
            className="flex items-center w-full mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
            onClick={() => logout()}
          >
            <IoLogOutOutline size={30} />
            <span className="text-xl">Log-out</span>
          </button>
        ) : (
          <Link
            href={'/auth/login'}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
            onClick={closeSideMenu}
          >
            <IoLogInOutline size={30} />
            <span className="text-xl">Log-in</span>
          </Link>
        )}

        <div className="w-full h-px bg-gray-200 my-10" />

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
        >
          <IoShirtOutline size={30} />
          <span className="text-xl">Products</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
        >
          <IoTicketOutline size={30} />
          <span className="text-xl">Orders</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
        >
          <IoPeopleOutline size={30} />
          <span className="text-xl">Clients</span>
        </Link>
      </nav>
    </div>
  );
};
