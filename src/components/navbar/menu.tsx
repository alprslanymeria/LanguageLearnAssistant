"use client"

//REACT & NEXT
import { useState } from "react"
import Link from "next/link";
import { usePathname} from "next/navigation"
//ACTIONS
import { DeleteLiveSession } from "../../actions/liveSession"
import { logOut } from "../../actions/auth"
//ASSETS
import MenuIcon from "@/public/icons/menuIcon"
import CloseIcon from "@/public/icons/closeIcon"
//TYPES
import { menuPropTypes } from "../../types/prop"
//COMPONENTS
import ShowErrorComponent from "../utils/showError"
import { GlobalStore } from "@/src/store/globalStore";
import AlertComponent from "../utils/alertComponent";


export function MenuComponent({ email, userId }: menuPropTypes) {
  
  //HOOKS
  const pathName = usePathname()

  //STATES
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string>("")

  //STORE
  const {resetStore} = GlobalStore()

  //FUNCTIONS
  const handleIconClick = async () => {

      setIsOpen(!isOpen)
  }

  const handleLogout = async () => {

      // CHECK IF REQUEST COME FROM /SESSION
      if(pathName.startsWith('/session')){

        const response = await DeleteLiveSession(userId)

        if(response?.status == 500)
        {
            setError(response.message ?? null)
            setErrorDetails(response.details ?? null)

            return <ShowErrorComponent error={error} errorDetails={errorDetails}/>
        }

        setAlertMessage("Mevcut session silinecektir!")
        setShowAlert(true)

      } 

      resetStore()
    
      await logOut()
  }

  return (
    <div className="relative z-50">
      <button
        onClick={handleIconClick}
        className="p-2"
      >
        {isOpen 
        ? ( <CloseIcon/>) 
        : ( <MenuIcon/>)
        }
      </button>

      {/* MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 bg-opacity-95 backdrop-blur-md shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col p-5`}
      >

        {!email && (

          <div className="space-y-3 mt-10">
            <Link className="block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg transition" href="/auth/login">Login</Link>
            <Link className="block bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-lg transition" href="/auth/signup">Signup</Link>
          </div>

        )}
        

        {/* EMAIL EXIST*/}
        {email && (

          <>
            <div className="bg-gray-800 p-4 rounded-xl mb-6 shadow-inner">
              <p className="text-[#F4CC15] text-md font-semibold truncate text-center">{email}</p>
            </div>

            <nav className="flex-grow">
              <ul className="space-y-4 text-left text-white text-sm font-medium">
                <li>
                  <Link href="/list?table=fcategories" className="block hover:bg-gray-800 rounded-md px-3 py-2 transition">📚 Flashcard Categories</Link>
                </li>
                <li>
                  <Link href="/list?table=fwords" className="block hover:bg-gray-800 rounded-md px-3 py-2 transition">📝 Flashcard Words</Link>
                </li>
                <li>
                  <Link href="/list?table=lfilms" className="block hover:bg-gray-800 rounded-md px-3 py-2 transition">🎧 Listening Films</Link>
                </li>
                <li>
                  <Link href="/list?table=rbooks" className="block hover:bg-gray-800 rounded-md px-3 py-2 transition">📖 Reading Books</Link>
                </li>
                <li>
                  <Link href="/list?table=wbooks" className="block hover:bg-gray-800 rounded-md px-3 py-2 transition">✍️ Writing Books</Link>
                </li>
              </ul>
            </nav>

            <button 
              onClick={handleLogout} 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 mt-6 rounded-lg transition"
            >
              Logout
            </button>
          </>
        )}
          
      </div>

      <div className="flex justify-center mt-6">
          {showAlert && (
              <AlertComponent
                  type="warning"
                  title="Warning"
                  message={alertMessage}
                  duration={3000}
                  onClose={() => setShowAlert(false)}
              />
          )}
      </div>

    </div>
  )
}