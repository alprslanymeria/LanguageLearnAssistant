"use client"

// REACT & NEXT
import { useRouter } from "next/navigation"
// BETTER-AUTH
import { authClient } from "@/src/infrastructure/auth/auth-client"
// PROVIDERS
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { calculateRate, closeAndSave, handleNextClick } from "@/src/components/ListeningFormComponent/handlers"
// TYPES
import { ListeningFormComponentProps } from "@/src/components/ListeningFormComponent/prop"
import { ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"


export default function ListeningFormComponent({dispatch} : ListeningFormComponentProps) {


    //SESSION
    const {data: session, isPending} = authClient.useSession() 
    const userId = session?.user.id

    //HOOKS
    const {showAlert} = useAlert()
    const router = useRouter()
    const {isLoading, loadingSource, setLoading} = useLoading()

    //STORE
    const sessionData = GlobalStore((state) => state.SessionData )
    const oldSessionId = GlobalStore((state) => state.OldSessionId )
    const item = GlobalStore((state) => state.SelectedItem) as ListeningCategoryWithDeckVideos
    const updateListeningSession = GlobalStore((state) => state.updateListeningSession )

    return (

        <>
            {sessionData.type === "listening" && 
            
                <div className="w-full">
                    <div className="bg-white">
                        <div className="space-y-4">

                            {/* //FIRST TEXT AREA */}
                            <textarea
                                value={sessionData.data.LTextHeardByUser}
                                placeholder="What did you hear?"
                                onChange={(e) => updateListeningSession({data: {LTextHeardByUser: e.target.value}})}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* //SECOND TEXT AREA */}
                            {sessionData.data.LShowRightAnswer && sessionData.data.LVideoEnded && (

                                <textarea
                                    readOnly={true}
                                    value={sessionData.data.LRightAnswer}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />)
                            }
                            
                            
                            {/* //BUTTONS */}
                            <div className='flex flex-wrap gap-4 justify-around'>

                                {sessionData.data.LShowCalculateButton && sessionData.data.LVideoEnded &&
                                
                                    <button 
                                        disabled= {isLoading && loadingSource === "ListeningCalculateRate"}
                                        onClick={() => calculateRate({sessionData, oldSessionId, setLoading, showAlert, updateListeningSession})} 
                                        className="w-full lg:flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200"
                                    >

                                        {isLoading && loadingSource === "ListeningCalculateRate" ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        ) : (
                                            "Calculate"
                                        )}

                                    </button>
                                }

                                {sessionData.data.LShowNextButton && 
                                
                                    <button 
                                        onClick={() => handleNextClick({sessionData, showAlert, updateListeningSession})} 
                                        className="w-full lg:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200"
                                    >
                                        Next Video
                                    </button>
                                }

                                
                                <button 
                                    disabled= {(isLoading && loadingSource === "ListeningCloseAndSave") || isPending}   
                                    onClick={() => closeAndSave({userId, sessionData, oldSessionId, item, router, updateListeningSession, setLoading, showAlert, dispatch})} 
                                    className="w-full lg:flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200"
                                >
                                    
                                    {isLoading && loadingSource === "ListeningCloseAndSave" ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : (
                                        "Close & Save"
                                    )}

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            
            }
        </>
    )
}