"use client"

//REACT & NEXT
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
//ACTIONS
import { DeleteLiveSession } from "../actions/liveSession";
import { logOut } from "../actions/auth";
//TYPES
import { emailPropTypes } from "../types/prop";
import ShowError from "./showError";

export function Email({email, userId} : emailPropTypes) {

    //HOOKS
    const pathName = usePathname();

    //STATES
    const  [dropdownOpen, setDropdownOpen] = useState(false)
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
                setError(response.message ?? null);
                setErrorDetails(response.details ?? null);
            }
        } 
        
        await logOut();
    }

    if(error != "")
        <ShowError error={error} errorDetails={errorDetails}></ShowError>

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
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}