"use client"

// REACT & NEXT
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
//ACTIONS
import GetCreateItems from "@/src/actions/utils"
//STORE
import { GlobalStore } from "@/src/store/globalStore"
//COMPONENTS
import SliderComponent from "@/src/components/createPage/slider"
import ShowErrorComponent from "@/src/components/utils/showError"

export default function CreatePage() {

    //SEARCH PARAMS
    const searchParams = useSearchParams()
    const language = searchParams.get("language")
    const practice = searchParams.get("practice")

    //STATES
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)

    //SESSION
    const session = useSession();
    const userId = session.data?.user.userId

    //STORE
    const {setItems, setSessionData, setLanguage, setPractice} = GlobalStore()

    useEffect(() => {

        //UPDATE GLOBAL STORE
        setSessionData(
        {  wordIndex: 0,
           selectedText: "", 
           inputText: "", 
           translatedText: "", 
           showTranslation: false,
           lastPlayTime: 0, lastPauseTime: 0, subtitleJson: null, textHeardByUser: "", extractedText: "", showAnswer: false, 
           sentences: [{sentenceStart: 0, sentenceEnd: 0}], sentenceIndex: 0, 
           rows: []
        })
        setLanguage(language)
        setPractice(practice)

        
        // GET CREATE ITEMS
        const GET = async () => {

            const response = await GetCreateItems(language, practice, userId)

            if(response && response.status == 200)
            {
                console.log(response.data)
                setItems(response.data)
                setIsLoading(false)
                return
            } 
            if(response && response.status == 500 ){
                
                setError(response.message ?? null)
                setErrorDetails(response.details ?? null)
                setIsLoading(false)
                return
            }

            setIsLoading(false)
            setError('An unknown error occurred')
        }

        GET()

    }, [language, practice])

    if(isLoading) return <></>

    if(error && error !== "") return <ShowErrorComponent error={error} errorDetails={errorDetails}/>

    return (

        <>
            <SliderComponent/>
        </>
    )
}