"use client"

// REACT & NEXT
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
// ACTIONS
import { GlobalStore } from "@/src/store/globalStore"
import { GetLanguageName } from "@/src/actions/language"
import { SaveOldSession } from "@/src/actions/oldSession"
import { SaveRows } from "@/src/actions/rows"
import { DeleteLiveSession } from "@/src/actions/liveSession"
// COMPONENTS
import DeckHalfSvg from "../svg/DeckHalfSvg"
import DeckFullSvg from "../svg/DeckFullSvg"

export default function GameComponent({item} : any) {

    //STATES
    const [isShow, setIsShow] = useState<boolean>(true)
    const [text1 , setText1] = useState<string>("")
    const [text2 , setText2] = useState<string>("")
    const [language, setLanguage] = useState<string>("")

    //SESSION
    const session = useSession()
    const userId = session.data?.user.userId

    //ROUTER
    const router = useRouter()

    //STATES
    const [error, setError] = useState<any>(null)
    const [errorDetails, setErrorDetails] = useState<any>(null)
    const [shuffledWords, setShuffledWords] = useState<any[]>([])

    //BUTTONS
    const [showNextButton, setShowNextButton] = useState(false)
    const [showCloseButton, setShowCloseButton] = useState(false)

    //STORE
    const {SessionData, OldSessionId, updateSessionData} = GlobalStore()

    //USE EFFECT
    useEffect(() => {

        //GET LANGUAGE NAME
        const GET = async () => {

            const response = await GetLanguageName(item.flashcardId)

            if(response?.status !== 200) return

            setLanguage(response.data)            
        }

        GET()

        // SHUFFLE DECK
        const shuffled = [...item.deckWords].sort(() => Math.random() - 0.5)
        setShuffledWords(shuffled)

        setText1(item.deckWords.at(SessionData.wordIndex).question)
        setText2(item.deckWords.at(SessionData.wordIndex).answer)

    }, [])

    useEffect(() => {

        if(shuffledWords.length > 0)
        {
            setText1(shuffledWords[SessionData.wordIndex].question)
            setText2(shuffledWords[SessionData.wordIndex].answer)
        }

    }, [shuffledWords])

    //HANDLE YES || NO BUTTON
    const handleClick = (status : boolean) => {

        updateSessionData("wordIndex", SessionData.wordIndex + 1)
        setIsShow(!isShow)
        setShowNextButton(true)

        //SAVED TO LOCAL STATE
        const row = {
            from: "flashcard",
            OldSessionId: OldSessionId,
            question: text1,
            answer: text2,
            status: status
        }

        updateSessionData("rows", [...SessionData.rows, row])

    }

    //HANDLE NEXT BUTTON
    const handleNextClick = () => {

        if(SessionData.wordIndex == shuffledWords.length)
        {
            alert("All words are done")
            setShowCloseButton(true)
            return
        }

        setText1(shuffledWords[SessionData.wordIndex].question)
        setText2(shuffledWords[SessionData.wordIndex].answer)
        setIsShow(!isShow)
        setShowNextButton(false)

    }

    //HANDLE CLOSE BUTTON
    const handleCloseClick = async () => {

        //CALCULATE AVERAGE RATE
        const totalRows = SessionData.rows.length
        const successfulRows = SessionData.rows.filter((item: any) => item.status === true).length
        const successRate = totalRows > 0 ? (successfulRows / totalRows) * 100 : 0

        const oldSessionRow = {
            from : "flashcard",
            OldSessionId: OldSessionId,
            flashcardId: item.flashcardId,
            categoryId: item.id,
            rate: successRate.toFixed(2),
        }

        try {

            //SAVE OLD SESSION
            await SaveOldSession(oldSessionRow)

            //SAVE WORDS
            await SaveRows(SessionData.rows)

            //DELETE LIVE SESSION
            await DeleteLiveSession(userId)
            
        } catch (error : any) {
            
            setError(error.message)
            setErrorDetails(error.details)
        }

        router.push("/")
    }

    return (

        <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto px-4">

            <div className="flex justify-between items-end h-[373px] sm:h-[486px] md:h-[600px]">
                {isShow ? <DeckHalfSvg language={language} text1={text1} category={item.name} /> : <DeckFullSvg language={language} text1={text1} text2={text2} category={item.name}/> }
            </div>

            <div className="flex flex-row md:flex-col my-6 md:my-0 justify-center gap-5 items-center md:items-center h-full ml-4">
                {showCloseButton ? <button onClick={handleCloseClick} className="h-full px-4 py-2 bg-yellow-500 text-white rounded min-w-[70px]">Close</button> 
                    
                    : showNextButton ? <button onClick={handleNextClick} className="h-full px-4 py-2 bg-blue-500 text-white rounded min-w-[70px]">Next</button> 
                    :
                    <>
                        <button onClick={()=> handleClick(true)} className="h-1/2 px-4 py-2 bg-green-500 text-white rounded min-w-[70px]">YES</button>
                        <button onClick={() => handleClick(false)} className="h-1/2 px-4 py-2 bg-red-500 text-white rounded min-w-[70px]">NO</button>
                    </>
                }
            </div>

        </div>
    )
}