// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { useReadingEditCustomEffectProps } from "@/src/components/ReadingEditComponent/prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { ReadingBookWithLanguageId } from "@/src/actions/ReadingBook/Response"
// ACTIONS
import { GetLanguages } from "@/src/actions/Language/Controller"
import { GetReadingBookById } from "@/src/actions/ReadingBook/Controller"


export function useReadingEditCustomEffect(params : useReadingEditCustomEffectProps) {

    const {state, itemId, setLoading, showAlert, dispatch} = params

    // ALERT GÖSTERME
    useEffect(() => {

        const kese = [state]

        if(kese.some(k => !k)) return

        if (state!.isSuccess) {

            showAlert({ type: "success", title: "success", message: "Reading book updated successfully!" })

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


    // GET READING BOOK ITEM
    useEffect(() => {

        const kese = [itemId]

        if(kese.some(k => !k)) return

        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetReadingBookById(Number(itemId))

                if(response && response.status != HttpStatusCode.OK) {
                            
                    if(response.shouldDisplayError) {
        
                        showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                    }
                    
                    return
                }

                const data : ReadingBookWithLanguageId = response.data as ReadingBookWithLanguageId

                dispatch({ type: "SET_LANGUAGE_ID", payload: { languageId: data.languageId }})
                dispatch({ type: "SET_NAME", payload: {name: data.name}})

                
            } catch (error) {

                showAlert({type: "error" , title: "error" , message: "Unexpected error!"})
                
            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [itemId, dispatch])

}