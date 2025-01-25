"use client"

//ASSETS
import { markazi } from "@/public/fonts"
//TYPES
import { infoMessageComponentPropTypes } from "../types/prop"

export default function InfoMessageComponent({message} : infoMessageComponentPropTypes) {
    return (
        <p className={`${markazi.className} mb-20 px-4 text-[#CA5656] text-2xl font-normal text-center`}>{message}</p>
    )
}