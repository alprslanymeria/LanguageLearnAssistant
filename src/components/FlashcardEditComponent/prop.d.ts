// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { ApiResponse, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { FlashcardCategory, Language } from "@prisma/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { LanguageDto } from "@/src/actions/Language/Response"

// COMPONENT PROPS
export type FlashcardEditComponentProps = {

  itemId: string
}

// REDUCER
export type State = {

  languageId: number
  name: string
  languages: LanguageDto[]
}

export type Action =
  | { type: "SET_LANGUAGE_ID"; payload: {languageId: number}}
  | { type: "SET_NAME"; payload: {name: string}}
  | { type: "SET_LANGUAGES"; payload: {languages: LanguageDto[]}}

// USE EFFECT
export type useFlashcardEditCustomEffectProps = {

  state: ServiceResult<number> | undefined
  router: AppRouterInstance
  itemId: string
  dispatch: (action: Action) => void
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void

}