"use client"

// REACT & NEXT
import { useActionState, useEffect, useState } from "react";
import Link from 'next/link';
// ACTIONS
import {GetLanguages} from "@/src/actions/language"
import {signup} from "@/src/actions/auth"
// COMPONENTS
import ShowError from "@/src/components/showError"
// TYPES
import { Language } from "@/src/types/action";

export default function Signup() {

    // STATES
    const [languages, setLanguages] = useState<Language[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [errorDetails, setErrorDetails] = useState<string | null>(null)

    // FORM ACTION
    const [state, signupAction] = useActionState(signup, undefined)
    

    useEffect(() => {

        // GET LANGUAGES
        const GET = async () => {

            const response = await GetLanguages();

            if(response && response.status == 200)
            {
                setLanguages(response.data);
                setIsLoading(false)
                return
            } 
            if(response && response.status == 500){
                
                setError(response.message ?? null);
                setErrorDetails(response.details ?? null);
                setIsLoading(false)
                return
            }

            setIsLoading(false)
            setError('An unknown error occurred');
        }

        GET()
    }, [])


    if(isLoading)
    return <></>

    if(error != "")
    <ShowError error={error} errorDetails={errorDetails}></ShowError>

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <form action={signupAction} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        {state?.errors?.email && <p className="text-sm text-red-500">{state.errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        {state?.errors?.password && <p className="text-sm text-red-500">{state.errors.password}</p>}
                    </div>
                    <div>
                        <label htmlFor="defaultLanguageId" className="block text-sm font-medium text-gray-700">Default Language</label>
                        <select name="defaultLanguageId" id="defaultLanguageId" className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            
                            {
                                languages.length > 0 &&
                                languages.map((language) => (
                                    <option value={language.id}>{language.name}</option>
                                ))
                            }

                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account? <Link href="/auth/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>        
    );
}