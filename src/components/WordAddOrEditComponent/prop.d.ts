// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { ApiResponse } from "@/src/infrastructure/common/ServiceResult"
import { DeckWord, FlashcardCategory, Language } from "@prisma/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

// COMPONENT PROPS
export type WordAddOrEditComponentProps = {

  type: string
  itemId?: string | null
}

// REDUCER
export type State = {

  languageId: number
  categoryId: number
  categories: FlashcardCategory[]
  inputOne: string
  inputTwo: string
  languages: Language[]
}

export type Action =
  | { type: "SET_LANGUAGE_ID"; payload: {languageId: number}}
  | { type: "SET_LANGUAGES"; payload: {languages: Language[]}}
  | { type: "SET_CATEGORY_ID"; payload: {categoryId: number}}
  | { type: "SET_FLASHCARD_CATEGORIES"; payload: {categories: FlashcardCategory[]}}
  | { type: "SET_INPUT_ONE"; payload: {inputOne: string}}
  | { type: "SET_INPUT_TWO"; payload: {inputTwo: string}}

// USE EFFECTS

export type UseWordAddOrEditCustomEffectProps = {

  userId: string | undefined
  state: ApiResponse<DeckWord> | undefined
  router: AppRouterInstance
  itemId: string | null | undefined
  dispatch: (action: Action) => void
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void
}