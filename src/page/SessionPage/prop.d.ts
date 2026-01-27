// TYPES
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
// FLASHCARD
import { FlashcardCategoryWithDeckWords } from "@/src/actions/FlashcardCategory/Response"
import { FlashcardOldSessionDto } from "@/src/actions/FlashcardOldSession/Response"
// LISTENING
import { ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"
import { ListeningOldSessionDto } from "@/src/actions/ListeningOldSession/Response"
// READING
import { ReadingBookDto } from "@/src/actions/ReadingBook/Response"
import { ReadingOldSessionDto } from "@/src/actions/ReadingOldSession/Response"
// WRITING
import { WritingBookDto } from "@/src/actions/WritingBook/Response"
import { WritingOldSessionDto } from "@/src/actions/WritingOldSession/Response"

// BASE STATE FOR SESSION COMPONENTS
export type BaseState<T> = {

  total: number
  page: number
  limit: number
  paginatedRows: T[]
}

export type BaseAction<T> =
  | { type: "SET_TOTAL"; payload: { total: number } }
  | { type: "SET_PAGE"; payload: { page: number } }
  | { type: "SET_LIMIT"; payload: { limit: number } }
  | { type: "SET_PAGINATED_ROWS"; payload: { paginatedRows: T[] } }


// REDUCER
export type State = {
  
    activeComponent: string
}

export type Action =
  | { type: "SET_ACTIVE_COMPONENT", payload: {activeComponent: string}}


// USE EFFECTS
export type useSessionPageCustomEffectProps = {

  language: string | null
  practice: string | null
  createItems: (FlashcardCategoryWithDeckWords | ReadingBookDto | WritingBookDto | ListeningCategoryWithDeckVideos)[] | null
  selectedItemId: number | null
  oldSessionId: string | null
  oldSessions: (FlashcardOldSessionDto | ReadingOldSessionDto | WritingOldSessionDto | ListeningOldSessionDto)[] | null
  hasHydrated: boolean
  router: AppRouterInstance
  resetExcept: (keysToKeep?: string | string[] | undefined) => void
  setSelectedItem: (newSelectedItem: FlashcardCategoryWithDeckWords | ReadingBookDto | WritingBookDto | ListeningCategoryWithDeckVideos) => void
  dispatch: (action: Action) => void

}