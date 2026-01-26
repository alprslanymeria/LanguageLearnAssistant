// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { FlashcardCategoryWithLanguageId } from "@/src/actions/FlashcardCategory/Response"
import { useFlashcardEditCustomEffectProps } from "./prop"
// ACTIONS
import { GetLanguages } from "@/src/actions/Language/Controller"
import { GetFlashcardCategoryById } from "@/src/actions/FlashcardCategory/Controller"



export function useFlashcardEditCustomEffect(params : useFlashcardEditCustomEffectProps) {

    const {itemId, state, router, setLoading, showAlert, dispatch} = params

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


    // GET FLASHCARD CATEGORY ITEM
    useEffect(() => {

        const kese = [itemId]

        if(kese.some(k => !k)) return

        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetFlashcardCategoryById(Number(itemId))

                if(response && response.status != HttpStatusCode.OK) {

                    showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})

                    return
                }

                const data : FlashcardCategoryWithLanguageId = response.data as FlashcardCategoryWithLanguageId

                dispatch({ type: "SET_LANGUAGE_ID", payload: { languageId: data.languageId }})
                dispatch({ type: "SET_NAME", payload: {name: data.name}})

                
            } catch (error) {

                showAlert({type: "error" , title: "error" , message: "Unexpected error during Get Flashcard Category Item!"})
                
            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [itemId, dispatch])

}