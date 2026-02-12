"use client"

// REACT & NEXT
import Link from 'next/link'
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
// COMPONENTS
import { GoogleLogo } from "@/src/components/svg/googleSvg"
import Loader from '@/src/components/loader'
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useSignupPageCustomEffect } from '@/src/page/SignupPage/useSignupPageCustomEffect'
import { useSignupReducer } from "@/src/page/SignupPage/useSignupReducer"
import { handleSubmit } from "@/src/page/SignupPage/handlers"
// PROVIDER
import { useAlert } from '@/src/infrastructure/providers/AlertProvider/AlertProvider'
import { useLoading } from '@/src/infrastructure/providers/LoadingProvider/LoadingProvider'
// STORE
import { GlobalStore } from '@/src/infrastructure/store/globalStore'
// AUTH SERVICE
import { signInWithGoogle } from '@/src/infrastructure/auth/authService'


// BUILD SIRASINDA HATA VERDİĞİ İÇİN SUSPENSE BOUNDARY İÇERİSİNE ALINDI.
function SignupPage() {

    // HOOKS
    const {state , dispatch} = useSignupReducer()
    const { showAlert } = useAlert()
    const {isLoading, loadingSource, setLoading} = useLoading()
    const router = useRouter()

    // STORE
    const hasHydrated = GlobalStore((state) => state.HasHydrated)
    const resetExcept = GlobalStore((state) => state.resetExcept)

    // USE EFFECTS
    useSignupPageCustomEffect({

        hasHydrated,
        setLoading,
        showAlert,
        resetExcept,
        dispatch
    })

    if(isLoading && loadingSource === "page" ) return <Loader/>

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <form className="space-y-4" method="POST" onSubmit={(e) => handleSubmit({e, router, dispatch, setLoading})}>
                    <input type="hidden" name="operation" value={"signup"} />
                    <div>
                        {state.authError && <p className="text-sm text-red-500 text-center">{state.authError}</p>}
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
                                state.languages!.length > 0 &&
                                state.languages!.map((language, index) => (
                                    <option key={index} value={language.id}>{language.name}</option>
                                ))
                            }

                        </select>
                    </div>
                    <button
                        disabled= {isLoading && loadingSource === "SignupHandleSubmit"}
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isLoading && loadingSource === "SignupHandleSubmit" ? (
                            <div className="flex items-center justify-center">
                                <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>

                    <div className="flex items-center gap-2 mt-4">
                        <div className="flex-grow h-px bg-gray-300" />
                        <span className="text-sm text-gray-500">or</span>
                        <div className="flex-grow h-px bg-gray-300" />
                    </div>


                    <button
                        type="button"
                        onClick={() => signInWithGoogle()}
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


export default function Page() {

    return (

        <Suspense>
            <SignupPage/>
        </Suspense>
    )
}