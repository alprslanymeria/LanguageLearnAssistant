"use client"

// REACT & NEXT
import Link from "next/link"
//TYPES
import { practiceComponentPropTypes } from "../../types/prop"
//ASSETS
import { mitr } from "@/public/fonts"

export default function PracticeComponent({practices, language} : practiceComponentPropTypes) {

    return (

        <>
            {practices.map((practice,index) => {
                    return (
                        <div key={index} className="flex justify-center">
                            <Link href={`/lang?language=${language}&practice=${practice.name}`}>
                                <button
                                className={` ${mitr.className} w-64 text-xl mt-5 bg-[#B95DE5] text-white font-medium py-2 rounded-lg shadow-md shadow-[#ad49db] hover:bg-[#ad49db] transition-colors duration-300`}
                                >
                                {practice.name}
                                </button>
                            </Link>
                        </div>
                    )
                })
            }
        </>
    )
}