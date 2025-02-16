"use client"

// REACT & NEXT
import { useState, useEffect } from "react"
//ACTIONS
import { GetLanguages } from "@/src/actions/language"
//COMPONENTS
import InfoMessageComponent from "@/src/components/utils/infoMessage"
import FlagComponent from "@/src/components/homePage/flag"
import ShowErrorComponent from "@/src/components/utils/showError"
//TYPES
import { Language } from "@prisma/client"

export default function HomePage() {

  //STATES
  const [languages, setLanguages] = useState<Language[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>("")
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  useEffect(() => {
  
    // GET LANGUAGES
    const GET = async () => {

        const response = await GetLanguages()

        if(response && response.status == 200)
        {
            setLanguages(response.data)
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

  }, [isLoading])

  if(isLoading) return <></>

  if(error && error !== "") return <ShowErrorComponent error={error} errorDetails={errorDetails}/>

  return (
    <>
      <InfoMessageComponent message="Please choose which language you would like to learn"/>
      <FlagComponent languages={languages}/>
    </>
  )
}