"use client"

// REACT & NEXT
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
// STORE
import { GlobalStore } from "@/src/store/globalStore"
// COMPONENTS
import ShowErrorComponent from "../utils/showError"
// ACTIONS
import { rate } from "@/src/actions/rate"
import { SaveRows } from "@/src/actions/rows"
import translateText from "@/src/actions/translate"
import { SaveOldSession } from "@/src/actions/oldSession"
import { DeleteLiveSession } from "@/src/actions/liveSession"



export default function ReadingFormComponent({item} : any) {


    //GLOBAL STORE
    const {SessionData, updateSessionData, OldSessionId, Language, Practice} = GlobalStore()

    //ROUTER
    const router = useRouter()

    //STATES
    const [error, setError] = useState<any>(null)
    const [errorDetails, setErrorDetails] = useState<any>(null)

    //SESSION
    const session = useSession()
    const userId = session.data?.user?.id

    //FUNCTIONS
    const handleTextSelection  = () => {

        const selected = window.getSelection()?.toString()
        updateSessionData("selectedText", selected)
    }

    const handleTranslate = async () => {

        const translations = await translateText(SessionData.selectedText, userId, Language, Practice)
        updateSessionData("translatedText", translations)
        updateSessionData("showTranslation", true)
    }

    const calculateRate = async () => {

        //CHECK
        if(SessionData.inputText == "" || SessionData.translatedText == "")
        {
            alert("Gerekli alanları doldurunuz!")
            return
        }

        //CALCULATE SIMILARITY
        const similarity = await rate(SessionData.inputText, SessionData.translatedText)
        alert(`Benzerlik oranı: ${(similarity * 100).toFixed(2)}%`)

        //SAVED TO LOCAL STATE
        const row = {
            from : "reading",
            OldSessionId: OldSessionId,
            selectedSentence: SessionData.selectedText,
            answer: SessionData.inputText,
            answerTranslate: SessionData.translatedText,
            similarity: similarity
        }
        updateSessionData("rows", [...SessionData.rows, row])

        //CLEAR STATES
        updateSessionData("selectedText", "")
        updateSessionData("inputText", "")
        updateSessionData("translatedText", "")
        updateSessionData("showTranslation", false)
    }

    const closeAndSave = async () => {

        try {
            
            //CALCULATE AVERAGE RATE
            const totalRate = SessionData.rows.reduce((acc: any, item: any) => acc + item.similarity, 0)
            const averageRate = totalRate / SessionData.rows.length

            const oldSessionRow = {
                from : "reading",
                OldSessionId: OldSessionId,
                readingId: item.readingId,
                bookId: item.id,
                rate: (averageRate * 100).toFixed(2),
            }

            //SAVE OLD SESSION
            await SaveOldSession(oldSessionRow)
                
            //SAVE SENTENCES
            await SaveRows(SessionData.rows)
        
            //DELETE LIVE SESSION
            await DeleteLiveSession(userId)

        } catch (error:any) {
            
            setError(error.message)
            setErrorDetails(error.details)
        }
        
        router.push("/")
    }

    if(error && error !== "") return <ShowErrorComponent error={error} errorDetails={errorDetails}/>

    return (

        <div className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-1/2">
            <div className="bg-white">
                <div className="space-y-4">

                    {/* //FIRST TEXT AREA */}
                    <textarea
                        readOnly={true}
                        value={SessionData.selectedText}
                        placeholder="Please choose text"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* //SECOND TEXT AREA */}
                    {SessionData.selectedText && (

                        <textarea
                            value={SessionData.inputText}
                            onChange={(e) => updateSessionData("inputText", e.target.value)}
                            placeholder="Your Answer"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />)
                    }
                    

                    {/* //THIRD TEXT AREA */}
                    {SessionData.showTranslation && 
                    
                        <textarea
                            readOnly={true}
                            value={SessionData.translatedText}
                            placeholder="Translation"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    
                    }
                    
                    {/* //BUTTONS */}
                    <div className='flex flex-wrap gap-4 justify-around'>
                        <button onClick={handleTextSelection} className="w-full lg:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Select Text</button>
                        {SessionData.inputText && (
                            <button onClick={handleTranslate} className="w-full lg:flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Translate</button>
                        )}
                        {SessionData.showTranslation && (
                            <button onClick={calculateRate} className="w-full lg:flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Calculate</button>
                        )}
                        <button onClick={closeAndSave} className="w-full lg:flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Close & Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}