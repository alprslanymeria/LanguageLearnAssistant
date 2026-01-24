// TYPES
import { BaseAction, BaseState } from "@/src/page/SessionPage/prop"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { FlashcardSessionRowInput, ReadingSessionRowInput, WritingSessionRowInput, ListeningSessinRowInput } from "@/src/types/actions"
import { SessionData } from "@/src/types/globalStore"
import { ReadingBook } from "@prisma/client"

// REDUCER
export type State = BaseState<ReadingSessionRowInput>
export type Action = BaseAction<ReadingSessionRowInput>


// USE EFFECTS
export type UseReadingSessionCustomEffectProps = {

    state: State
    sessionData: SessionData
    hasHydrated: boolean
    dispatch: (action: Action) => void
}
