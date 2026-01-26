// TYPES
import { FlashcardRowItemRequest } from "@/src/actions/FlashcardSessionRow/Request"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { FlashcardCategoryWithDeckWords, SessionData } from "@/src/types/globalStore"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

// REDUCER
export type State = BaseState<FlashcardRowItemRequest>
export type Action = BaseAction<FlashcardRowItemRequest>


// USE EFFECT
export type UseFlashcardSessionCustomEffectProps = {

    state: State
    sessionData: SessionData
    hasHydrated: boolean
    dispatch: (action: Action) => void
}