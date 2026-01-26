// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseWordEditCustomEffectProps } from "@/src/components/WordEditComponent/prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { DeckWordWithLanguageId } from "@/src/actions/DeckWord/Response"
// ACTIONS
import { GetLanguages } from "@/src/actions/Language/Controller"
import { GetAllFCategories } from "@/src/actions/FlashcardCategory/Controller"
import { GetDeckWordById } from "@/src/actions/DeckWord/Controller"


export function useWordEditCustomEffect(params : UseWordEditCustomEffectProps) {

    const {userId, state, itemId, router, setLoading, showAlert, dispatch} = params

    // ALERT GÖSTERME
    useEffect(() => {

        const kese = [state]

        if(kese.some(k => !k)) return

        if (state!.isSuccess) {

            if (state!.errorMessage) showAlert({ type: "success", title: "success", message: state!.errorMessage[0] })

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


    // GET DECK WORD ITEM
    useEffect(() => {

        const kese = [itemId]

        if(kese.some(k => !k)) return

        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetDeckWordById(Number(itemId))

                if(response && response.status != HttpStatusCode.OK) {

                    showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})

                    return
                }

                const data : DeckWordWithLanguageId = response.data!

                dispatch({ type: "SET_LANGUAGE_ID", payload: { languageId: data.languageId }})
                dispatch({ type: "SET_CATEGORY_ID", payload: { categoryId: data.flashcardCategoryId }})
                dispatch({ type: "SET_WORD", payload: {word: data.question}})
                dispatch({ type: "SET_ANSWER", payload: {answer: data.answer}})

                
            } catch (error) {

                showAlert({type: "error" , title: "error" , message: "Unexpected error during Get Deck Word Item!"})
                
            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [itemId, dispatch])
}