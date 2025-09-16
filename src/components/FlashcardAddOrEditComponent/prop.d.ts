// TYPES
import { ShowAlertProps } from "@/src/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/providers/LoadingProvider/prop"
import { RBWL, WBWL, LFWL, FCWL, DWWCL } from "@/src/types/actions"
import { ApiResponse } from "@/src/types/response"
import { FlashcardCategory, Language } from "@prisma/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

// COMPONENT PROPS
export type FlashcardAddOrEditComponentProps = {

  type: string
  itemId?: string | null
}

// REDUCER
export type State = {

  languageId: number
  inputOne: string
  languages: Language[]
}

export type Action =
  | { type: "SET_LANGUAGE_ID"; payload: {languageId: number}}
  | { type: "SET_INPUT_ONE"; payload: {inputOne: string}}
  | { type: "SET_LANGUAGES"; payload: {languages: Language[]}}

// USE EFFECT
export type useFlashcardAddOrEditCustomEffectProps = {

  state: ApiResponse<FlashcardCategory> | undefined
  router: AppRouterInstance
  itemId: string | null | undefined
  dispatch: (action: Action) => void
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void

}