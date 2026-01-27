// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { useWritingEditCustomEffectProps } from "./prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { WritingBookWithLanguageId } from "@/src/actions/WritingBook/Response"
// ACTIONS
import { GetLanguages } from "@/src/actions/Language/Controller"
import { GetWritingBookById } from "@/src/actions/WritingBook/Controller"



export function useWritingEditCustomEffect(params : useWritingEditCustomEffectProps) {

    const {state, itemId, router, setLoading, showAlert, dispatch} = params

    // ALERT GÖSTERME
    useEffect(() => {

        const kese = [state]

        if(kese.some(k => !k)) return

        if (state!.isSuccess) {

            showAlert({ type: "success", title: "success", message: "Writing book updated successfully!" })

            router.push(`/list/?table=wbooks`)

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

                if(response && response.status != HttpStatusCode.OK){

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


    // GET WRITING BOOK ITEM
    useEffect(() => {

        const kese = [itemId]

        if(kese.some(k => !k)) return

        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetWritingBookById(Number(itemId))

                if(response && response.status != HttpStatusCode.OK) {

                    showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})

                    return
                }

                const data : WritingBookWithLanguageId = response.data as WritingBookWithLanguageId

                dispatch({ type: "SET_LANGUAGE_ID", payload: { languageId: data.languageId }})
                dispatch({ type: "SET_NAME", payload: {name: data.name}})

                
            } catch (error) {

                showAlert({type: "error" , title: "error" , message: "Unexpected error during Get Writing Book Item!"})
                
            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [itemId, dispatch])

}