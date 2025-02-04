"use client"

import FlashcardSession from "@/src/components/sessionPage/FlashcardSession";
import ListeningSession from "@/src/components/sessionPage/ListeningSession";
import ReadingSession from "@/src/components/sessionPage/ReadingSession";
import WritingSession from "@/src/components/sessionPage/WritingSession";
import { GlobalStore } from "@/src/store/globalStore";
import { useSearchParams } from "next/navigation";
import { useState,  useEffect, JSX } from "react";


export default function SessionPage(){

    //SEARCH PARAMS
    const searchParams = useSearchParams();
    const practice = searchParams.get("practice");

    //GLOBAL STORE
    const Items = GlobalStore(state => state.Items)
    const SelectedItemId = GlobalStore(state => state.SelectedItemId)

    //STATES
    const [item, setItem] = useState<any>(null)
    const [activeComponent, setActiveComponent] = useState<string>("")

    //COMPONENT MAP
    const componentMap: Record<string, JSX.Element> = {
        reading: <ReadingSession item={item}/>,
        writing: <WritingSession item={item}/>,
        listening: <ListeningSession item={item}/>,
        flashcard: <FlashcardSession item={item}/>,
    };

    //GET SELECTED ITEM
    useEffect(() => {

        //SET ACTIVE COMPONENT
        if(practice == "reading") setActiveComponent("reading")
        if(practice == "writing") setActiveComponent("writing")
        if(practice == "listening") setActiveComponent("listening")
        if(practice == "flashcard") setActiveComponent("flashcard")

        //GET SELECTED ITEM
        const selectedItem = Items.find(item => item.id === SelectedItemId)
        setItem(selectedItem)

    }, [practice])


    return (


        <div>
            {componentMap[activeComponent] || <div></div>}
        </div>
    );
}