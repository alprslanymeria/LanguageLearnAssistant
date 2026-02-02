"use client"

// REACT & NEXT
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
// COMPONENTS
import { GoogleLogo } from "@/src/components/svg/googleSvg"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useLoginReducer } from "@/src/page/LoginPage/useLoginReducer"
import { handleSubmit } from "@/src/page/LoginPage/handlers"
import { useLoginPageCustomEffect } from "@/src/page/LoginPage/useLoginPageCustomEffect"
// BETTER AUTH
import { SignInWithGoogle } from "@/src/infrastructure/auth/auth-client"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// PROVIDER
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"


// BUILD SIRASINDA HATA VERDİĞİ İÇİN SUSPENSE BOUNDARY İÇERİSİNE ALINDI.
function LoginPage() {

    // HOOKS
    const {state , dispatch} = useLoginReducer()
    const {isLoading, loadingSource, setLoading} = useLoading()
    const router = useRouter()

    // STORE
    const hasHydrated = GlobalStore((state) => state.HasHydrated)
    const resetExcept = GlobalStore((state) => state.resetExcept)

    // USE EFFECTS
    useLoginPageCustomEffect({
        
        hasHydrated,
        resetExcept
    })


    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>

                <form className="space-y-4" method="POST" onSubmit={(e) => handleSubmit({e, router, dispatch, setLoading})}>
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
                    <button
                        disabled= {isLoading && loadingSource === "LoginHandleSubmit"}
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isLoading && loadingSource === "LoginHandleSubmit" ? (
                            <div className="flex items-center justify-center">
                                <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"/>
                            </div>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <div className="flex items-center gap-2 mt-4">
                        <div className="flex-grow h-px bg-gray-300" />
                        <span className="text-sm text-gray-500">or</span>
                        <div className="flex-grow h-px bg-gray-300" />
                    </div>


                    <button
                        type="button"
                        onClick={async () => await SignInWithGoogle() }
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


export default function Page() {

    return (

        <Suspense>
            <LoginPage/>
        </Suspense>
    )
    
}