// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { useReadingAddOrEditCustomEffectProps } from "@/src/components/ReadingAddOrEditComponent/prop"
// ACTIONS
import { GetLanguages } from "@/src/actions/language"
import { GetItemById } from "@/src/actions/crud"
// TYPES
import { RBWL } from "@/src/types/actions"


export function useReadingAddOrEditCustomEffect(params : useReadingAddOrEditCustomEffectProps) {

    const {state, itemId, router, setLoading, showAlert, dispatch} = params

    // ALERT GÖSTERME
    useEffect(() => {

        const kese = [state]

        if(kese.some(k => !k)) return

        if (state!.success) {

            if (state!.message) showAlert({ type: "success", title: "success", message: state!.message })

            router.push(`/list/?table=rbooks`)

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


    // GET READING BOOK ITEM
    useEffect(() => {

        const kese = [itemId]

        if(kese.some(k => !k)) return

        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetItemById({itemId, table:"rbooks"})

                if(response && response.status == 500){

                    showAlert({type: "error" , title: "error" , message: response.message})

                    return
                }

                if(response.data != null)

                dispatch({ type: "SET_LANGUAGE_ID", payload: { languageId: (response.data.data as RBWL).reading.languageId }})
                dispatch({ type: "SET_INPUT_ONE", payload: {inputOne: (response.data?.data as RBWL).name}})

                
            } catch (error) {

                showAlert({type: "error" , title: "error" , message: "Unexpected error during Get Reading Book Item!"})
                
            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [itemId, dispatch])

}