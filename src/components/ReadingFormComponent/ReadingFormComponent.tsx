"use client"

// REACT & NEXT
import { useRouter } from "next/navigation"
// BETTER AUTH
import { authClient } from "@/src/lib/auth-client"
// STORE
import { GlobalStore } from "@/src/store/globalStore"
// PROVIDER
import { useAlert } from "@/src/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/providers/LoadingProvider/LoadingProvider"
// TYPES
import { ReadingFormComponentProps } from "@/src/components/ReadingFormComponent/prop"
import { ReadingBook } from "@prisma/client"
// ROUTE & HANDLERS
import { calculateRate, closeAndSave, handleTextSelection, handleTranslate } from "@/src/components/ReadingFormComponent/handlers"


export default function ReadingFormComponent({dispatch} : ReadingFormComponentProps) {

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
    const item = GlobalStore((state) => state.SelectedItem) as ReadingBook
    const updateReadingSession = GlobalStore((state) => state.updateReadingSession )


    return (

        <>
            {sessionData.type === "reading" && 
            
                <div className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-1/2">
                    <div className="bg-white">
                        <div className="space-y-4">

                            {/* //FIRST TEXT AREA */}
                            <textarea
                                readOnly={true}
                                value={sessionData.data.RSelectedText ?? ""}
                                placeholder="Please choose text"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* //SECOND TEXT AREA */}
                            {sessionData.data.RSelectedText && (

                                <textarea
                                    value={sessionData.data.RInputText ?? ""}
                                    onChange={(e) => updateReadingSession({data: {RInputText: e.target.value}})}
                                    placeholder="Your Answer"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />)
                            }
                            

                            {/* //THIRD TEXT AREA */}
                            {sessionData.data.RShowTranslation && 
                            
                                <textarea
                                    readOnly={true}
                                    value={sessionData.data.RTranslatedText ?? ""}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            
                            }
                            
                            {/* //BUTTONS */}
                            <div className='flex flex-wrap gap-4 justify-around'>
                                
                                <button 
                                
                                    onClick={() => handleTextSelection({updateReadingSession})} 
                                    className="w-full lg:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200"
                                >
                                    Select Text
                                </button>

                                {sessionData.data.RInputText && (
                                    <button 
                                        disabled= {(isLoading && loadingSource === "ReadingHandleTranslate") || isPending}
                                        onClick={() => handleTranslate({userId, language, practice, sessionData, showAlert, updateReadingSession, setLoading})} 
                                        className="w-full lg:flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200"
                                    >

                                        {isLoading && loadingSource === "ReadingHandleTranslate" ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"/>
                                            </div>
                                        ) : (
                                            "Translate"
                                        )}

                                    </button>
                                )}
                                {sessionData.data.RShowTranslation && (
                                    <button 
                                        disabled= {isLoading && loadingSource === "ReadingCalculateRate"}
                                        onClick={() => calculateRate({sessionData, oldSessionId, showAlert, updateReadingSession, setLoading})} 
                                        className="w-full lg:flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200"
                                    >

                                        {isLoading && loadingSource === "ReadingCalculateRate" ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        ) : (
                                            "Calculate"
                                        )}

                                    </button>
                                )}
                                <button 
                                    disabled= {(isLoading && loadingSource === "ReadingCloseAndSave") || isPending}   
                                    onClick={() => closeAndSave({userId, sessionData, oldSessionId, item, router, dispatch, showAlert, updateReadingSession, setLoading})} 
                                    className="w-full lg:flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200"
                                >
                                    
                                    {isLoading && loadingSource === "ReadingCloseAndSave" ? (
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