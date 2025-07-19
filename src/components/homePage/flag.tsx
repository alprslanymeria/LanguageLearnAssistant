"use client"

//REACT & NEXT
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
//TYPES
import { flagComponentPropTypes } from "../../types/prop"
//ASSETS
import { mitr } from "@/public/fonts"
import { useSession } from "next-auth/react"
import { CheckLanguageId } from "@/src/actions/language"


export default function FlagComponent({languages} : flagComponentPropTypes) {

    //STATES
    const [targetLanguage, setTargetLanguage] = useState<string>("")
    const [targetLanguageId, setTargetLanguageId] = useState<number>(0)
    const router = useRouter()

    //SESSION
    const session = useSession()
    const userId = session.data?.user.userId


    //HANDLE CLICK
    const handleFlagClick = async (language : any) => {
        setTargetLanguage(language.name)
        setTargetLanguageId(language.id)
    }

    // HANDLE START BUTTON
    const handleStartClick = async () => {

        //CHECK IS SELECTED
        if (!targetLanguage) {
            alert("Lütfen bir dil seçiniz.")
            return
        }

        //CHECK NATIVE LANGUAGE ID
        const response = await CheckLanguageId(userId, targetLanguageId)

        if(response?.data == true) {
            alert("Native Language Çalışılamaz, Lütfen başka dil seçiniz.")
            return
        }

        router.push(`/lang?language=${targetLanguage}`)
    }

    return (
        
        <>
            <div className="flex flex-wrap justify-center gap-10">
                {
                    languages
                    .slice(0, 4)
                    .map((language, index) => {
                        return(
                            <div key={index} className="m-2">
                                <Image 
                                    src={language.imageUrl}
                                    alt={language.name}
                                    width={100} 
                                    height={100} 
                                    className={`object-contain ${targetLanguage === language.name ? "border-4 border-blue-500 rounded-full": ""}`}
                                    onClick={() => handleFlagClick(language)}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-center mt-4">
                <button
                onClick={handleStartClick}
                className={` ${mitr.className} mt-20 bg-[#58CC02] text-white font-medium py-3 px-20 rounded-lg shadow-md shadow-[#58A700] hover:bg-[#58A700] transition-colors duration-300`}
                >
                BAŞLA
                </button>
            </div>
        </>
    )
}