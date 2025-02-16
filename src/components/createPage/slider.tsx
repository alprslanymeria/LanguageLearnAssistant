"use client"

// REACT & NEXT
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
//ACTIONS
import { CreateLiveSession } from "../../actions/liveSession"
//STORE
import { GlobalStore } from "../../store/globalStore"
//COMPONENTS
import PracticeCardComponent from "./practiceCard"
import ShowErrorComponent from "../utils/showError"
//LIBRARIES
import {encrypt} from "@/src/lib/crypto"
//3RD PARTY
import { v4 as uuidv4 } from 'uuid'

//BASE
const BASE = process.env.NEXT_PUBLIC_BASE_URL

export default function SliderComponent() {

    // HOOKS
    const router = useRouter()

    //STORE
    const {Items, setSelectedItemId, setOldSessionId, Language, Practice} = GlobalStore()

    //SESSION
    const session = useSession()
    const userId = session.data?.user.userId

    //STATES
    const [selectedItem, setSelectedItem] = useState<any>(null)
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)


    //FUNCTIONS
    const chooseHandler = async () => {

        //SESSION ID OLUŞTUR
        const sessionId = uuidv4()
        setOldSessionId(sessionId)

        //LIVESESSION İÇERİSİNE KAYDET
        const response = await CreateLiveSession(sessionId, userId)

        //HATALI İSE UYARI VER ANA SAYFAYA YÖNLENDİR
        if (response?.status !== 200) {
            setError(response?.message ?? null)
            setErrorDetails(response?.details ?? null)
            return
        }

        //SELECTED GÜNCELLE
        setSelectedItemId(selectedItem.id)

        //CREATE SAFE URL
        const encryptedSessionId = encrypt(sessionId)
        const safeUrl = encodeURIComponent(encryptedSessionId)

        //SESSION SAYFASINA YÖNLENDİR
        router.push(`${BASE}/session?id=${safeUrl}`)
    }

    if(error && error !== "") return <ShowErrorComponent error={error} errorDetails={errorDetails}/>

    return (

        <>
            <div className="flex justify-center w-full">
                <div className="carousel rounded-box flex md:flex-row flex-col space-y-4 md:space-y-0 md:space-x-4 gap-5 h-[550px] overflow-y-auto items-center px-10">
                {Items.map((item, index) => (
                    <div
                    key={index}
                    className={`carousel-item flex-shrink-0 cursor-pointer transform transition-all duration-300 ${
                        Practice === 'listening'
                        ? 'w-[200px] sm:w-[250px] md:w-[300px] flex flex-col'
                        : 'w-[200px] h-[324px] sm:w-[250px] sm:h-[406px] md:w-[300px] md:h-[487px] relative'
                    } ${
                        selectedItem === item
                        ? 'scale-110'
                        : 'hover:scale-102'
                    }`}
                    onClick={() => setSelectedItem(item)}
                    >
                        <PracticeCardComponent index={index} item={item}/>
                    </div>
                ))}
                </div>
            </div>

            <div className="w-full flex justify-center my-2">
                <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={chooseHandler}
                >
                CHOOSE
                </button>
            </div>
        </>
    )
}