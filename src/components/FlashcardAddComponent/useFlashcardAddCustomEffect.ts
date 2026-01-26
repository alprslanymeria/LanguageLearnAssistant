// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { useFlashcardAddCustomEffectProps } from "./prop"
// ACTIONS
import { GetLanguages } from "@/src/actions/Language/Controller"


export function useFlashcardAddCustomEffect(params : useFlashcardAddCustomEffectProps) {

    const {state, router, setLoading, showAlert, dispatch} = params

    // ALERT GÖSTERME
    useEffect(() => {

        const kese = [state]

        if(kese.some(k => !k)) return

        if (state!.isSuccess) {

            if (state!.errorMessage) showAlert({ type: "success", title: "success", message: state!.errorMessage[0] })

            router.push(`/list/?table=fcategories`)

            return
        }

        if (state!.errorMessage) showAlert({ type: "error", title: "error", message: state!.errorMessage[0] })

    }, [state])

    
    // GET LANGUAGES
    useEffect(() => {
            
        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetLanguages()

                if(response && response.status != HttpStatusCode.OK) {

                    showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})

                    return
                }

                if(response.data != null)

                dispatch({ type: "SET_LANGUAGES", payload: { languages: response.data }})
                
            } catch (error) {

                showAlert({type: "error" , title: "error" , message: "Unexpected error during Get Languages!"})
                
            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [dispatch])
}