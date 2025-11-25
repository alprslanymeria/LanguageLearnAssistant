"use client"

// REACT & NEXT
import { useParams, useRouter } from "next/navigation"
// ASSETS
import { mitr } from "@/public/fonts"
// COMPONENTS
import InfoMessageComponent from "@/src/components/InfoMessageComponent/infoMessage"
import Loader from "@/src/components/loader"
// PROVIDER
import { useAlert } from "@/src/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/providers/LoadingProvider/LoadingProvider"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useLanguagePageCustomEffect } from "@/src/page/LanguagePage/useLanguagePageCustomEffect"
import { useLanguagePageReducer } from "@/src/page/LanguagePage/useLanguagePageReducer"
import { handlePracticeClick } from "@/src/page/LanguagePage/handlers"
// STORE
import { GlobalStore } from "@/src/store/globalStore"


export default function Page() {

    // GET SLUG
    const params = useParams<{ language: string }>()
    const language = params?.language

    // HOOKS
    const {showAlert} = useAlert()
    const {state, dispatch} = useLanguagePageReducer()
    const {isLoading, loadingSource, setLoading} = useLoading()
    const router = useRouter()

    // STORE
    const hasHydrated = GlobalStore((state) => state.HasHydrated)
    const setLanguage = GlobalStore((state) => state.setLanguage)
    const resetExcept = GlobalStore((state) => state.resetExcept)

    // USE EFFECT
    useLanguagePageCustomEffect({

        language: language!.at(0),
        hasHydrated,
        showAlert,
        setLoading,
        setLanguage,
        resetExcept,
        dispatch
    })

    if(isLoading && loadingSource === "page" ) return <Loader/>

    return (
        
        <>
            <InfoMessageComponent message="Please choose which practice you would like to do"/>
            
            <div>
                {state.practices.map((practice,index) => {
                    return (
                        <div key={index} className="flex justify-center">
                            
                            <button
                                onClick={() => handlePracticeClick({language, practice, router})}
                                className={` ${mitr.className} w-64 text-xl mt-5 bg-[#B95DE5] text-white font-medium py-2 rounded-lg shadow-md shadow-[#ad49db] hover:bg-[#ad49db] transition-colors duration-300`}
                            >
                                {practice.name}
                            </button>

                        </div>
                    )})
                }
            </div>
        </>
    )
}