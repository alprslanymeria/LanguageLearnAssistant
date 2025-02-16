"use client"

// REACT & NEXT
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
//COMPONENTS
import LanguagePageComponent from "@/src/components/languagePage/languagePage"
import PracticePageComponent from "@/src/components/practicePage/practicePage"

export default function ChoosePage() {

    //GET SEARCH PARAMS
    const searchParams = useSearchParams()
    const language = searchParams.get("language")
    const practice = searchParams.get("practice")

    //IF TRUE SHOW LANGUAGE PAGE COMPONENT
    const [isShow, setIsShow] = useState(true)

    useEffect(() => {

        if(practice == "" || practice == null)
            setIsShow(true)
        else
            setIsShow(false)
    }, [practice])
    
    return (
        <>
            {isShow
            ? <LanguagePageComponent language={language}/>
            : <PracticePageComponent language={language} practice={practice}/>}
        </>
    )
}