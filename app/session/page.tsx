"use client"

// REACT & NEXT
import { useState,  useEffect, JSX } from "react"
// COMPONENTS
import FlashcardSessionComponent from "@/src/components/sessionPage/FlashcardSession"
import ListeningSessionComponent from "@/src/components/sessionPage/ListeningSession"
import ReadingSessionComponent from "@/src/components/sessionPage/ReadingSession"
import WritingSessionComponent from "@/src/components/sessionPage/WritingSession"
// STORE
import { GlobalStore } from "@/src/store/globalStore"


export default function SessionPage(){

    //GLOBAL STORE
    const {Items, SelectedItemId, Practice} = GlobalStore()

    //STATES
    const [item, setItem] = useState<any>(null)
    const [activeComponent, setActiveComponent] = useState<string>("")

    //COMPONENT MAP
    const componentMap: Record<string, JSX.Element> = {
        reading: <ReadingSessionComponent item={item}/>,
        writing: <WritingSessionComponent item={item}/>,
        listening: <ListeningSessionComponent item={item}/>,
        flashcard: <FlashcardSessionComponent item={item}/>,
    };

    //GET SELECTED ITEM
    useEffect(() => {

        //SET ACTIVE COMPONENT
        if(Practice == "reading") setActiveComponent("reading")
        if(Practice == "writing") setActiveComponent("writing")
        if(Practice == "listening") setActiveComponent("listening")
        if(Practice == "flashcard") setActiveComponent("flashcard")

        //GET SELECTED ITEM
        const selectedItem = Items.find(item => item.id === SelectedItemId)
        setItem(selectedItem)

    }, [Practice])


    return (


        <div>
            {componentMap[activeComponent] || <div></div>}
        </div>
    )
}