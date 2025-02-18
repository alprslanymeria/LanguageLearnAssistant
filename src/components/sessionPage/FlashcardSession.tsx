"use client"

// REACT & NEXT
import { useRouter } from "next/navigation"
// COMPONENTS
import TableComponent from "../detailPage/table"
import GameComponent from "./GameComponent"
// STORE
import { GlobalStore } from "@/src/store/globalStore"


export default function FlashcardSessionComponent({item} : any) {

    //STORE
    const {SessionData} = GlobalStore()

    //ROUTER
    const router = useRouter()

    if(item.deckWords.length == 0)
    {
        alert("No words in this deck")
        setTimeout(() => {

            router.push("/")

        }, 1000)

        return <div></div>
    }

    return (
        
        <div className="container flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto px-4">
            <GameComponent item={item}/>
            <TableComponent type="flashcard" columns={["Question", "Answer", "Status"]} contents={SessionData.rows}/>
        </div>
    )
}