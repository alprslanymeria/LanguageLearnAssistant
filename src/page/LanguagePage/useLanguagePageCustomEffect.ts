// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseLanguagePageCustomEffectProps } from "@/src/page/LanguagePage/prop"
// ACTIONS
import GetPractices from "@/src/actions/practice"


export function useLanguagePageCustomEffect(params : UseLanguagePageCustomEffectProps) {

    const {language, hasHydrated, setLanguage, setLoading, dispatch, showAlert, resetExcept} = params

    useEffect(() => {

        if(!hasHydrated) return

        const kese = [language]

        if(kese.some(k => !k)) return
    
       setLanguage(language!)

    }, [language, hasHydrated])


    useEffect(() => {

        const kese = [language]

        if(kese.some(k => !k)) return
            
        // GET PRACTICES
        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetPractices({language})

                if(response && response.status == 500){
                
                    showAlert({type: "error" , title: "error" , message: response.message})

                    return
                }

                if(response.data != null)

                dispatch({type: "SET_PRACTICES", payload: {practices: response.data.data}})
                
            } catch (error) {
                
                showAlert({type: "error" , title: "error" , message: "Unexpected error during Get Practices!"})

            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [language, dispatch])


    // USE EFFECT THREE
    useEffect(() => {

        if(!hasHydrated) return

        return () => {

            resetExcept(["Language"])
        }

    }, [hasHydrated])
}