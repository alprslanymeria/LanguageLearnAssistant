// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseReadingSessionCustomEffectProps } from "@/src/components/ReadingSessionComponent/prop"
import { ReadingRowItemRequest } from "@/src/actions/ReadingSessionRow/Request"


export function useReadingSessionCustomEffect(params : UseReadingSessionCustomEffectProps) {

    const { state, sessionData, hasHydrated, dispatch} = params

    // USE EFFECT ONE
    useEffect(() => {

        if(!hasHydrated) return

        const kese = [state, sessionData]

        if(kese.some(k => !k)) return

        const start = (state.page - 1) * state.limit
        const sliced = sessionData.rows.slice(start, start + state.limit) as ReadingRowItemRequest[]

        dispatch({type: "SET_PAGINATED_ROWS", payload: {paginatedRows: sliced}})

    }, [sessionData.rows, state.page, state.limit, hasHydrated])


    // USE EFFECT TWO
    useEffect(() => {

        if(!hasHydrated) return
        
        const kese = [sessionData]

        if(kese.some(k => !k)) return
            
        dispatch({ type: "SET_TOTAL", payload: { total: sessionData.rows.length } })
        
    }, [sessionData?.rows?.length, dispatch, hasHydrated])
}