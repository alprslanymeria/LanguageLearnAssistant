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
                    <Link className="bg-blue-500 text-white px-2 py-1 rounded-lg" href="/auth/login">Login</Link>
                    <Link className="bg-green-500 text-white px-2 py-1 rounded-lg" href="/auth/signup">Signup</Link>
                </>
            ) : (
                <div className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-black px-2 py-1 rounded-lg">
                        {email}
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 bg-white border shadow-lg rounded-lg w-40 mt-2">
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200">
                                Logout
                            </button>
                            <Link href="/list/rbooks" className="text-black hover:text-black-300 block">Reading Books</Link>
                            <Link href="/list/wbooks" className="text-black hover:text-black-300 block">Writing Books</Link>
                            <Link href="/list/lfilms" className="text-black hover:text-black-300 block">Listening Films</Link>
                            <Link href="/list/fcategories" className="text-black hover:text-black-300 block">Flashcard Categories</Link>
                            <Link href="/list/fwords" className="text-black hover:text-black-300 block">Flashcard Words</Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}