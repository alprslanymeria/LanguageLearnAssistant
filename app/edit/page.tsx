"use client"

// REACT & NEXT
import { useSearchParams } from "next/navigation"
import { JSX, Suspense } from "react"
//COMPONENTS
import ReadingAddOrEditComponent from "@/src/components/ReadingEditComponent/ReadingEdit"
import WritingAddOrEditComponent from "@/src/components/WritingEditComponent/WritingEdit"
import FlashcardAddOrEditComponent from "@/src/components/FlashcardAddComponent/FlashcardAdd"
import WordAddOrEditComponent from "@/src/components/WordEditComponent/WordEdit"
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

        reading: <ReadingAddOrEditComponent type="Edit" itemId={itemId}/>,
        writing: <WritingAddOrEditComponent type="Edit" itemId={itemId}/>,
        flashcard: <FlashcardAddOrEditComponent type="Edit" itemId={itemId}/>,
        word: <WordAddOrEditComponent type="Edit" itemId={itemId}/>
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