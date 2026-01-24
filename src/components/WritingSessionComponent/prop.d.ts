// TYPES
import { BaseAction, BaseState } from "@/src/page/SessionPage/prop"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { WritingSessionRowInput } from "@/src/types/actions"
import { SessionData } from "@/src/types/globalStore"
import { WritingBook } from "@prisma/client"

// REDUCER
export type State = BaseState<WritingSessionRowInput>
export type Action = BaseAction<WritingSessionRowInput>


// USE EFFECT
export type UseWritingSessionCustomEffectProps = {

    state: State
    sessionData: SessionData
    hasHydrated: boolean
    dispatch: (action: Action) => void
}