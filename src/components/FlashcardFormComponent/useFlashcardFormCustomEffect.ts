// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseFlashcardFormCustomEffectProps } from "@/src/components/FlashcardFormComponent/prop"

export function useFlashcardFormCustomEffect(params : UseFlashcardFormCustomEffectProps) {

    const {item, hasHydrated, updateFlashcardSession} = params

    // SHUFFLE THE DECK & START WITH THE FIRST WORD
    useEffect(() => {

        if(!hasHydrated) return

        const kese = [item]

        if(kese.some(k => !k)) return
    
        const shuffled = [...item.deckWords].sort(() => Math.random() - 0.5)

        updateFlashcardSession({
            data: {
                FShuffledWords: shuffled,
                FQuestion: shuffled.at(0)!.question,
                FAnswer: shuffled.at(0)!.answer
            }
        })

    }, [item, hasHydrated])
}