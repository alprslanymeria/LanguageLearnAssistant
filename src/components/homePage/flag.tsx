"use client"

//REACT & NEXT
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
//TYPES
import { flagComponentPropTypes } from "../../types/prop"
//ASSETS
import { mitr } from "@/public/fonts"
import { useSession } from "next-auth/react"
import { CheckLanguageId } from "@/src/actions/language"
//COMPONENTS
import ShowErrorComponent from "../utils/showError"
import AlertComponent from "../utils/alertComponent"


export default function FlagComponent({languages} : flagComponentPropTypes) {

    //STATES
    const [targetLanguage, setTargetLanguage] = useState<string>("")
    const [targetLanguageId, setTargetLanguageId] = useState<number>(0)
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState<string>("")
    const router = useRouter()

    //SESSION
    const session = useSession()
    const userId = session?.data?.user?.id

    //HANDLE FLAG CLICK
    const handleFlagClick = async (language : any) => {
        setTargetLanguage(language.name)
        setTargetLanguageId(language.id)
    }

    // HANDLE START CLICK
    const handleStartClick = async () => {

        //CHECK USER LOGGED IN
        if(userId == null || userId == undefined) {
            
            setAlertMessage("Lütfen giriş yapınız!")
            setShowAlert(true)
            return
        }

        //CHECK IS SELECTED
        if (!targetLanguage) {

            setAlertMessage("Lütfen bir dil seçiniz!")
            setShowAlert(true)
            return
        }

        //CHECK NATIVE LANGUAGE ID
        const response = await CheckLanguageId(userId, targetLanguageId)
 
        if(response && response.status == 500) {
            
            setError(response.message ?? null)
            setErrorDetails(response.details ?? null)
            return <ShowErrorComponent error={error} errorDetails={errorDetails}/>
        }

        if(response?.data == true) {
            
            setAlertMessage("Native Language Çalışılamaz, Lütfen başka dil seçiniz.")
            setShowAlert(true)
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

            <div className="flex justify-center mt-6">
                {showAlert && (
                    <AlertComponent
                        type="warning"
                        title="Warning"
                        message={alertMessage}
                        duration={3000}
                        onClose={() => setShowAlert(false)}
                    />
                )}
            </div>
        </>
    )
}