"use client"

// REACT & NEXT
import Image from "next/image"
import { useRouter } from "next/navigation"
// TYPES
import { FlagComponentProps } from "@/src/components/FlagComponent/prop"
// ASSETS
import { mitr } from "@/public/fonts"
// NEXT AUTH
import { useSession } from "next-auth/react"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useFlagReducer } from "@/src/components/FlagComponent/useFlagReducer"
import { handleFlagClick, handleStartClick } from "@/src/components/FlagComponent/handlers"
// PROVIDER
import { useAlert } from "@/src/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/providers/LoadingProvider/LoadingProvider"


export default function FlagComponent({languages} : FlagComponentProps) {

    // HOOKS
    const router = useRouter()
    const {showAlert} = useAlert()
    const {state, dispatch} = useFlagReducer()
    const {isLoading, loadingSource, setLoading} = useLoading()

    //SESSION
    const {data: session , status} = useSession()
    const userId = session?.user?.id

    return (
        
        <>
            <div className="flex flex-wrap justify-center gap-10">
                {
                    languages
                        .slice(0, 4)
                        .map((language, index) => {
                            return(
                                <div key={index} className="m-2">
                                    <Image 
                                        src={language.imageUrl!}
                                        alt={language.name}
                                        width={100} 
                                        height={100} 
                                        className={`object-contain ${state.languageInfo.name === language.name ? "border-4 border-blue-500 rounded-full": ""}`}
                                        onClick={() => handleFlagClick({dispatch, language})}
                                    />
                                </div>
                            )
                        })
                }
            </div>
            <div className="flex justify-center mt-4">
                <button
                    disabled= {(isLoading && loadingSource === "HandleStartClick") || status === "loading"}
                    onClick={() => handleStartClick({languageInfo: state.languageInfo , userId , router, showAlert , setLoading})}
                    className={` ${mitr.className} mt-20 bg-[#58CC02] text-white font-medium py-3 px-20 rounded-lg shadow-md shadow-[#58A700] hover:bg-[#58A700] transition-colors duration-300`}
                >
                    {isLoading && loadingSource === "HandleStartClick" ? (
                            <div className="flex items-center justify-center">
                                <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "BAŞLA"
                    )}
                </button>
            </div>
        </>
    )
}