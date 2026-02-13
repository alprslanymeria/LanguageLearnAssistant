"use client"

// REACT & NEXT
import Link from "next/link"
import { usePathname} from "next/navigation"
// ASSETS
import MenuIcon from "@/public/icons/menuIcon"
import CloseIcon from "@/public/icons/closeIcon"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useMenuReducer } from "@/src/components/MenuComponent/useMenuReducer"
import { handleIconClick, handleLogout } from "@/src/components/MenuComponent/handlers"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// PROVIDER
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
import { useSession } from "@/src/infrastructure/providers/SessionProvider/SessionProvider"


export function MenuComponent() {
  
  //HOOKS
  const pathName = usePathname()
  const { state, dispatch } = useMenuReducer()
  const { showAlert } = useAlert()
  const {isLoading, loadingSource, setLoading} = useLoading()

  // SESSION
  const { session, isPending } = useSession() 
  const userId = session?.userId
  const email = session?.email

  //STORE
  const resetExcept = GlobalStore((state) => state.resetExcept)

  return (
    <div className="relative z-50">
      <button
        onClick={() => handleIconClick({dispatch})}
        className="p-2"
      >
        {state.isOpen 
        ? ( <CloseIcon/>) 
        : ( <MenuIcon/>)
        }
      </button>

      {/* MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 bg-opacity-95 backdrop-blur-md shadow-xl transform ${
          state.isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col p-5`}
      >

        {!email && !isPending && (

          <div className="space-y-3 mt-10">
            <Link className="block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg transition" href="/auth/login">Login</Link>
            <Link className="block bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-lg transition" href="/auth/signup">Signup</Link>
          </div>

        )}
        

        {/* EMAIL EXIST*/}
        {email && !isPending && (

          <>
            <div className="bg-gray-800 p-4 rounded-xl mb-6 shadow-inner">
              <p className="text-[#F4CC15] text-md font-semibold truncate text-center">{email}</p>
            </div>

            <nav className="flex-grow">
              <ul className="space-y-4 text-left text-white text-sm font-medium">
                <li>
                  <Link href="/profile" className="block hover:bg-gray-800 rounded-md px-3 py-2 transition">👤 Profile</Link>
                </li>
                <li>
                  <Link href="/list?table=fcategories" className="block hover:bg-gray-800 rounded-md px-3 py-2 transition">📚 Flashcard Categories</Link>
                </li>
                <li>
                  <Link href="/list?table=fwords" className="block hover:bg-gray-800 rounded-md px-3 py-2 transition">📝 Flashcard Words</Link>
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
              disabled= {isLoading && loadingSource === "MenuHandleLogout"}
              onClick={() => handleLogout({ userId, pathName, resetExcept, dispatch, showAlert , setLoading})} 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 mt-6 rounded-lg transition"
            >

                {isLoading && loadingSource === "MenuHandleLogout" ? (
                    <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"/>
                    </div>
                ) : (
                    "Logout"
                )}

            </button>
          </>
        )}
          
      </div>
    </div>
  )
}