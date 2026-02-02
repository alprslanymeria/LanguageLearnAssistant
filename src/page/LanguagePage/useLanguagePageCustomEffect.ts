// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseLanguagePageCustomEffectProps } from "@/src/page/LanguagePage/prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
// ACTIONS
import { GetPracticesByLanguage } from "@/src/actions/Practice/Controller"

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

                const response = await GetPracticesByLanguage(language!)

                if(response && response.status != HttpStatusCode.OK) {
                                                
                    if(response.shouldDisplayError) {
        
                        showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                    }
                    
                    return
                }

                if(response.data != null)

                dispatch({type: "SET_PRACTICES", payload: {practices: response.data}})
                
            } catch (error) {
                
                showAlert({type: "error" , title: "error" , message: "Unexpected error!"})

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