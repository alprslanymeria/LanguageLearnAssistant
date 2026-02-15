// TYPES
import { BaseAction, BaseState } from "@/src/page/SessionPage/prop"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { ReadingRowItemRequest } from "@/src/actions/ReadingSessionRow/Request"

// REDUCER
export type State = BaseState<ReadingRowItemRequest>
export type Action = BaseAction<ReadingRowItemRequest>


// USE EFFECTS
export type UseReadingSessionCustomEffectProps = {

    state: State
    sessionData: SessionData
    hasHydrated: boolean
    dispatch: (action: Action) => void
}
