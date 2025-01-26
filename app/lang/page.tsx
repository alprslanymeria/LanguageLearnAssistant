"use client"

// REACT & NEXT
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"
//COMPONENTS
import LanguagePage from "@/src/components/languagePage";
import PracticePage from "@/src/components/practicePage";

export default function Page() {

    //GET SEARCH PARAMS
    const searchParams = useSearchParams();
    const language = searchParams.get("language");
    const practice = searchParams.get("practice");

    //True ise language göster
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {

        if(practice == "" || practice == null)
            setIsShow(true)
        else
            setIsShow(false)
    }, []);
    
    return (
        <>
        {isShow
        ? <LanguagePage language={language}/>
        : <PracticePage language={language} practice={practice}/>}
        </>
    )
}