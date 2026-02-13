"use client"

// REACT & NEXT
import { useRouter } from "next/navigation"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// TYPES
import { FlashcardFormComponentProps } from "@/src/components/FlashcardFormComponent/prop"
import { FlashcardCategoryWithDeckWords } from "@/src/actions/FlashcardCategory/Response"
// PROVIDER
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
import { useSession } from "@/src/infrastructure/providers/SessionProvider/SessionProvider"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { handleClick, handleCloseClick, handleNextClick } from "@/src/components/FlashcardFormComponent/handlers"
import { useFlashcardFormCustomEffect } from "@/src/components/FlashcardFormComponent/useFlashcardFormCustomEffect"


export default function FlashcardFormComponent({dispatch} : FlashcardFormComponentProps) {

    //SESSION
    const { session, isPending } = useSession() 
    const userId = session?.userId

    //HOOKS
    const router = useRouter()
    const {showAlert} = useAlert()
    const {isLoading, loadingSource, setLoading} = useLoading()

    //STORE
    const sessionData = GlobalStore((state) => state.SessionData)
    const oldSessionId = GlobalStore((state) => state.OldSessionId)
    const hasHydrated = GlobalStore((state) => state.HasHydrated)
    const item = GlobalStore((state) => state.SelectedItem) as FlashcardCategoryWithDeckWords
    const updateFlashcardSession = GlobalStore((state) => state.updateFlashcardSession)


    //USE EFFECT
    useFlashcardFormCustomEffect({item, sessionData, hasHydrated, updateFlashcardSession})
    

    return (

        <>
            {sessionData.type === "flashcard" && 
            
                <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto h-auto md:h-full items-center md:items-stretch">
                    {sessionData!.data.FShowNextAndCloseButton ? (
                        <>
                            <button onClick={() => handleNextClick({sessionData, showAlert, updateFlashcardSession})} className="h-full md:h-full w-1/2 md:w-auto px-4 py-2 bg-blue-500 text-white rounded">Next</button>
                            <button 
                                disabled= {(isLoading && loadingSource === "HandleCloseClick") || isPending}
                                onClick={() => handleCloseClick({sessionData, oldSessionId, item, dispatch, userId, router, updateFlashcardSession, showAlert, setLoading})} 
                                className="h-full md:h-full w-1/2 md:w-auto px-4 py-2 bg-yellow-500 text-white rounded"
                            >

                                {isLoading && loadingSource === "HandleCloseClick" ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    "Close"
                                )}

                            </button>
                        </>
                        ) : sessionData.data.FShowYesAndNoButtons ? (
                        <>
                            <button onClick={() => handleClick({status: true, sessionData, oldSessionId, showAlert, updateFlashcardSession})} className="h-1/2 md:h-1/2 w-1/2 md:w-auto px-4 py-2 bg-green-500 text-white rounded">YES</button>
                            <button onClick={() => handleClick({status: false, sessionData, oldSessionId, showAlert, updateFlashcardSession})} className="h-1/2 md:h-1/2 w-1/2 md:w-auto px-4 py-2 bg-red-500 text-white rounded">NO</button>
                        </>
                    ) : <></>}
                </div>
            }
        </>


        

    )
}