"use client"

// REACT & NEXT
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
// ACTIONS
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { GoogleLogo } from "@/src/components/svg/googleSvg"


export default function Page() {

    // STATES
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
            case 'code_3':
                return 'INVALID EMAIL OR PASSWORD!'
            case 'code_6':
                return 'PLEASE CHECK EMAIL FORMAT!'
            case 'code_7':
                return 'PASSWORD CAN NOT BE SHORTER THAN 8 CHARACTERS!'
            default:
                return 'SERVER ERROR'
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const email = form.email.value
        const password = form.password.value
        const operation = form.operation.value

        await signIn("credentials", {
            email,
            password,
            operation: operation,
            redirect: true,
            redirectTo: "/"
        })
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>

                <form className="space-y-4" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="operation" value={"login"} />
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
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Login
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
                        Don't have an account? <Link href="/auth/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>  
    )
}