"use client"

//REACT & NEXT
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
//ACTIONS
import { DeleteLiveSession } from "../../actions/liveSession"
import { logOut } from "../../actions/auth"
//TYPES
import { emailPropTypes } from "../../types/prop"
//COMPONENTS
import ShowErrorComponent from "../utils/showError"
import { GlobalStore } from "@/src/store/globalStore"

export function EmailComponent({email, userId} : emailPropTypes) {

    //HOOKS
    const pathName = usePathname()

    //STATES
    const  [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [errorDetails, setErrorDetails] = useState<string | null>(null)

    //STORE
    const {resetStore} = GlobalStore()

    //VARIABLES
    const isAuthPage = pathName === "/auth/login" || pathName === "/auth/signup"

    //FUNCTIONS
    const handleDropdownClick = async () => {

        setDropdownOpen(!dropdownOpen)
    }

    const handleLogout = async () => {

        setDropdownOpen(false)
        if(pathName.startsWith('/session'))
        {

            const response = await DeleteLiveSession(userId)
            
            if(response?.status == 500)
            {
                setError(response.message ?? null)
                setErrorDetails(response.details ?? null)
            }
        } 

        resetStore()
        
        await logOut()
    }

    if(error && error !== "") return <ShowErrorComponent error={error} errorDetails={errorDetails}/>

    return (

        <div className="flex items-center space-x-4">
            {email == null ? (
                !isAuthPage && (
                    <>
                        <Link className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 transition" href="/auth/login">Login</Link>
                        <Link className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600 transition" href="/auth/signup">Signup</Link>
                    </>
                )
            ) : (
                <div className="relative">
                <button
                    onClick={handleDropdownClick}
                    className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-black px-3 py-1 rounded-lg shadow transition"
                >
                    {email}
                    <svg className={`w-4 h-4 transform transition ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 transition-all duration-200 animate-fade-in">
                    <Link href="/list?table=fcategories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">📚 Flashcard Categories</Link>
                    <Link href="/list?table=fwords" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">📝 Flashcard Words</Link>
                    <Link href="/list?table=lfilms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">🎧 Listening Films</Link>
                    <Link href="/list?table=rbooks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">📖 Reading Books</Link>
                    <Link href="/list?table=wbooks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">✍️ Writing Books</Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 font-semibold"
                    >
                        🚪 Logout
                    </button>
                    </div>
                )}
                </div>
            )}
            </div>
    )
}