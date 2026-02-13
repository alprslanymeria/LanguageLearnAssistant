"use client"

// REACT & NEXT
import { usePathname } from "next/navigation"
import Link from "next/link"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { handleDropdownClick, handleLogout } from "@/src/components/EmailComponent/handlers"
import { useEmailReducer } from "@/src/components/EmailComponent/useEmailReducer"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// PROVIDER
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
import { useSession } from "@/src/infrastructure/providers/SessionProvider/SessionProvider"


export function EmailComponent() {

    //HOOKS
    const pathName = usePathname()
    const {state, dispatch} = useEmailReducer()
    const {showAlert} = useAlert()
    const {isLoading, loadingSource, setLoading} = useLoading()

    // SESSION
    const { session, isPending, refreshSession } = useSession()
    const userId = session?.userId
    const email = session?.email

    //STORE
    const resetExcept = GlobalStore((state) => state.resetExcept)

    //VARIABLES
    const isAuthPage = pathName === "/auth/login" || pathName === "/auth/signup"

    return (

        <div className="flex items-center space-x-4">
            {email == null && !isPending ? (
                !isAuthPage && (
                    <>
                        <Link className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 transition" href="/auth/login">Login</Link>
                        <Link className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600 transition" href="/auth/signup">Signup</Link>
                    </>
                )
            ) : (
                <div className="relative">
                <button
                    onClick={() => handleDropdownClick({dispatch})}
                    className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-black px-3 py-1 rounded-lg shadow transition"
                >
                    {email}
                    <svg className={`w-4 h-4 transform transition ${state.dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {state.dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 transition-all duration-200 animate-fade-in">
                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold" onClick={() => handleDropdownClick({dispatch})}>👤 Profile</Link>
                        <Link href="/list?table=fcategories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold" onClick={() => handleDropdownClick({dispatch})}>📚 Flashcard Categories</Link>
                        <Link href="/list?table=fwords" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold" onClick={() => handleDropdownClick({dispatch})}>📝 Flashcard Words</Link>
                        <Link href="/list?table=rbooks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold" onClick={() => handleDropdownClick({dispatch})}>📖 Reading Books</Link>
                        <Link href="/list?table=wbooks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold" onClick={() => handleDropdownClick({dispatch})}>✍️ Writing Books</Link>
                    <button
                        disabled= {(isLoading && loadingSource === "EmailHandleLogout") || isPending}
                        onClick={() => handleLogout({ userId, pathName, resetExcept, showAlert, refreshSession, dispatch , setLoading})}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 font-semibold"
                    >
                        {isLoading && loadingSource === "EmailHandleLogout" ? (
                            <div className="flex items-center justify-center">
                                <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "🚪 Logout"
                        )}
                        
                    </button>
                    </div>
                )}
                </div>
            )}
        </div>
    )
}