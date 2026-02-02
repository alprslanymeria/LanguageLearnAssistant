// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { useReadingAddCustomEffectProps } from "./prop"
// ACTIONS
import { GetLanguages } from "@/src/actions/Language/Controller"


export function useReadingAddCustomEffect(params : useReadingAddCustomEffectProps) {

    const {state, setLoading, showAlert, dispatch} = params

    // ALERT GÖSTERME
    useEffect(() => {

        const kese = [state]

        if(kese.some(k => !k)) return

        if (state!.isSuccess) {

            showAlert({ type: "success", title: "success", message: "Reading book added successfully!" })

            dispatch({ type: "SET_FILE_ONE", payload: { fileOne: null } })
            dispatch({ type: "SET_FILE_TWO", payload: { fileTwo: null } })
            dispatch({ type: "SET_NAME", payload: { name: "" } })
            dispatch({ type: "SET_LANGUAGE_ID", payload: { languageId: 0 } })

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
                            
                    if(response.shouldDisplayError) {
        
                        showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                    }
                    
                    return
                }

                if(response.data != null)

                dispatch({ type: "SET_LANGUAGES", payload: { languages: response.data }})
                
            } catch (error) {

                showAlert({type: "error" , title: "error" , message: "Unexpected error!"})
                
            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [dispatch])

}