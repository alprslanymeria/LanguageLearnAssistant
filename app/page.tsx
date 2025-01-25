"use client"

// REACT & NEXT
import { useState, useEffect } from "react";
//ACTIONS
import { GetLanguages } from "@/src/actions/language";
//COMPONENTS
import InfoMessageComponent from "@/src/components/infoMessage";
import FlagComponent from "@/src/components/flag";
import ShowError from "@/src/components/showError";
//TYPES
import { Language } from "@/src/types/action";

export default function Home() {

  //STATES
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>("")
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  useEffect(() => {
  
    // GET LANGUAGES
    const GET = async () => {

        const response = await GetLanguages();

        if(response && response.status == 200)
        {
            setLanguages(response.data);
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
  }, [])

  if(isLoading)
  return <></>

  if(error != "")
  return <ShowError error={error} errorDetails={errorDetails}></ShowError>

  return (
    <>
      <InfoMessageComponent message="Please choose which language you would like to learn"/>
      <FlagComponent languages={languages}/>
    </>
  );
}
