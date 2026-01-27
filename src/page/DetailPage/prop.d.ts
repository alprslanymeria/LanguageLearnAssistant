// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
// FLASHCARD
import { FlashcardCategoryWithDeckWords } from "@/src/actions/FlashcardCategory/Response"
import { FlashcardOldSessionDto } from "@/src/actions/FlashcardOldSession/Response"
import { FlashcardSessionRowDto } from "@/src/actions/FlashcardSessionRow/Response"
// LISTENING
import { ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"
import { ListeningOldSessionDto } from "@/src/actions/ListeningOldSession/Response"
import { ListeningSessionRowDto } from "@/src/actions/ListeningSessionRow/Response"
// READING
import { ReadingBookDto } from "@/src/actions/ReadingBook/Response"
import { ReadingOldSessionDto } from "@/src/actions/ReadingOldSession/Response"
import { ReadingSessionRowDto } from "@/src/actions/ReadingSessionRow/Response"
// WRITING
import { WritingBookDto } from "@/src/actions/WritingBook/Response"
import { WritingOldSessionDto } from "@/src/actions/WritingOldSession/Response"
import { WritingSessionRowDto } from "@/src/actions/WritingSessionRow/Response"


// REDUCER
export type State = {
  
  reading: { item: ReadingBookDto , contents: ReadingSessionRowDto[] | undefined} | null
  writing: { item: WritingBookDto , contents: WritingSessionRowDto[] | undefined } | null
  listening: { item: ListeningCategoryWithDeckVideos , contents: ListeningSessionRowDto[] | undefined } | null
  flashcard: { item: FlashcardCategoryWithDeckWords , contents: FlashcardSessionRowDto[] | undefined } | null
  total: number
  page: number
  limit: number

}

export type Action =
  | { type: "SET_READING",   payload: { reading:   { item: ReadingBookDto , contents: ReadingSessionRowDto[] }} }
  | { type: "SET_WRITING",   payload: { writing:   { item: WritingBookDto , contents: WritingSessionRowDto[] }} }
  | { type: "SET_LISTENING", payload: { listening: { item: ListeningCategoryWithDeckVideos , contents: ListeningSessionRowDto[] } } }
  | { type: "SET_FLASHCARD", payload: { flashcard: { item: FlashcardCategoryWithDeckWords , contents: FlashcardSessionRowDto[] } } }
  | { type: "SET_TOTAL", payload: {total: number}}
  | { type: "SET_PAGE", payload: {page: number}}
  | { type: "SET_LIMIT", payload: {limit: number}}


// USE EFFECT
export type UseDetailPageCustomEffectProps = {

  userId: string | undefined
  language: string |null
  practice: string | null
  oldSessions: (FlashcardOldSessionDto | ReadingOldSessionDto | WritingOldSessionDto | ListeningOldSessionDto)[] | null
  oldSessionId: string | null
  hasHydrated: boolean
  router: AppRouterInstance
  state: State
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void
  resetExcept: (keysToKeep?: string | string[] | undefined) => void
  dispatch: (action: Action) => void
}