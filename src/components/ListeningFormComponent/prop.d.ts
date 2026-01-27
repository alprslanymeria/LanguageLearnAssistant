// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { Action } from "@/src/components/ListeningSessionComponent/prop"
import { ListeningRowItemRequest } from "@/src/actions/ListeningSessionRow/Request"
import { ListeningSession, SessionData } from "@/src/infrastructure/store/globalStoreType"


// COMPONENT PROPS
export type ListeningFormComponentProps = {

    dispatch: (action: Action) => void
}

// HANDLERS
export type CalculateRateProps = {

    sessionData: SessionData
    oldSessionId: string | null
    setLoading: (props: setLoadingProps) => void
    showAlert: (props: ShowAlertProps) => void
    updateListeningSession: (update: {data?: Partial<ListeningSession["data"]>, rows?: ListeningRowItemRequest[]}) => void
}

export type HandleNextClickProps = {

    sessionData: SessionData
    showAlert: (props: ShowAlertProps) => void
    updateListeningSession: (update: {data?: Partial<ListeningSession["data"]>, rows?: ListeningRowItemRequest[]}) => void
}

export type CloseAndSaveProps = {

    userId: string | undefined
    sessionData: SessionData
    oldSessionId: string | null
    item: ListeningCategoryWithDeckVideos
    router: AppRouterInstance
    updateListeningSession: (update: {data?: Partial<ListeningSession["data"]>, rows?: ListeningRowItemRequest[]}) => void
    setLoading: (props: setLoadingProps) => void
    showAlert: (props: ShowAlertProps) => void
    dispatch: (action: Action) => void
}