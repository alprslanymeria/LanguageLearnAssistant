// TYPES
import { ReadingBook } from "@prisma/client"
import { Action } from "@/src/components/ReadingSessionComponent/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ShowAlertProps } from "@/src/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/providers/LoadingProvider/prop"
import { ReadingSession, SessionData } from "@/src/types/globalStore"
import { ReadingSessionRowInput } from "@/src/types/actions"

// COMPONENT PROPS
export type ReadingFormComponentProps = {

    dispatch: (action: Action) => void
}

// HANDLERS
export type HandleTextSelectionProps = {

    updateReadingSession: (update: {data?: Partial<ReadingSession["data"]>, rows?: ReadingSessionRowInput[] }) => void
}

export type HandleTranslateProps = {

    userId: string | undefined
    language: string | null
    practice: string | null
    sessionData: SessionData
    showAlert: (props: ShowAlertProps) => void
    updateReadingSession: (update: {data?: Partial<ReadingSession["data"]>, rows?: ReadingSessionRowInput[] }) => void
    setLoading: (props: setLoadingProps) => void
}

export type CalculateRateProps = {

    oldSessionId: string | null
    sessionData: SessionData
    showAlert: (props: ShowAlertProps) => void
    updateReadingSession: (update: {data?: Partial<ReadingSession["data"]>, rows?: ReadingSessionRowInput[] }) => void
    setLoading: (props: setLoadingProps) => void
}

export type CloseAndSaveProps = {

    userId: string | undefined
    oldSessionId: string | null
    sessionData: SessionData
    item: ReadingBook
    router: AppRouterInstance
    dispatch: (action: Action) => void
    showAlert: (props: ShowAlertProps) => void
    updateReadingSession: (update: {data?: Partial<ReadingSession["data"]>, rows?: ReadingSessionRowInput[] }) => void
    setLoading: (props: setLoadingProps) => void
}