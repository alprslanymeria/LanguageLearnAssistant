// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseSignupPageCustomEffectProps } from "@/src/page/SignupPage/prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
// ACTIONS
import { GetLanguages } from "@/src/actions/Language/Controller"


export function useSignupPageCustomEffect(params: UseSignupPageCustomEffectProps) {

    const { hasHydrated, setLoading, showAlert, resetExcept, dispatch} = params

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
                
                dispatch({type: "SET_LANGUAGES", payload: {languages: response.data}})
                
            } catch (error) {

                showAlert({type: "error" , title: "error" , message: "Unexpected error!"})
                
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