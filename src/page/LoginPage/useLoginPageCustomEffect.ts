// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { useLoginPageCustomEffectProps } from "@/src/page/LoginPage/prop"
// UTILS
import { getErrorMessageLogin} from "@/src/utils/helper"


export function useLoginPageCustomEffect(params : useLoginPageCustomEffectProps) {

    const {searchParams, hasHydrated, resetExcept, dispatch} = params

    useEffect(() => {

        // STORE'DAN VERİ GELMEDİĞİ İÇİN HASHYDRATED KULLANILMADI

        const kese = [searchParams]

        if(kese.some(k => !k)) return
    
        const GET = async () => {
            
            const code = searchParams!.get('code')
            
            if(code) dispatch({ type: "SET_AUTH_ERROR", payload: {authError: getErrorMessageLogin(code)} })

        }

        GET()

    }, [searchParams, dispatch])


    useEffect(() => {
        
        if(!hasHydrated) return

        return () => {
            resetExcept()
        }

    }, [hasHydrated])
}