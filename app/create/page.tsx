"use client"

// REACT & NEXT
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
//ACTIONS
import GetCreateItems from "@/src/actions/utils";
//STORE
import { GlobalStore } from "@/src/store/globalStore";
//COMPONENTS
import ShowError from "@/src/components/utils/showError";
import SliderComponent from "@/src/components/createPage/slider";

export default function Create() {

    //SEARCH PARAMS
    const searchParams = useSearchParams();
    const language = searchParams.get("language");
    const practice = searchParams.get("practice");

    //STATES
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)

    //SESSION
    const session = useSession();
    const userId = session.data?.user.userId

    //STORE
    const {setItems, setSessionData} = GlobalStore();

    useEffect(() => {

        setSessionData({index: 0, sessionWords: [], sessionSentences: [], row: []})
        
        // GET PRACTICES
        const GET = async () => {

            const response = await GetCreateItems(language, practice, userId)

            if(response && response.status == 200)
            {
                console.log(response.data)
                setItems(response.data);
                setIsLoading(false)
                return
            } 
            if(response && response.status == 500 ){
                
                setError(response.message ?? null);
                setErrorDetails(response.details ?? null);
                setIsLoading(false)
                return
            }

            setIsLoading(false)
            setError('An unknown error occurred');
        }

        GET()

    }, [language, practice])

    if(isLoading) return <></>

    if(error && error !== "") return <ShowError error={error} errorDetails={errorDetails}></ShowError>

    return (

        <>
            <SliderComponent practice={practice} language={language}></SliderComponent>
        </>
    );
}