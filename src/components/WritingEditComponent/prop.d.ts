// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { LanguageDto } from "@/src/actions/Language/Response"
import { FormEvent } from "react"

// COMPONENT PROPS
export type WritingEditComponentProps = {

  itemId: string
}

// REDUCER
export type State = {

  languageId: number
  name: string
  fileOne: File | null
  fileTwo: File | null
  fileError: string | null
  languages: LanguageDto[]
  state: SerializedServiceResult<number> | undefined
}

export type Action =
  | { type: "SET_LANGUAGE_ID"; payload: {languageId: number}}
  | { type: "SET_LANGUAGES"; payload: {languages: LanguageDto[]}}
  | { type: "SET_NAME"; payload: {name: string}}
  | { type: "SET_FILE_ONE"; payload: {fileOne: File}}
  | { type: "SET_FILE_TWO"; payload: {fileTwo: File}}
  | { type: "SET_FILE_ERROR"; payload: {fileError: string}}
  | { type: "SET_STATE"; payload: {state: SerializedServiceResult<number> | undefined}}

  
// HANDLERS
export type HandleSubmitProps = {

    e: FormEvent<HTMLFormElement>
    dispatch: React.Dispatch<Action>
    setLoading: (props: setLoadingProps) => void
}

export type HandleFileChangeOneProps = {

  e: ChangeEvent<HTMLInputElement>
  dispatch: (action: Action) => void
}

export type HandleFileChangeTwoProps = {

  e: ChangeEvent<HTMLInputElement>
  dispatch: (action: Action) => void
}

// USE EFFECT
export type useWritingEditCustomEffectProps = {
  
  state: SerializedServiceResult<number> | undefined
  itemId: string | null | undefined
  dispatch: (action: Action) => void
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void
}