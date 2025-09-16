// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { useSessionPageCustomEffectProps } from "@/src/page/SessionPage/prop"


export function useSessionPageCustomEffect(params : useSessionPageCustomEffectProps) {

    const {language, practice, createItems, oldSessions, oldSessionId, selectedItemId, hasHydrated, router, setSelectedItem, resetExcept, dispatch} = params

    // USE EFFECT ONE
    useEffect(() => {

        if(!hasHydrated) return

        const kese = [language , oldSessions , oldSessionId, selectedItemId, createItems]

        if(kese.some(k => k === null)) router.push("/")

    }, [language , oldSessions, oldSessionId, selectedItemId, createItems, hasHydrated])


    // USE EFFECT TWO
    useEffect(() => {

        if(!hasHydrated) return

        const kese = [practice , createItems]

        if(kese.some(k => !k)) return

        //SET ACTIVE COMPONENT
        if(practice == "reading") dispatch({type: "SET_ACTIVE_COMPONENT", payload: {activeComponent: "reading"}})
        if(practice == "writing") dispatch({type: "SET_ACTIVE_COMPONENT", payload: {activeComponent: "writing"}})
        if(practice == "listening") dispatch({type: "SET_ACTIVE_COMPONENT", payload: {activeComponent: "listening"}})
        if(practice == "flashcard") dispatch({type: "SET_ACTIVE_COMPONENT", payload: {activeComponent: "flashcard"}})

        //GET SELECTED ITEM
        const selectedItem = createItems!.find((item) => item.id === selectedItemId)

        setSelectedItem(selectedItem!)

    }, [practice, createItems, hasHydrated, dispatch])


    // USE EFFECT THREE
    useEffect(() => {

        if(!hasHydrated) return

        return () => {

            resetExcept(["Language", "Practice", "OldSessions", "CreateItems", "OldSessionId", "SelectedItemId", "SessionData"])
        }

    }, [hasHydrated])

}