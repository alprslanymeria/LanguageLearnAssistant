// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { UseWordAddCustomEffectProps } from "./prop"
// ACTIONS
import { GetLanguages } from "@/src/actions/Language/Controller"
import { GetAllFCategories } from "@/src/actions/FlashcardCategory/Controller"


export function useWordAddCustomEffect(params : UseWordAddCustomEffectProps) {

    const {userId, state, router, setLoading, showAlert, dispatch} = params

    // ALERT GÖSTERME
    useEffect(() => {

        const kese = [state]

        if(kese.some(k => !k)) return

        if (state!.isSuccess) {

            showAlert({ type: "success", title: "success", message: "Word added successfully!" })

            router.push(`/list/?table=fwords`)

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

    
    // GET FLASHCARD CATEGORIES
    useEffect(() => {

        const kese = [userId]

        if(kese.some(k => !k)) return
    
        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetAllFCategories(userId!)

                if(response?.status != HttpStatusCode.OK) {

                    showAlert({type: "error", title: "error", message: response?.errorMessage![0]})

                    return
                }

                if(response.data != null) 
                    
                dispatch({type: "SET_FLASHCARD_CATEGORIES", payload: {categories: response.data}})

            } catch (error) {
                
                showAlert({type: "error" , title: "error" , message: "Unexpected error during Get Flashcard Categories!"})

            } finally {

                setLoading({value: false})
            }
        }

        GET()
            
    }, [userId])

}