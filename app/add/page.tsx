"use client"

// REACT & NEXT
import { JSX } from "react"
import { useSearchParams } from "next/navigation"
// COMPONENTS
import ReadingAddOrEditComponent from "@/src/components/ReadingAddOrEditComponent/ReadingAddOrEdit"
import WritingAddOrEditComponent from "@/src/components/WritingAddOrEditComponent/WritingAddOrEdit"
import FlashcardAddOrEditComponent from "@/src/components/FlashcardAddOrEditComponent/FlashcardAddOrEdit"
import WordAddOrEditComponent from "@/src/components/WordAddOrEditComponent/WordAddOrEdit"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useAddPageReducer } from "@/src/page/AddPage/useAddPageReducer"
import { useAddPageCustomEffect } from "@/src/page/AddPage/useAddPageCustomEffect"


export default function Page(){

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