// TYPES
import { Action } from "@/src/components/ReadingSessionComponent/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { ReadingRowItemRequest } from "@/src/actions/ReadingSessionRow/Request"
import { ReadingSession, SessionData } from "@/src/infrastructure/store/globalStoreType"
import { ReadingBookDto } from "@/src/actions/ReadingBook/Response"

// COMPONENT PROPS
export type ReadingFormComponentProps = {

    dispatch: (action: Action) => void
}

// HANDLERS
export type HandleTextSelectionProps = {

    updateReadingSession: (update: {data?: Partial<ReadingSession["data"]>, rows?: ReadingRowItemRequest[] }) => void
}

export type HandleTranslateProps = {

    userId: string | undefined
    language: string | null
    practice: string | null
    sessionData: SessionData
    showAlert: (props: ShowAlertProps) => void
    updateReadingSession: (update: {data?: Partial<ReadingSession["data"]>, rows?: ReadingRowItemRequest[] }) => void
    setLoading: (props: setLoadingProps) => void
}

export type CalculateRateProps = {

    oldSessionId: string | null
    sessionData: SessionData
    showAlert: (props: ShowAlertProps) => void
    updateReadingSession: (update: {data?: Partial<ReadingSession["data"]>, rows?: ReadingRowItemRequest[] }) => void
    setLoading: (props: setLoadingProps) => void
}

export type CloseAndSaveProps = {

    userId: string | undefined
    oldSessionId: string | null
    sessionData: SessionData
    item: ReadingBookDto
    router: AppRouterInstance
    dispatch: (action: Action) => void
    showAlert: (props: ShowAlertProps) => void
    updateReadingSession: (update: {data?: Partial<ReadingSession["data"]>, rows?: ReadingRowItemRequest[] }) => void
    setLoading: (props: setLoadingProps) => void
}