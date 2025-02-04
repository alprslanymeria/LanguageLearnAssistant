"use client"

//REACT & NEXT
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
//TYPES
import { flagComponentPropTypes } from "../../types/prop"
//ASSETS
import { mitr } from "@/public/fonts"

export default function FlagComponent({languages} : flagComponentPropTypes) {

    //STATES
    const [selected, setSelected] = useState<string>("")

    return (
        
        <>
            <div className="flex flex-wrap justify-center gap-10">
                {
                    languages.map((language, index) => {
                        return(
                            <div key={index} className="m-2">
                                <Image 
                                    src={language.imageUrl}
                                    alt={language.name}
                                    width={100} 
                                    height={100} 
                                    className={`object-contain ${selected === language.name ? "border-4 border-blue-500 rounded-full": ""}`}
                                    onClick={() => setSelected(language.name)}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-center mt-4">
                <Link href={`/lang?language=${selected}`}>
                    <button
                    className={` ${mitr.className} mt-20 bg-[#58CC02] text-white font-medium py-3 px-20 rounded-lg shadow-md shadow-[#58A700] hover:bg-[#58A700] transition-colors duration-300`}
                    >
                    BAŞLA
                    </button>
                </Link>
            </div>
        </>
    )
}