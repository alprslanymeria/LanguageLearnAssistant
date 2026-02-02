// TYPES
import { LanguageDto } from "@/src/actions/Language/Response"
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { FormEvent } from "react"

// REDUCER
export type State = {

  languageId: number
  name: string
  languages: LanguageDto[]
  state: SerializedServiceResult<number> | undefined
}

export type Action =
  | { type: "SET_LANGUAGE_ID"; payload: {languageId: number}}
  | { type: "SET_NAME"; payload: {name: string}}
  | { type: "SET_LANGUAGES"; payload: {languages: LanguageDto[]}}
  | { type: "SET_STATE"; payload: {state: SerializedServiceResult<number> | undefined}}


// HANDLERS
export type HandleSubmitProps = {

  e: FormEvent<HTMLFormElement>
  dispatch: React.Dispatch<Action>
  setLoading: (props: setLoadingProps) => void
}

// USE EFFECT
export type useFlashcardAddCustomEffectProps = {

  state: SerializedServiceResult<number> | undefined
  dispatch: (action: Action) => void
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void

}