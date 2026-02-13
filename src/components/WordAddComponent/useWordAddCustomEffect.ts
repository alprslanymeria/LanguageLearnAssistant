// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { UseWordAddCustomEffectProps } from "./prop"
// ACTIONS
import { GetLanguages } from "@/src/actions/Language/Controller"
import { GetAllFCategories } from "@/src/actions/FlashcardCategory/Controller"


export function useWordAddCustomEffect(params : UseWordAddCustomEffectProps) {

    const {userId, router, state, setLoading, showAlert, dispatch} = params

    // ALERT GÖSTERME
    useEffect(() => {

        const kese = [state]

        if(kese.some(k => !k)) return

        if (state!.isSuccess) {

            showAlert({ type: "success", title: "success", message: "Word added successfully!" })

            // RESET FORM
            dispatch({ type: "SET_WORD", payload: { word: "" } })
            dispatch({ type: "SET_ANSWER", payload: { answer: "" } })
            dispatch({ type: "SET_LANGUAGE_ID", payload: { languageId: 0 } })
            dispatch({ type: "SET_CATEGORY_ID", payload: { categoryId: 0 } })

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

    
    // GET FLASHCARD CATEGORIES
    useEffect(() => {

        const kese = [userId]

        if(kese.some(k => !k)) return
    
        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetAllFCategories()

                if(response && response.data?.totalCount === 0) {

                    showAlert({type: "info" , title: "info" , message: "Please create a flashcard category first!"})

                    router.push(`/list?table=fcategories`)
                }

                if(response && response.status != HttpStatusCode.OK ) {
                
                    if(response.shouldDisplayError) showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                    
                    return
                }

                if(response.data != null) 
                    
                dispatch({type: "SET_FLASHCARD_CATEGORIES", payload: {categories: response.data}})

            } catch (error) {
                
                showAlert({type: "error" , title: "error" , message: "Unexpected error!"})

            } finally {

                setLoading({value: false})
            }
        }

        GET()
            
    }, [userId])

}