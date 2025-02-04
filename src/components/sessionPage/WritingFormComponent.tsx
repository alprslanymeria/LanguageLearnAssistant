"use client"

import { DeleteLiveSession } from "@/src/actions/liveSession";
import { SaveOldSession } from "@/src/actions/oldSession";
import { rate } from "@/src/actions/rate";
import { SaveReadingRows, SaveWritingRows } from "@/src/actions/rows";
import translateText from "@/src/actions/translate";
import { GlobalStore } from "@/src/store/globalStore"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function WritingFormComponent({item} : any) {


    //GLOBAL STORE
    const {SessionData, updateSessionData, OldSessionId} = GlobalStore();

    //ROUTER
    const router = useRouter();

    //SESSION
    const session = useSession()
    const userId = session.data?.user.userId

    //FUNCTIONS
    const handleTextSelection  = () => {

        const selected = window.getSelection()?.toString()
        updateSessionData("selectedText", selected)
        updateSessionData("showTranslation", true)

    }

    const handleTranslate = async () => {

        const translations = await translateText(SessionData.inputText, item.writing.languageId, item.writing.practiceId, userId)
        updateSessionData("translatedText", translations)
        updateSessionData("showTranslation", true)
    }

    const calculateRate = async () => {

        //CHECK
        if(SessionData.selectedText == "" || SessionData.translatedText == "")
        {
            alert("Gerekli alanları doldurunuz!")
            return
        }

        //CALCULATE SIMILARITY
        const similarity = await rate(SessionData.selectedText, SessionData.translatedText.at(0))
        alert(`Benzerlik oranı: ${(similarity * 100).toFixed(2)}%`)

        //SAVED TO LOCAL STATE
        const sentence = {
            OldSessionId: OldSessionId,
            selectedSentence: SessionData.selectedText,
            answer: SessionData.inputText,
            answerTranslate: SessionData.translatedText,
            similarity: similarity
        }
        updateSessionData("sessionSentences", [...SessionData.sessionSentences, sentence])

        //CLEAR STATES
        updateSessionData("selectedText", "")
        updateSessionData("inputText", "")
        updateSessionData("translatedText", "")
        updateSessionData("showTranslation", false)
    }

    const closeAndSave = async () => {

        try {
            
            //CALCULATE AVERAGE RATE
        const totalRate = SessionData.sessionSentences.reduce((acc: any, item: any) => acc + item.similarity, 0)
        const averageRate = totalRate / SessionData.sessionSentences.length

        const row = {
            from : "writing",
            OldSessionId: OldSessionId,
            writingId: item.writingId,
            bookId: item.id,
            rate: (averageRate * 100).toFixed(2),
        }

        //SAVE OLD SESSION
        await SaveOldSession(row)
            
        //SAVE SENTENCES
        await SaveWritingRows(SessionData.sessionSentences)        

        //DELETE LIVE SESSION
        await DeleteLiveSession(userId)
        } catch (error:any) {
            
            console.log(error.message)
            console.log(error.details)
        }
        
        
        router.push("/")

    }

    return (

        <div className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-1/2">
            <div className="bg-white">
                <div className="space-y-4">

                    {/* //FIRST TEXT AREA */}
                    <textarea
                        readOnly={true}
                        value={SessionData.selectedText}
                        placeholder="Selected text will appear here"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* //SECOND TEXT AREA */}
                    <textarea
                        value={SessionData.inputText}
                        onChange={(e) => updateSessionData("inputText", e.target.value)}
                        placeholder="Type your text here"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* //THIRD TEXT AREA */}
                    {SessionData.showTranslation && 
                    
                        <textarea
                            readOnly={true}
                            value={SessionData.translatedText}
                            placeholder="Translation will appear here"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    
                    }
                    
                    {/* //BUTTONS */}
                    <div className='flex flex-wrap gap-4 justify-around'>
                        <button onClick={handleTextSelection} className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Select Text</button>
                        <button onClick={handleTranslate} className="w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Translate</button>
                        <button onClick={calculateRate} className="w-full lg:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Calculate</button>
                        <button onClick={closeAndSave} className="w-full lg:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200">Close & Save</button>
                    </div>

                </div>
            </div>
        </div>
    )
}