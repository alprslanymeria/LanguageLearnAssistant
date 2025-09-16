// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseEditPageCustomEffectProps } from "@/src/page/EditPage/prop"


export function useEditPageCustomEffect( params : UseEditPageCustomEffectProps ) {

    const {table, dispatch} = params

    useEffect(() => {

        // STORE'DAN VERİ GELMEDİĞİ İÇİN HASHYDRATED KULLANILMADI

        const kese = [table]

        if(kese.some(k => !k)) return

        //SET ACTIVE COMPONENT
        if(table == "rbooks") dispatch({type: "SET_ACTIVE_COMPONENT", payload: {activeComponent: "reading"}})
        if(table == "wbooks") dispatch({type: "SET_ACTIVE_COMPONENT", payload: {activeComponent: "writing"}})
        if(table == "lfilms") dispatch({type: "SET_ACTIVE_COMPONENT", payload: {activeComponent: "listening"}})
        if(table == "fcategories") dispatch({type: "SET_ACTIVE_COMPONENT", payload: {activeComponent: "flashcard"}})
        if(table == "fwords") dispatch({type: "SET_ACTIVE_COMPONENT", payload: {activeComponent: "word"}})

    }, [table, dispatch])

}