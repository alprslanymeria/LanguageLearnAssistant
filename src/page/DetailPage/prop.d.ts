// TYPES
import { ShowAlertProps } from "@/src/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/providers/LoadingProvider/prop"
import { FlashcardCategory, FlashcardOldSession, FlashcardSessionRow, ListeningCategory, ListeningOldSession, 
         ListeningSessionRow, ReadingBook, ReadingOldSession, ReadingSessionRow, WritingBook, WritingOldSession, WritingSessionRow } from "@prisma/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"


// REDUCER
export type State = {
  
  reading: { item: ReadingBook , contents: ReadingSessionRow[] | undefined} | null
  writing: { item: WritingBook , contents: WritingSessionRow[] | undefined } | null
  listening: { item: ListeningCategory , contents: ListeningSessionRow[] | undefined } | null
  flashcard: { item: FlashcardCategory , contents: FlashcardSessionRow[] | undefined } | null
  total: number
  page: number
  limit: number

}

export type Action =
  | { type: "SET_READING",   payload: { reading:   { item: ReadingBook , contents: ReadingSessionRow[] }} }
  | { type: "SET_WRITING",   payload: { writing:   { item: WritingBook , contents: WritingSessionRow[] }} }
  | { type: "SET_LISTENING", payload: { listening: { item: ListeningCategory , contents: ListeningSessionRow[] } } }
  | { type: "SET_FLASHCARD", payload: { flashcard: { item: FlashcardCategory , contents: FlashcardSessionRow[] } } }
  | { type: "SET_TOTAL", payload: {total: number}}
  | { type: "SET_PAGE", payload: {page: number}}
  | { type: "SET_LIMIT", payload: {limit: number}}


// USE EFFECT
export type UseDetailPageCustomEffectProps = {

  userId: string | undefined
  language: string |null
  practice: string | null
  oldSessions: (FlashcardOldSession | ReadingOldSession | WritingOldSession | ListeningOldSession)[] | null
  oldSessionId: string | null
  hasHydrated: boolean
  router: AppRouterInstance
  state: State
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void
  resetExcept: (keysToKeep?: string | string[] | undefined) => void
  dispatch: (action: Action) => void
}