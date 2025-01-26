"use client"

// REACT & NEXT
import { useState, useEffect } from "react";
//STORE
import { GlobalStore } from "../store/globalStore"
// COMPONENTS
import InfoMessageComponent from "./infoMessage"
import OldSessionComponent from "./oldSession"
import { useSession } from "next-auth/react";
import GetOldSessions from "../actions/oldSession";
import ShowError from "./showError";

export default function PracticePage({language, practice}: any) {

    //SESSION
    const session = useSession();
    const userId = session.data?.user.userId

    //STATES
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)

    //STORE
    const {setData, setSelected, setOldSessions} = GlobalStore();
    

    //EFFECTS
    useEffect(() => {

        setData([])
        setSelected(0)

    }, [])


    useEffect(() => {

        const GET = async () => {

            const response = await GetOldSessions(language, practice, userId)

            if(response && response.status == 200)
            {
                setOldSessions(response.data);
                setIsLoading(false)
                return
            } 
            if(response && response.status == 500){
                
                setError(response.message ?? null);
                setErrorDetails(response.details ?? null);
                setIsLoading(false)
                return
            }

            setIsLoading(false)
            setError('An unknown error occurred');

        }

        GET();

    }, [language, practice, userId])

    if(isLoading)
    return <></>
        
    if(error != "")
    return <ShowError error={error} errorDetails={errorDetails}></ShowError>
    
    return(
        <>
            <InfoMessageComponent message="On this page, you can see the work you have done in previous sessions or open a new session."/>
            <OldSessionComponent language={language} practice={practice}/>
        </>
    )
}