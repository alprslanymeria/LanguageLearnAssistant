// TYPES
import { BaseAction, BaseState } from "@/src/page/SessionPage/prop"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { WritingRowItemRequest } from "@/src/actions/WritingSessionRow/Request"
import { SessionData } from "@/src/infrastructure/store/globalStoreType"

// REDUCER
export type State = BaseState<WritingRowItemRequest>
export type Action = BaseAction<WritingRowItemRequest>


// USE EFFECT
export type UseWritingSessionCustomEffectProps = {

    state: State
    sessionData: SessionData
    hasHydrated: boolean
    dispatch: (action: Action) => void
}