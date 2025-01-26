"use client"

// REACT & NEXT
import { useState, useEffect } from "react";
//TYPES
import { Practice } from "../types/action";
//STORE
import { GlobalStore } from "../store/globalStore";
//ACTIONS
import GetPractices from "../actions/practice";
//COMPONENTS
import InfoMessageComponent from "./infoMessage";
import PracticeComponent from "./practice";
import ShowError from "./showError";

export default function LanguagePage({language} : any) {

    //STATES
    const [practices, setPractices] = useState<Practice[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)

    //STORE
    const {setOldSessions} = GlobalStore();

    //EFFECTS
    useEffect(() => {

        setOldSessions([])
    }, [])

    useEffect(() => {
    
        // GET PRACTICES
        const GET = async () => {

            const response = await GetPractices(language)

            if(response && response.status == 200)
            {
                setPractices(response.data);
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

        GET()
    }, [language])

    if(isLoading)
    return <></>
    
    if(error != "")
    return <ShowError error={error} errorDetails={errorDetails}></ShowError>
    
    return (
        <>
            <InfoMessageComponent message="Please choose which practice you would like to do"></InfoMessageComponent>
            <PracticeComponent practices={practices} language={language}></PracticeComponent>
        </>
    )
}