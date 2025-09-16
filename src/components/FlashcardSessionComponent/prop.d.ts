// TYPES
import { ShowAlertProps } from "@/src/providers/AlertProvider/prop"
import { FlashcardSessionRowInput, ListeningSessinRowInput, ReadingSessionRowInput, WritingSessionRowInput } from "@/src/types/actions"
import { FlashcardCategoryWithDeckWords, SessionData } from "@/src/types/globalStore"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

// REDUCER
export type State = BaseState<FlashcardSessionRowInput>
export type Action = BaseAction<FlashcardSessionRowInput>


// USE EFFECT
export type UseFlashcardSessionCustomEffectProps = {

    state: State
    sessionData: SessionData
    hasHydrated: boolean
    dispatch: (action: Action) => void
}