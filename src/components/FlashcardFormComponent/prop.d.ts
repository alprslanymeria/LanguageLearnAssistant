// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { Action } from "@/src/components/FlashcardSessionComponent/prop"
import { FlashcardRowItemRequest } from "@/src/actions/FlashcardSessionRow/Request"
import { FlashcardCategoryWithDeckWords } from "@/src/actions/FlashcardCategory/Response"
import { FlashcardSession, SessionData } from "@/src/infrastructure/store/globalStoreType"

// COMPONENT PROPS
export type FlashcardFormComponentProps = {

    dispatch: (action: Action) => void
}

// USE EFFECT
export type UseFlashcardFormCustomEffectProps = {

    item: FlashcardCategoryWithDeckWords
    hasHydrated: boolean
    updateFlashcardSession: (update: { data?: Partial<FlashcardSession["data"]>, rows?: FlashcardRowItemRequest[] }) => void
}


// HANDLERS
export type HandleClickProps = {
    
    status : boolean
    sessionData: SessionData
    oldSessionId: string | null | undefined
    showAlert: (props: ShowAlertProps) => void
    updateFlashcardSession: (update: { data?: Partial<FlashcardSession["data"]>, rows?: FlashcardRowItemRequest[] }) => void

}

export type HandleNextClickProps = {

    sessionData: SessionData
    showAlert: (props: ShowAlertProps) => void
    updateFlashcardSession: (update: { data?: Partial<FlashcardSession["data"]>, rows?: FlashcardRowItemRequest[] }) => void

}

export type HandleCloseClickProps = {

    userId: string | undefined
    oldSessionId: string | null | undefined
    sessionData: SessionData
    router: AppRouterInstance
    item: FlashcardCategoryWithDeckWords
    showAlert: (props: ShowAlertProps) => void
    setLoading: (props: setLoadingProps) => void
    dispatch: (action: Action) => void
    updateFlashcardSession: (update: { data?: Partial<FlashcardSession["data"]>, rows?: FlashcardRowItemRequest[] }) => void
    
}