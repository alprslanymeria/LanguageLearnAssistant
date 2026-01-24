"use client"

// REACT & NEXT
import { useRouter } from "next/navigation"
// BETTER AUTH
import { authClient } from "@/src/infrastructure/auth/auth-client"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// PROVIDER
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
// TYPES
import { WritingFormComponentProps } from "@/src/components/WritingFormComponent/prop"
import { WritingBook } from "@prisma/client"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { calculateRate, closeAndSave, handleTextSelection, handleTranslate } from "@/src/components/WritingFormComponent/handlers"


export default function WritingFormComponent({dispatch} : WritingFormComponentProps) {

    //SESSION
    const {data: session, isPending} = authClient.useSession() 
    const userId = session?.user.id

    //HOOKS
    const {showAlert} = useAlert()
    const router = useRouter()
    const {isLoading, loadingSource, setLoading} = useLoading()

    //GLOBAL STORE
    const language = GlobalStore((state) => state.Language)
    const practice = GlobalStore((state) => state.Practice)
    const sessionData = GlobalStore((state) => state.SessionData )
    const oldSessionId = GlobalStore((state) => state.OldSessionId )
    const item = GlobalStore((state) => state.SelectedItem) as WritingBook
    const updateWritingSession = GlobalStore((state) => state.updateWritingSession )

    return (

        <>
            {sessionData.type === "writing" && 
            
                <div className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-1/2">
                    <div className="bg-white">
                        <div className="space-y-4">

                            {/* //FIRST TEXT AREA */}
                            <textarea
                                readOnly={true}
                                value={sessionData.data.WSelectedText ?? ""}
                                placeholder="Please choose text"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* //SECOND TEXT AREA */}
                            {sessionData.data.WSelectedText && (

                                <textarea
                                    value={sessionData.data.WInputText ?? ""}
                                    onChange={(e) => updateWritingSession({data: {WInputText: e.target.value}})}
                                    placeholder="Your Answer"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />)
                            }
                            

                            {/* //THIRD TEXT AREA */}
                            {sessionData.data.WShowTranslation && 
                            
                                <textarea
                                    readOnly={true}
                                    value={sessionData.data.WTranslatedText ?? ""}
                                    placeholder="Translation"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            
                            }
                            
                            {/* //BUTTONS */}
                            <div className='flex flex-wrap gap-4 justify-around'>
                                <button onClick={() => handleTextSelection({updateWritingSession})} className="w-full lg:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Select Text</button>
                                {sessionData.data.WInputText && (
                                    <button 
                                        disabled= {(isLoading && loadingSource === "WritingHandleTranslate") || isPending}
                                        onClick={() => handleTranslate({userId , language, practice, sessionData, showAlert, updateWritingSession, setLoading})} 
                                        className="w-full lg:flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200"
                                    >

                                        {isLoading && loadingSource === "WritingHandleTranslate" ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        ) : (
                                            "Translate"
                                        )}

                                    </button>
                                )}
                                {sessionData.data.WShowTranslation && (
                                    <button 
                                        disabled= {isLoading && loadingSource === "WritingCalculateRate"}
                                        onClick={() => calculateRate({sessionData, oldSessionId, showAlert, updateWritingSession, setLoading})}
                                        className="w-full lg:flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200"
                                    >

                                        {isLoading && loadingSource === "WritingCalculateRate" ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        ) : (
                                            "Calculate"
                                        )}

                                    </button>
                                )}
                                <button 
                                    disabled= {(isLoading && loadingSource === "WritingCloseAndSave") || isPending}
                                    onClick={() => closeAndSave({userId, sessionData, item, oldSessionId, router, dispatch, showAlert, updateWritingSession, setLoading})}
                                    className="w-full lg:flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200"
                                >

                                    {isLoading && loadingSource === "WritingCloseAndSave" ? (
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