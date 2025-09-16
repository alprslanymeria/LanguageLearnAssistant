// TYPES
import { ShowAlertProps } from "@/src/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/providers/LoadingProvider/prop"
import { FlashcardCategoryWithDeckWords, FlashcardSession, SessionData } from "@/src/types/globalStore"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { Action } from "@/src/components/FlashcardSessionComponent/prop"
import { FlashcardSessionRowInput } from "@/src/types/actions"

// COMPONENT PROPS
export type FlashcardFormComponentProps = {

    dispatch: (action: Action) => void
}

// USE EFFECT
export type UseFlashcardFormCustomEffectProps = {

    item: FlashcardCategoryWithDeckWords
    hasHydrated: boolean
    updateFlashcardSession: (update: { data?: Partial<FlashcardSession["data"]>, rows?: FlashcardSessionRowInput[] }) => void
}


// HANDLERS
export type HandleClickProps = {
    
    status : boolean
    sessionData: SessionData
    oldSessionId: string | null | undefined
    showAlert: (props: ShowAlertProps) => void
    updateFlashcardSession: (update: { data?: Partial<FlashcardSession["data"]>, rows?: FlashcardSessionRowInput[] }) => void

}

export type HandleNextClickProps = {

    sessionData: SessionData
    showAlert: (props: ShowAlertProps) => void
    updateFlashcardSession: (update: { data?: Partial<FlashcardSession["data"]>, rows?: FlashcardSessionRowInput[] }) => void

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
    updateFlashcardSession: (update: { data?: Partial<FlashcardSession["data"]>, rows?: FlashcardSessionRowInput[] }) => void
    
}