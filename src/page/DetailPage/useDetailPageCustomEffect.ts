// REACT & NEXT
import { useEffect } from "react"
// ACTIONS
import { GetRowsById } from "@/src/actions/rows"
// TYPES
import { UseDetailPageCustomEffectProps } from "@/src/page/DetailPage/prop"



export function useDetailPageCustomEffect(params : UseDetailPageCustomEffectProps) {

    const {userId, language, practice, oldSessions, oldSessionId, hasHydrated, router, state, setLoading, showAlert, resetExcept, dispatch} = params

    // USE EFFECT ONE
    useEffect(() => {

        if(!hasHydrated) return

        const kese = [language, practice, oldSessions]

        if(kese.some(k => k === null)) router.push("/")

    }, [ language, practice, oldSessions , hasHydrated])


    // USE EFFECT TWO
    useEffect(() => {

        if(!hasHydrated) return

        const kese = [userId, language, practice, oldSessionId]

        if(kese.some(k => !k)) return

        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetRowsById({userId, language, practice, oldSessionId, page: state.page, limit: state.limit})

                if(response && response.status == 500) {

                    showAlert({type: "error", title: "error" , message: response?.message ?? null})

                    return
                }

                switch (response.data?.data.type) {
                    case "reading":
                        
                        dispatch({type: "SET_READING" , payload: {reading: {item: response.data.data.reading!.item , contents: response.data.data.reading?.contents!}}})
                        dispatch({type: "SET_TOTAL", payload: {total: response.data.data.reading?.total!}})
                        break;

                    case "writing":
                        
                        dispatch({type: "SET_WRITING" , payload: {writing: {item: response.data.data.writing!.item , contents: response.data.data.writing?.contents!}}})
                        dispatch({type: "SET_TOTAL", payload: {total: response.data.data.writing?.total!}})
                        break;

                    case "flashcard":
                        
                        dispatch({type: "SET_FLASHCARD" , payload: {flashcard: {item: response.data.data.flashcard!.item , contents: response.data.data.flashcard?.contents!}}})
                        dispatch({type: "SET_TOTAL", payload: {total: response.data.data.flashcard?.total!}})
                        break;

                    case "listening":
                        
                        dispatch({type: "SET_LISTENING" , payload: {listening: {item: response.data.data.listening!.item , contents: response.data.data.listening?.contents!}}})
                        dispatch({type: "SET_TOTAL", payload: {total: response.data.data.listening?.total!}})
                        break;
                
                    default:
                        break;
                }
                
            } catch (error) {

                showAlert({type: "error", title: "error" , message: "Unexpected error occured during Get Rows By Id!"})

            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [userId, language, practice, oldSessionId, hasHydrated, state.page, state.limit, dispatch])


    // USE EFFECT THREE
    useEffect(() => {
        
        if(!hasHydrated) return

        return () => {
            resetExcept(["Language", "Practice", "OldSessions"])
        }

    }, [hasHydrated])


}