// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseWordAddOrEditCustomEffectProps } from "@/src/components/WordAddOrEditComponent/prop"
import { DWWCL } from "@/src/types/actions"
// ACTIONS
import { GetAllFCategories } from "@/src/actions/list"
import { GetLanguages } from "@/src/actions/language"
import { GetItemById } from "@/src/actions/crud"


export function useWordAddOrEditCustomEffect(params : UseWordAddOrEditCustomEffectProps) {

    const {userId, state, itemId, router, setLoading, showAlert, dispatch} = params

    // ALERT GÖSTERME
    useEffect(() => {

        const kese = [state]

        if(kese.some(k => !k)) return

        if (state!.success) {

            if (state!.message) showAlert({ type: "success", title: "success", message: state!.message })

            router.push(`/list/?table=fwords`)

            return
        }

        if (state!.message) showAlert({ type: "error", title: "error", message: state!.message })

    }, [state])


    // GET LANGUAGES
    useEffect(() => {
            
        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetLanguages()

                if(response && response.status == 500){

                    showAlert({type: "error" , title: "error" , message: response.message})

                    return
                }

                if(response.data != null)

                dispatch({ type: "SET_LANGUAGES", payload: { languages: response.data.data }})
                
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

                const response = await GetAllFCategories({userId})

                if(response?.status != 200) {

                    showAlert({type: "error", title: "error", message: response?.message})

                    return
                }

                if(response.data != null) 
                    
                dispatch({type: "SET_FLASHCARD_CATEGORIES", payload: {categories: response.data.data}})

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

                const response = await GetItemById({itemId, table:"fwords"})

                if(response && response.status == 500){

                    showAlert({type: "error" , title: "error" , message: response.message})

                    return
                }

                if(response.data != null)

                dispatch({ type: "SET_LANGUAGE_ID", payload: { languageId: (response.data.data as DWWCL).category.flashcard.languageId }})
                dispatch({ type: "SET_CATEGORY_ID", payload: { categoryId: (response.data?.data as DWWCL).categoryId }})
                dispatch({ type: "SET_INPUT_ONE", payload: {inputOne: (response.data?.data as DWWCL).question}})
                dispatch({ type: "SET_INPUT_TWO", payload: {inputTwo: (response.data?.data as DWWCL).answer}})

                
            } catch (error) {

                showAlert({type: "error" , title: "error" , message: "Unexpected error during Get Deck Word Item!"})
                
            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [itemId, dispatch])
}