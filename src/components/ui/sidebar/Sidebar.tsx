"use client"
import Link from "next/link"
import clsx from "clsx"
import { IoCloseCircleOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonAddOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

import { useUiStore } from "@/store"

interface NavbarItem {
  title:string,
  className:string,
  icon: React.ReactNode
}

const NavbarItems1:NavbarItem[] =[
  {
    title: "Profile",
    className: "flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3",
    icon: <IoPersonAddOutline size={30}/>
  },
  {
    title: "Orders",
    className: "flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3",
    icon: <IoTicketOutline size={30}/>
  },
  {
    title: "Log-in",
    className: "flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3",
    icon: <IoLogInOutline size={30}/>
  },
  {
    title: "Log-out",
    className: "flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3",
    icon: <IoLogOutOutline size={30}/>
  },
]

const NavbarItems2:NavbarItem[] =[
  {
    title: "Products",
    className: "flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3",
    icon: <IoShirtOutline size={30}/>
  },
  {
    title: "Orders",
    className: "flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3",
    icon: <IoTicketOutline size={30}/>
  },
  {
    title: "Clients",
    className: "flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3",
    icon: <IoPeopleOutline size={30}/>
  },
]

export const Sidebar = () => {

  const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen)
  const closeSideMenuOpen = useUiStore(state => state.closeSideMenu)


  return (
    <div className="">
      
      {/* black background */}
      { isSideMenuOpen &&
        <div 
          className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30  backdrop-filter backdrop-blur-xl" 
        />

      }

      {/* blur */}
      { isSideMenuOpen &&
        <div 
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-xl"
          onClick={ closeSideMenuOpen }
        />
      }

      {/* sidemenu */}
        <nav 
        // TODO: slide effect
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen
          }
          )}
        >
        
        <IoCloseCircleOutline 
          size={ 50 }
          className="absolute top-5 right-5 cursor-pointer"
          onClick={ closeSideMenuOpen }
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2"/>
          <input type="text"
                 className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        { NavbarItems1.map(({className, title, icon}) => (
          <Link 
            href="/"
            className={className}
            key={title}
          >
            {icon}
            <span className="text-xl">{title}</span>
          </Link>

        ))
        }
        <div className="w-full h-px bg-gray-200 my-10" />
          
        { NavbarItems2.map(({className, title, icon}) => (
          <Link 
            href="/"
            className={className}
            key={title}
          >
            {icon}
            <span className="text-xl">{title}</span>
          </Link>

        ))
        }

      </nav>
      




    </div>
  )
}
