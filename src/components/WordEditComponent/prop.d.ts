// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { FlashcardCategoryWithLanguageIds } from "@/src/actions/FlashcardCategory/Response"
import { LanguageDto } from "@/src/actions/Language/Response"
import { FormEvent } from "react"

// COMPONENT PROPS
export type WordEditComponentProps = {

  itemId: string
}

// REDUCER
export type State = {

  languageId: number
  categoryId: number
  categories: FlashcardCategoryWithLanguageIds
  word: string
  answer: string
  languages: LanguageDto[]
  state: SerializedServiceResult<number> | undefined
}

export type Action =
  | { type: "SET_LANGUAGE_ID"; payload: {languageId: number}}
  | { type: "SET_LANGUAGES"; payload: {languages: LanguageDto[]}}
  | { type: "SET_CATEGORY_ID"; payload: {categoryId: number}}
  | { type: "SET_FLASHCARD_CATEGORIES"; payload: {categories: FlashcardCategoryWithLanguageIds}}
  | { type: "SET_WORD"; payload: {word: string}}
  | { type: "SET_ANSWER"; payload: {answer: string}}
  | { type: "SET_STATE"; payload: {state: SerializedServiceResult<number> | undefined}}


// HANDLERS
export type HandleSubmitProps = {

    e: FormEvent<HTMLFormElement>
    dispatch: React.Dispatch<Action>
    setLoading: (props: setLoadingProps) => void
}


// USE EFFECTS
export type UseWordEditCustomEffectProps = {

  userId: string | undefined
  state: SerializedServiceResult<number> | undefined
  itemId: string
  dispatch: (action: Action) => void
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void
}