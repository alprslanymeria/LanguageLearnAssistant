// TYPES
import { WritingBook } from "@prisma/client"
import { Action } from "@/src/components/WritingSessionComponent/prop"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { SessionData, WritingSession } from "@/src/types/globalStore"
import { WritingSessionRowInput } from "@/src/types/actions"

// COMPONENT PROPS
export type WritingFormComponentProps = {

    dispatch: (action: Action) => void
}

// HANDLERS
export type HandleTextSelectionProps = {
    
    updateWritingSession: (update: { data?: Partial<WritingSession["data"]>, rows?: WritingSessionRowInput[]}) => void
}

export type HandleTranslateProps = {

    userId: string | undefined
    language: string | null
    practice: string | null
    sessionData: SessionData
    showAlert: (props: ShowAlertProps) => void
    updateWritingSession: (update: { data?: Partial<WritingSession["data"]>, rows?: WritingSessionRowInput[]}) => void
    setLoading: (props: setLoadingProps) => void
}

export type CalculateRateProps = {

    oldSessionId: string | null
    sessionData: SessionData
    showAlert: (props: ShowAlertProps) => void
    updateWritingSession: (update: { data?: Partial<WritingSession["data"]>, rows?: WritingSessionRowInput[]}) => void
    setLoading: (props: setLoadingProps) => void
}

export type CloseAndSaveProps = {

    userId: string | undefined
    oldSessionId: string | null
    sessionData: SessionData
    item: WritingBook
    router: AppRouterInstance
    dispatch: (action: Action) => void
    showAlert: (props: ShowAlertProps) => void
    updateWritingSession: (update: { data?: Partial<WritingSession["data"]>, rows?: WritingSessionRowInput[]}) => void
    setLoading: (props: setLoadingProps) => void
}