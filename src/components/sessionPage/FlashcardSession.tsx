"use client"

// COMPONENTS
import TableComponent from "../detailPage/table"
import GameComponent from "./GameComponent"
// STORE
import { GlobalStore } from "@/src/store/globalStore"


export default function FlashcardSessionComponent({item} : any) {

    //STORE
    const {SessionData} = GlobalStore()

    return (
        
        <div className="container flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto px-4">
            <GameComponent item={item}/>
            <TableComponent type="flashcard" columns={["Question", "Answer", "Status"]} contents={SessionData.sessionWords}/>
        </div>
    )
}