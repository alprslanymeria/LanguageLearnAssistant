"use client"

// REACT & NEXT
import { useState, useEffect } from "react"
//STORE
import { GlobalStore } from "../../store/globalStore"
//ACTIONS
import GetOldSessions from "../../actions/oldSession"
// COMPONENTS
import InfoMessageComponent from "../utils/infoMessage"
import OldSessionComponent from "./oldSession"
import ShowErrorComponent from "../utils/showError"
// NEXT-AUTH
import { useSession } from "next-auth/react"
//TYPES
import { practicePagePropTypes } from "@/src/types/prop"

export default function PracticePageComponent({language, practice}: practicePagePropTypes) {

    //SESSION
    const session = useSession()
    const userId = session.data?.user?.id

    //STATES
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)

    //STORE
    const {setItems, setSelectedItemId, setOldSessions} = GlobalStore()

    //EFFECTS
    useEffect(() => {

        setItems([])
        setSelectedItemId(0)

    }, [])

    useEffect(() => {

        const GET = async () => {

            const response = await GetOldSessions(language, practice, userId)

            if(response && response.status == 200)
            {
                setOldSessions(response.data)
                setIsLoading(false)
                return
            } 
            if(response && response.status == 500){
                
                setError(response.message ?? null)
                setErrorDetails(response.details ?? null)
                setIsLoading(false)
                return
            }

            setIsLoading(false)
            setError('An unknown error occurred')
        }

        GET()

    }, [language, practice, userId])

    if(isLoading) return <></>
        
    if(error && error !== "") return <ShowErrorComponent error={error} errorDetails={errorDetails}/>
    
    return(
        <>
            <InfoMessageComponent message="On this page, you can see the work you have done in previous sessions or open a new session."/>
            <OldSessionComponent language={language} practice={practice}/>
        </>
    )
}