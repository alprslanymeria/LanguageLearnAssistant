// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseAlertComponentCustomEffectProps } from "@/src/components/AlertComponent/prop"

export function UseAlertComponentCustomEffect(params: UseAlertComponentCustomEffectProps) {

    const {duration, dispatch, onClose} = params

    useEffect(() => {

        const kese = [duration]

        if(kese.some(k => !k)) return
    
        const timer = setTimeout(() => {

        dispatch({type: "SET_VISIBLE", payload: {visible: false}})

        onClose?.()

        }, duration)

        return () => clearTimeout(timer)

    }, [duration, dispatch, onClose])
}