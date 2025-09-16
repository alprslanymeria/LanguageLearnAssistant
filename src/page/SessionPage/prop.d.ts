// TYPES
import { FlashcardCategoryWithDeckWords, ListeningCategoryWithDeckVideos } from "@/src/types/globalStore"
import { FlashcardOldSession, ListeningOldSession, ReadingOldSession, WritingOldSession, ReadingBook,  WritingBook,  } from "@prisma/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

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
  createItems: (FlashcardCategoryWithDeckWords | ReadingBook | WritingBook | ListeningCategoryWithDeckVideos)[] | null
  selectedItemId: number | null
  oldSessionId: string | null
  oldSessions: (FlashcardOldSession | ReadingOldSession | WritingOldSession | ListeningOldSession)[] | null
  hasHydrated: boolean
  router: AppRouterInstance
  resetExcept: (keysToKeep?: string | string[] | undefined) => void
  setSelectedItem: (newSelectedItem: FlashcardCategoryWithDeckWords | ReadingBook | WritingBook | ListeningCategoryWithDeckVideos) => void
  dispatch: (action: Action) => void

}