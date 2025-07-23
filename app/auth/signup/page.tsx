"use client"

// REACT & NEXT
import { FormEvent, useActionState, useEffect, useState } from "react"
import Link from 'next/link'
// ACTIONS
import {GetLanguages} from "@/src/actions/language"
// COMPONENTS
import ShowErrorComponent from "@/src/components/utils/showError"
// TYPES
import { Language } from "@prisma/client";
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { GoogleLogo } from "@/src/components/svg/googleSvg"

export default function Page() {

    // STATES
    const [languages, setLanguages] = useState<Language[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)
    const [authError, setAuthError] = useState<string | null>(null)

    // SEARCH PARAMS
    const searchParams = useSearchParams()

    useEffect(() => {

        const code = searchParams.get('code')

        if(code) setAuthError(getErrorMessage(code))

    }, [searchParams])

    const getErrorMessage = (errorCode: string) => {
        switch (errorCode) {
            case 'code_1':
                return 'UNEXPECTED ERROR!'
            case 'code_2':
                return 'USER ALREADY EXIST!'
            case 'code_4':
                return 'PLEASE CHECK EMAIL FORMAT!'
            case 'code_5':
                return 'PASSWORD CAN NOT BE SHORTER THAN 8 CHARACTERS!'
            default:
                return 'SERVER ERROR'
        }
    }


    useEffect(() => {

        // GET LANGUAGES
        const GET = async () => {

            const response = await GetLanguages()

            if(response && response.status == 200)
            {
                setLanguages(response.data)
                setIsLoading(false)
                return
            } 
            if(response && response.status == 500){
                
                setError(response.message ?? null)
                setErrorDetails(response.details ?? null)
                setIsLoading(false)
                return <ShowErrorComponent error={error} errorDetails={errorDetails}/>
            }

            setIsLoading(false)
            setError('An unknown error occurred')

            return <ShowErrorComponent error={error} errorDetails={errorDetails}/>
        }

        GET()
    }, [isLoading])


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const email = form.email.value
        const password = form.password.value
        const nativeLanguageId = form.nativeLanguageId.value
        const operation = form.operation.value

        await signIn("credentials", {
            email,
            password,
            nativeLanguageId,
            operation: operation,
            redirect: true,
            redirectTo: "/"
        })
    }


    if(isLoading) return <></>

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <form className="space-y-4" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="operation" value={"signup"} />
                    <div>
                        {authError && <p className="text-sm text-red-500 text-center">{authError}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
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
                    </div>
                    <div>
                        <label htmlFor="nativeLanguageId" className="block text-sm font-medium text-gray-700">Native Language</label>
                        <select name="nativeLanguageId" id="nativeLanguageId" className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            
                            {
                                languages.length > 0 &&
                                languages.map((language, index) => (
                                    <option key={index} value={language.id}>{language.name}</option>
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

                    {/* GOOGLE SIGN-IN BUTTON */}
                    <div className="flex items-center gap-2 mt-4">
                        <div className="flex-grow h-px bg-gray-300" />
                        <span className="text-sm text-gray-500">or</span>
                        <div className="flex-grow h-px bg-gray-300" />
                    </div>


                    <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    >
                        <GoogleLogo className="w-5 h-5" />
                        Sign in with Google
                    </button>


                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account? <Link href="/auth/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>        
    )
}