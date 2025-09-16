"use client"

// REACT & NEXT
import { JSX } from "react"
import { useRouter } from "next/navigation"
// COMPONENTS
import FlashcardSessionComponent from "@/src/components/FlashcardSessionComponent/FlashcardSession"
import ListeningSessionComponent from "@/src/components/ListeningSessionComponent/ListeningSession"
import ReadingSessionComponent from "@/src/components/ReadingSessionComponent/ReadingSession"
import WritingSessionComponent from "@/src/components/WritingSessionComponent/WritingSession"
// STORE
import { GlobalStore } from "@/src/store/globalStore"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useSessionPageReducer } from "@/src/page/SessionPage/useSessionPageReducer"
import { useSessionPageCustomEffect } from "@/src/page/SessionPage/useSessionPageCustomEffect"


export default function Page() {

    //HOOKS
    const {state, dispatch} = useSessionPageReducer()
    const router = useRouter()

    //GLOBAL STORE
    const language = GlobalStore((state) => state.Language)
    const practice = GlobalStore((state) => state.Practice)
    const oldSessions = GlobalStore((state) => state.OldSessions)
    const createItems = GlobalStore((state) => state.CreateItems)
    const oldSessionId = GlobalStore((state) => state.OldSessionId)
    const selectedItemId = GlobalStore((state) => state.SelectedItemId)
    const hasHydrated = GlobalStore((state) => state.HasHydrated)
    const resetExcept = GlobalStore((state) => state.resetExcept)
    const setSelectedItem = GlobalStore((state) => state.setSelectedItem)

    //COMPONENT MAP
    const componentMap: Record<string, JSX.Element> = {

        reading: <ReadingSessionComponent/>,
        writing: <WritingSessionComponent/>,
        listening: <ListeningSessionComponent/>,
        flashcard: <FlashcardSessionComponent/>
        
    }

    // USE EFFECTS
    useSessionPageCustomEffect({

        language,
        practice,
        createItems,
        selectedItemId,
        oldSessionId,
        oldSessions,
        hasHydrated,
        router,
        resetExcept,
        setSelectedItem,
        dispatch
    })

    return (

        <div>
            {componentMap[state.activeComponent] || <div></div>}
        </div>
    )
}