// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseListeningSessionCustomEffectProps } from "@/src/components/ListeningSessionComponent/prop"
import { ListeningRowItemRequest } from "@/src/actions/ListeningSessionRow/Request"

export function useListeningSessionCustomEffect(params : UseListeningSessionCustomEffectProps) {

    const {deckVideos, state, sessionData, hasHydrated, dispatch, updateListeningSession} = params

    // USE EFFECT ONE
    useEffect(() => {

        if(!hasHydrated) return

        const kese = [deckVideos]

        if(kese.some(k => !k)) return

        const shuffled = [...deckVideos].sort(() => Math.random() - 0.5)

        updateListeningSession({
            data: {
                LShuffledVideos: shuffled,
                LCurrentVideo: shuffled.at(0)?.sourceUrl
            }
        })

    }, [deckVideos, hasHydrated])


    // USE EFFECT TWO
    useEffect(() => {

        if(!hasHydrated) return
    
        const kese = [state, sessionData]

        if(kese.some(k => !k)) return

        const start = (state.page - 1) * state.limit
        const sliced = sessionData.rows.slice(start, start + state.limit) as ListeningRowItemRequest[]

        dispatch({type: "SET_PAGINATED_ROWS", payload: {paginatedRows: sliced}})

    }, [sessionData.rows, state.page, state.limit, hasHydrated])


    // USE EFFECT THREE
    useEffect(() => {

        if(!hasHydrated) return
        
        const kese = [sessionData]

        if(kese.some(k => !k)) return
            
        dispatch({ type: "SET_TOTAL", payload: { total: sessionData.rows.length } })
        
    }, [sessionData?.rows?.length, hasHydrated, dispatch])
}