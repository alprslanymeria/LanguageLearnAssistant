// TYPES
import { BaseAction, BaseState } from "@/src/page/SessionPage/prop"
import { ShowAlertProps } from "@/src/providers/AlertProvider/prop"
import { ListeningSessinRowInput } from "@/src/types/actions"
import { ListeningCategoryWithDeckVideos, ListeningSession, SessionData } from "@/src/types/globalStore"
import { DeckVideo } from "@prisma/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

// REDUCER
export type State = BaseState<ListeningSessinRowInput>

export type Action = BaseAction<ListeningSessinRowInput>


// USE EFFECT
export type UseListeningSessionCustomEffectProps = {

    state: State
    sessionData: SessionData
    deckVideos: DeckVideo[]
    hasHydrated: boolean
    updateListeningSession: (update: {data?: Partial<ListeningSession["data"]>, rows?: ListeningSessinRowInput[]}) => void
    dispatch: (action: Action) => void
}