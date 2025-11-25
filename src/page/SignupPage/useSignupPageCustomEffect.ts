// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseSignupPageCustomEffectProps } from "@/src/page/SignupPage/prop"
// ACTIONS
import { GetLanguages } from "@/src/actions/language"


export function useSignupPageCustomEffect(params: UseSignupPageCustomEffectProps) {

    const { hasHydrated, setLoading, showAlert, resetExcept, dispatch} = params

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

    }, [])


    useEffect(() => {

        if(!hasHydrated) return

        return () => {
            resetExcept()
        }
        
    }, [hasHydrated])
}