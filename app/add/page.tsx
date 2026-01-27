"use client"

// REACT & NEXT
import { JSX, Suspense } from "react"
import { useSearchParams } from "next/navigation"
// COMPONENTS
import ReadingAddComponent from "@/src/components/ReadingAddComponent/ReadingAdd"
import WritingAddComponent from "@/src/components/WritingAddComponent/WritingAdd"
import FlashcardAddComponent from "@/src/components/FlashcardAddComponent/FlashcardAdd"
import WordAddComponent from "@/src/components/WordAddComponent/WordAdd"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useAddPageReducer } from "@/src/page/AddPage/useAddPageReducer"
import { useAddPageCustomEffect } from "@/src/page/AddPage/useAddPageCustomEffect"


// BUILD SIRASINDA HATA VERDİĞİ İÇİN SUSPENSE BOUNDARY İÇERİSİNE ALINDI.
function AddPage() {

    //SEARCH PARAMS
    const searchParams = useSearchParams()
    const table = searchParams!.get("table")

    //HOOKS
    const {state , dispatch} = useAddPageReducer()

    //COMPONENT MAP
    const componentMap: Record<string, JSX.Element> = {

        reading: <ReadingAddComponent/>,
        writing: <WritingAddComponent/>,
        flashcard: <FlashcardAddComponent/>,
        word: <WordAddComponent/>
    }

    // USE EFFECTS
    useAddPageCustomEffect({table, dispatch})

    return (

        <div>
            {componentMap[state.activeComponent] || <div></div>}
        </div>

    )
}


export default function Page(){

    return (

        <Suspense>
            <AddPage/>
        </Suspense>
    )
}