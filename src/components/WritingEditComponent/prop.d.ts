// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { LanguageDto } from "@/src/actions/Language/Response"

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
}

export type Action =
  | { type: "SET_LANGUAGE_ID"; payload: {languageId: number}}
  | { type: "SET_LANGUAGES"; payload: {languages: LanguageDto[]}}
  | { type: "SET_NAME"; payload: {name: string}}
  | { type: "SET_FILE_ONE"; payload: {fileOne: File}}
  | { type: "SET_FILE_TWO"; payload: {fileTwo: File}}
  | { type: "SET_FILE_ERROR"; payload: {fileError: string}}

  
// HANDLERS
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
  
  state: ServiceResult<number> | undefined
  router: AppRouterInstance
  itemId: string | null | undefined
  dispatch: (action: Action) => void
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void
}