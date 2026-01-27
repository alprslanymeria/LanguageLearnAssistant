// TYPES
import { BaseAction, BaseState } from "@/src/page/SessionPage/prop"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ListeningRowItemRequest } from "@/src/actions/ListeningSessionRow/Request"
import { ListeningSession, SessionData } from "@/src/infrastructure/store/globalStoreType"
import { DeckVideoDto } from "@/src/actions/DeckVideo/Response"

// REDUCER
export type State = BaseState<ListeningRowItemRequest>

export type Action = BaseAction<ListeningRowItemRequest>


// USE EFFECT
export type UseListeningSessionCustomEffectProps = {

    state: State
    sessionData: SessionData
    deckVideos: DeckVideoDto[]
    hasHydrated: boolean
    updateListeningSession: (update: {data?: Partial<ListeningSession["data"]>, rows?: ListeningRowItemRequest[]}) => void
    dispatch: (action: Action) => void
}