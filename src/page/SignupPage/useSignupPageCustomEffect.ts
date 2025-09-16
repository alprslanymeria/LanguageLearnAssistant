// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseSignupPageCustomEffectProps } from "@/src/page/SignupPage/prop"
// ACTIONS
import { GetLanguages } from "@/src/actions/language"
// UTILS
import { getErrorMessageSignup } from "@/src/utils/helper"


export function useSignupPageCustomEffect(params: UseSignupPageCustomEffectProps) {

    const {searchParams, hasHydrated, setLoading, showAlert, resetExcept, dispatch} = params

    useEffect(() => {

        // STORE'DAN VERİ GELMEDİĞİ İÇİN HASHYDRATED KULLANILMADI

        const kese = [searchParams]

        if(kese.some(k => !k)) return
    
        const GET = async () => {
        
            const code = searchParams!.get('code')
            
            if(code) dispatch({type: "SET_AUTH_ERROR", payload: {authError: getErrorMessageSignup(code)}})

        }

        GET()

    }, [searchParams, dispatch])


    useEffect(() => {
        
        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetLanguages()

                if(response && response.status == 500)
                {
                    showAlert({type: "error" , title: "error" , message: response.message})

                    return
                }

                if(response.data != null)
                
                dispatch({type: "SET_LANGUAGES", payload: {languages: response.data.data}})
                
            } catch (error) {

                showAlert({type: "error" , title: "error" , message: "Unexpected error during Get Languages!"})
                
            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [dispatch])


    useEffect(() => {

        if(!hasHydrated) return

        return () => {
            resetExcept()
        }
        
    }, [hasHydrated])
}