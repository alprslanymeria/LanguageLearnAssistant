// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { ApiResponse } from "@/src/infrastructure/common/ServiceResult"
import { Language, ReadingBook } from "@prisma/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { RBWL, WBWL, LFWL, FCWL, DWWCL } from "@/src/types/actions"


// COMPONENT PROPS
export type ReadingAddOrEditComponentProps = {

  type: string
  itemId?: string | null
}

// REDUCER
export type State = {

  languageId: number
  inputOne: string
  fileOne: File | null
  fileTwo: File | null
  fileError: string | null
  languages: Language[]
}

export type Action =
  | { type: "SET_LANGUAGE_ID"; payload: {languageId: number}}
  | { type: "SET_LANGUAGES"; payload: {languages: Language[]}}
  | { type: "SET_INPUT_ONE"; payload: {inputOne: string}}
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
export type useReadingAddOrEditCustomEffectProps = {

  state: ApiResponse<ReadingBook> | undefined
  router: AppRouterInstance
  itemId: string | null | undefined
  dispatch: (action: Action) => void
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void
  
}