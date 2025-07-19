"use client"

// REACT & NEXT
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
// ACTIONS
import { rate } from "@/src/actions/rate"
import { SaveRows } from "@/src/actions/rows"
import { SaveOldSession } from "@/src/actions/oldSession"
import { DeleteLiveSession } from "@/src/actions/liveSession"
// STORE
import { GlobalStore } from "@/src/store/globalStore"


export default function ListeningFormComponent({item} : any) {

    //STORE
    const {SessionData, updateSessionData, OldSessionId} = GlobalStore()

    //ROUTER
    const router = useRouter()

    //STATES
    const [error, setError] = useState<any>(null)
    const [errorDetails, setErrorDetails] = useState<any>(null)

    //SESSION
    const session = useSession()
    const userId = session.data?.user.userId

    //FUNCTIONS
    const handleShowAnswer = () => updateSessionData("showAnswer", true)

    const calculateRate = async () => {

        //CHECK
        if(SessionData.extractedText == "" || SessionData.textHeardByUser == "")
        {
            alert("Gerekli alanları doldurunuz!")
            return
        }

        //CALCULATE SIMILARITY
        const similarity = await rate(SessionData.extractedText, SessionData.textHeardByUser)
        alert(`Benzerlik oranı: ${(similarity * 100).toFixed(2)}%`)

        //SAVED TO LOCAL STATE
        const row = {
            from: "listening",
            OldSessionId: OldSessionId,
            listenedSentence: SessionData.extractedText,
            answer: SessionData.textHeardByUser,
            similarity: similarity
        }
        updateSessionData("rows", [...SessionData.rows, row])

        //CLEAR STATES
        updateSessionData("extractedText", "")
        updateSessionData("textHeardByUser", "")
        updateSessionData("showAnswer", false)
    }

    const closeAndSave = async () => {

        try {
                    
            //CALCULATE AVERAGE RATE
            const totalRate = SessionData.rows.reduce((acc: any, item: any) => acc + item.similarity, 0)
            const averageRate = totalRate / SessionData.rows.length

            const oldSessionRow = {
                from : "listening",
                OldSessionId: OldSessionId,
                listeningId: item.listeningId,
                filmId: item.id,
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

    return (

        <div>

            {/* //FIRST TEXT AREA */}
            <textarea
                value={SessionData.textHeardByUser}
                onChange={(e) => updateSessionData("textHeardByUser", e.target.value)}
                placeholder="Write down what you hear..."
                className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* //SECOND TEXT AREA */}
            {SessionData.showAnswer && 
            
                <textarea
                    readOnly={true}
                    value={SessionData.extractedText}
                    placeholder="Answer will appear here"
                    className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            }

            {/* //BUTTONS */}
            <div className='flex flex-wrap gap-4 justify-around'>
                <button onClick={handleShowAnswer} className="w-full lg:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Show Answer</button>
                <button onClick={calculateRate} className="w-full lg:flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Calculate</button>
                <button onClick={closeAndSave} className="w-full lg:flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Close & Save</button>
            </div>
        </div>
    )
}