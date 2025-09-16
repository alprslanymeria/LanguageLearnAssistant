"use client"

// ASSETS
import { markazi } from "@/public/fonts"
// TYPES
import { InfoMessageComponentProps } from "@/src/components/InfoMessageComponent/prop"

export default function InfoMessageComponent({message} : InfoMessageComponentProps) {
    
    return (
        
        <p className={`${markazi.className} mb-20 px-4 text-[#CA5656] text-2xl font-normal text-center`}>{message}</p>
    )
}