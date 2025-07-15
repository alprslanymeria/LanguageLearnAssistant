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

export function EmailComponent({email, userId} : emailPropTypes) {

    //HOOKS
    const pathName = usePathname()

    //STATES
    const  [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [errorDetails, setErrorDetails] = useState<string | null>(null)

    //FUNCTIONS
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
        
        await logOut()
    }

    if(error && error !== "") return <ShowErrorComponent error={error} errorDetails={errorDetails}/>

    return (

        <div className="flex items-center space-x-4">
            {email == null ? (
                <>
                <Link className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 transition" href="/auth/login">Login</Link>
                <Link className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600 transition" href="/auth/signup">Signup</Link>
                </>
            ) : (
                <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-black px-3 py-1 rounded-lg shadow transition"
                >
                    {email}
                    <svg className={`w-4 h-4 transform transition ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 transition-all duration-200 animate-fade-in">
                    <Link href="/list/fcategories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">📚 Flashcard Categories</Link>
                    <Link href="/list/fwords" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">📝 Flashcard Words</Link>
                    <Link href="/list/lfilms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">🎧 Listening Films</Link>
                    <Link href="/list/rbooks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">📖 Reading Books</Link>
                    <Link href="/list/wbooks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">✍️ Writing Books</Link>
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

        // <div className="flex items-center space-x-4">
        //     {email == null ? (
        //         <>
        //             <Link className="bg-blue-500 text-white px-2 py-1 rounded-lg" href="/auth/login">Login</Link>
        //             <Link className="bg-green-500 text-white px-2 py-1 rounded-lg" href="/auth/signup">Signup</Link>
        //         </>
        //     ) : (
        //         <div className="relative">
        //             <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-black px-2 py-1 rounded-lg">
        //                 {email}
        //             </button>
        //             {dropdownOpen && (
        //                 <div className="absolute right-0 bg-white border shadow-lg rounded-lg w-40 mt-2">
        //                     <Link href="/list/fcategories" className="hover:bg-gray-200 text-center text-black hover:text-black-300 block p-1">Flashcard Categories</Link>
        //                     <Link href="/list/fwords" className="hover:bg-gray-200 text-center text-black hover:text-black-300 block p-1">Flashcard Words</Link>
        //                     <Link href="/list/lfilms" className="hover:bg-gray-200 text-center text-black hover:text-black-300 block p-1">Listening Films</Link>
        //                     <Link href="/list/rbooks" className="hover:bg-gray-200 text-center text-black hover:text-black-300 block p-1">Reading Books</Link>
        //                     <Link href="/list/wbooks" className="hover:bg-gray-200 text-center text-black hover:text-black-300 block p-1">Writing Books</Link>
        //                     <button onClick={handleLogout} className="w-full text-center px-4 py-2 text-red-500 hover:bg-gray-200">
        //                         Logout
        //                     </button>
        //                 </div>
        //             )}
        //         </div>
        //     )}
        // </div>
    )
}