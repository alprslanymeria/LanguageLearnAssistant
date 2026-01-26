"use client"

// REACT & NEXT
import { JSX, Suspense } from "react"
import { useSearchParams } from "next/navigation"
// COMPONENTS
import ReadingAddOrEditComponent from "@/src/components/ReadingEditComponent/ReadingEdit"
import WritingAddOrEditComponent from "@/src/components/WritingEditComponent/WritingEdit"
import FlashcardAddOrEditComponent from "@/src/components/FlashcardAddComponent/FlashcardAdd"
import WordAddOrEditComponent from "@/src/components/WordEditComponent/WordEdit"
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

        reading: <ReadingAddOrEditComponent type="Create"/>,
        writing: <WritingAddOrEditComponent type="Create"/>,
        flashcard: <FlashcardAddOrEditComponent type="Create"/>,
        word: <WordAddOrEditComponent type="Create"/>
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