// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { useLoginPageCustomEffectProps } from "@/src/page/LoginPage/prop"


export function useLoginPageCustomEffect(params : useLoginPageCustomEffectProps) {

    const { hasHydrated, resetExcept} = params

    useEffect(() => {
        
        if(!hasHydrated) return

        return () => {
            resetExcept()
        }

    }, [hasHydrated])
}