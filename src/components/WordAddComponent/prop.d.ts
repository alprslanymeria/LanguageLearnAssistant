// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { FlashcardCategoryWithTotalCount } from "@/src/actions/FlashcardCategory/Response"
import { LanguageDto } from "@/src/actions/Language/Response"

// REDUCER
export type State = {

  languageId: number
  categoryId: number
  categories: FlashcardCategoryWithTotalCount
  word: string
  answer: string
  languages: LanguageDto[]
}

export type Action =
  | { type: "SET_LANGUAGE_ID"; payload: {languageId: number}}
  | { type: "SET_LANGUAGES"; payload: {languages: LanguageDto[]}}
  | { type: "SET_CATEGORY_ID"; payload: {categoryId: number}}
  | { type: "SET_FLASHCARD_CATEGORIES"; payload: {categories: FlashcardCategoryWithTotalCount}}
  | { type: "SET_WORD"; payload: {word: string}}
  | { type: "SET_ANSWER"; payload: {answer: string}}

// USE EFFECTS

export type UseWordAddCustomEffectProps = {

  userId: string | undefined
  state: ServiceResult<number> | undefined
  router: AppRouterInstance
  dispatch: (action: Action) => void
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void
}