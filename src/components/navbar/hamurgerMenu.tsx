"use client"

//REACT & NEXT
import { useState } from "react"
import Link from "next/link";
import { usePathname} from "next/navigation";
//ACTIONS
import { DeleteLiveSession } from "../../actions/liveSession";
import { logOut } from "../../actions/auth";
//ASSETS
import MenuIcon from "@/public/icons/menuIcon"
import CloseIcon from "@/public/icons/closeIcon"
//TYPES
import { hamburgerMenuPropTypes } from "../../types/prop";
import ShowError from "../utils/showError";


export function HamburgerMenu({ email, userId }: hamburgerMenuPropTypes) {
  
  //HOOKS
  const pathName = usePathname();

  //STATES
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  //FUNCTIONS
  const handleLogout = async () => {

      if(pathName.startsWith('/session')){

        const response = await DeleteLiveSession(userId)

        if(response?.status == 500)
        {
            setError(response.message ?? null);
            setErrorDetails(response.details ?? null);
        }

      } 
    
      await logOut();
  }


  if(error && error !== "") return <ShowError error={error} errorDetails={errorDetails}></ShowError>

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen 
        ? ( <CloseIcon></CloseIcon>) 
        : ( <MenuIcon></MenuIcon>)
        }
      </button>

      {/* MENU */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 w-64 p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 flex flex-col`}
      >

        {!email && (

          <>
            <Link className="bg-blue-500 text-white px-2 py-1 rounded-lg" href="/auth/login">Login</Link>
            <Link className="bg-green-500 text-white px-2 py-1 rounded-lg" href="/auth/signup">Signup</Link>
          </>

        )}
        

        {/* EMAIL EXIST*/}
        {email && (

          <>
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <p className="text-white text-lg truncate">{email}</p>
            </div>

            <nav className="flex-grow">
              <ul className="space-y-4">
                <li>
                  <Link href="/list/rbooks" className="text-white hover:text-gray-300 block">Reading Books</Link>
                </li>
                <li>
                  <Link href="/list/wbooks" className="text-white hover:text-gray-300 block">Writing Books</Link>
                </li>
                <li>
                  <Link href="/list/lfilms" className="text-white hover:text-gray-300 block">Listening Films</Link>
                </li>
                <li>
                  <Link href="/list/fcategories" className="text-white hover:text-gray-300 block">Flashcard Categories</Link>
                </li>
                <li>
                  <Link href="/list/fwords" className="text-white hover:text-gray-300 block">Flashcard Words</Link>
                </li>
              </ul>
            </nav>

            <button 
              onClick={handleLogout} 
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition mt-4"
            >
              Logout
            </button>
          </>
        )}
          
      </div>
    </div>
  )
}