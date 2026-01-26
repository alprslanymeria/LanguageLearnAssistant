// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseFlashcardSessionCustomEffectProps } from "@/src/components/FlashcardSessionComponent/prop"
import { FlashcardRowItemRequest } from "@/src/actions/FlashcardSessionRow/Request"


export function useFlashcardSessionCustomEffect(params : UseFlashcardSessionCustomEffectProps) {

    const {state, sessionData, hasHydrated, dispatch} = params

    // USE EFFECT ONE
    useEffect(() => {

        if(!hasHydrated) return

        const kese = [state, sessionData]

        if(kese.some(k => !k)) return

        const start = (state.page - 1) * state.limit
        const sliced = sessionData.rows.slice(start, start + state.limit) as FlashcardRowItemRequest[]

        dispatch({type: "SET_PAGINATED_ROWS", payload: {paginatedRows: sliced}})

    }, [sessionData.rows, state.page, state.limit, hasHydrated])


    // USE EFFECT TWO
    useEffect(() => {

        if(!hasHydrated) return
        
        const kese = [sessionData]

        if(kese.some(k => !k)) return
            
        dispatch({ type: "SET_TOTAL", payload: { total: sessionData.rows.length } })
        
    }, [sessionData?.rows?.length, hasHydrated, dispatch])

}