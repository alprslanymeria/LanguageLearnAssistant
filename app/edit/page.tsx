"use client"

// REACT & NEXT
import { useSearchParams } from "next/navigation"
import { JSX, Suspense } from "react"
//COMPONENTS
import ReadingEditComponent from "@/src/components/ReadingEditComponent/ReadingEdit"
import WritingEditComponent from "@/src/components/WritingEditComponent/WritingEdit"
import FlashcardEditComponent from "@/src/components/FlashcardEditComponent/FlashcardEdit"
import WordEditComponent from "@/src/components/WordEditComponent/WordEdit"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useEditPageReducer } from "@/src/page/EditPage/useEditPageReducer"
import { useEditPageCustomEffect } from "@/src/page/EditPage/useEditPageCustomEffect"


// BUILD SIRASINDA HATA VERDİĞİ İÇİN SUSPENSE BOUNDARY İÇERİSİNE ALINDI.
function EditPage() {

    //SEARCH PARAMS
    const searchParams = useSearchParams()
    const itemId = searchParams!.get("id")
    const table = searchParams!.get("table")

    //HOOKS
    const {state, dispatch} = useEditPageReducer()

    //COMPONENT MAP
    const componentMap: Record<string, JSX.Element> = {

        reading: <ReadingEditComponent itemId={itemId!}/>,
        writing: <WritingEditComponent itemId={itemId!}/>,
        flashcard: <FlashcardEditComponent itemId={itemId!}/>,
        word: <WordEditComponent itemId={itemId!}/>
    }

    //USE EFFECTS
    useEditPageCustomEffect({table, dispatch})

    return (

        <div>
            {componentMap[state.activeComponent] || <div></div>}
        </div>
    )
}


export default function Page(){

    return (

        <Suspense>
            <EditPage/>
        </Suspense>
    )
}