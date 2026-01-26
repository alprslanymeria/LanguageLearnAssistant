// TYPES
import { BaseAction, BaseState } from "@/src/page/SessionPage/prop"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { ListeningCategoryWithDeckVideos, ListeningSession, SessionData } from "@/src/types/globalStore"
import { DeckVideo } from "@prisma/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ListeningRowItemRequest } from "@/src/actions/ListeningSessionRow/Request"

// REDUCER
export type State = BaseState<ListeningRowItemRequest>

export type Action = BaseAction<ListeningRowItemRequest>


// USE EFFECT
export type UseListeningSessionCustomEffectProps = {

    state: State
    sessionData: SessionData
    deckVideos: DeckVideo[]
    hasHydrated: boolean
    updateListeningSession: (update: {data?: Partial<ListeningSession["data"]>, rows?: ListeningRowItemRequest[]}) => void
    dispatch: (action: Action) => void
}