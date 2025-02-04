"use client"

import { useEffect, useState } from "react"
import DeckHalfSvg from "@/src/components/svg/DeckHalfSvg"
import DeckFullSvg from "@/src/components/svg/DeckFullSvg"
import { GlobalStore } from "@/src/store/globalStore"
import { GetLanguageName } from "@/src/actions/language"
import { DeleteLiveSession } from "@/src/actions/liveSession"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SaveOldSession } from "@/src/actions/oldSession"
import { SaveFlashcardRows } from "@/src/actions/rows"
import TableComponent from "../detailPage/table"

export default function FlashcardSession({item} : any) {

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

    //BUTTONS
    const [showNextButton, setShowNextButton] = useState(false)
    const [showCloseButton, setShowCloseButton] = useState(false)

    //STORE
    const {SessionData, OldSessionId, updateSessionData} = GlobalStore();

    //USE EFFECT
    useEffect(() => {

        //GET LANGUAGE NAME
        const GET = async () => {

            const response = await GetLanguageName(item.flashcardId)

            if(response?.status !== 200) return

            setLanguage(response.data)            
        }

        GET()

        setText1(item.deckWords.at(SessionData.index).question)
        setText2(item.deckWords.at(SessionData.index).answer)

    }, [])

    //Handle Yes or No Button
    const handleClick = (status : boolean) => {

        updateSessionData("index", SessionData.index + 1)
        setIsShow(!isShow)
        setShowNextButton(true)

        //SAVED TO LOCAL STATE
        const word = {
            OldSessionId: OldSessionId,
            question: text1,
            answer: text2,
            status: status
        }

        updateSessionData("sessionWords", [...SessionData.sessionWords, word])

    }

    //Handle Next Button
    const handleNextClick = () => {

        if(SessionData.index == item.deckWords.length)
        {
            alert("All words are done")
            setShowCloseButton(true)
            return
        }

        setText1(item.deckWords.at(SessionData.index).question)
        setText2(item.deckWords.at(SessionData.index).answer)
        setIsShow(!isShow)
        setShowNextButton(false)

    }

    //Handle Close Button
    const handleCloseClick = async () => {

        const row = {
            from : "flashcard",
            OldSessionId: OldSessionId,
            flashcardId: item.flashcardId,
            categoryId: item.id,
            rate: 0,
        }

        //SAVE OLD SESSION
        await SaveOldSession(row)

        //SAVE WORDS
        await SaveFlashcardRows(SessionData.sessionWords)

        //DELETE LIVE SESSION
        await DeleteLiveSession(userId)

        router.push("/")
    }

    return (
        
        <div className="container flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto px-4">

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
            <TableComponent type="flashcard" columns={["Question", "Answer", "Status"]} contents={SessionData.sessionWords}></TableComponent>
        </div>
    )
}