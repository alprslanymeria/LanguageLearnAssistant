"use client"

// REACT & NEXT
import { useSearchParams } from "next/navigation"
import { useState } from "react";
//COMPONENTS
import InfoMessageComponent from "@/src/components/infoMessage";
import { useEffect } from "react";

//ACTIONS
import GetPractices from "@/src/actions/practice";
//TYPES
import { Practice } from "@/src/types/action";
import PracticeComponent from "@/src/components/practice";
import ShowError from "@/src/components/showError";
import { GlobalStore } from "@/src/store/globalStore";


export default function Page() {

    //GET SEARCH PARAMS
    const searchParams = useSearchParams();
    const language = searchParams.get("language");

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