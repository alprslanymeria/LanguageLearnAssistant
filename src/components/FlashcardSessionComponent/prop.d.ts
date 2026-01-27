// TYPES
import { BaseAction, BaseState } from "@/src/page/SessionPage/prop"
import { FlashcardRowItemRequest } from "@/src/actions/FlashcardSessionRow/Request"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { SessionData } from "@/src/infrastructure/store/globalStoreType"

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