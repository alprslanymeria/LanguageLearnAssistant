// TYPES
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { FlashcardOldSessionDto } from "@/src/actions/FlashcardOldSession/Response"
import { ReadingOldSessionDto } from "@/src/actions/ReadingOldSession/Response"
import { WritingOldSessionDto } from "@/src/actions/WritingOldSession/Response"
import { ListeningOldSessionDto } from "@/src/actions/ListeningOldSession/Response"


// REDUCER
export type State = {
  
  total: number
  page: number
  limit: number

}

export type Action =
  | { type: "SET_TOTAL", payload: {total: number}}
  | { type: "SET_PAGE", payload: {page: number}}
  | { type: "SET_LIMIT", payload: {limit: number}}


// USE EFFECT
export type UsePracticePageCustomEffect = {

    userId: string | undefined
    language: string | null
    practice: string | undefined
    hasHydrated: boolean
    state: State
    router: AppRouterInstance
    setPractice: (newPractice: string) => void
    setOldSessions: (newOldSessions: (FlashcardOldSessionDto | ReadingOldSessionDto | WritingOldSessionDto | ListeningOldSessionDto)[]) => void
    setLoading: (props: setLoadingProps) => void
    showAlert: (props: ShowAlertProps) => void
    resetExcept: (keysToKeep?: string | string[] | undefined) => void
    dispatch: (action: Action) => void
}

// HANDLERS
export type HandleCreateClickProps = {

    router: AppRouterInstance
}