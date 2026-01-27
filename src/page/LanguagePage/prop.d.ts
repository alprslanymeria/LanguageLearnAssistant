// TYPES
import { PracticeDto } from "@/src/actions/Practice/Response"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"


// REDUCER
export type State = {
  
  practices: PracticeDto[]
}

export type Action =
  | { type: "SET_PRACTICES", payload: {practices: PracticeDto[]} }

  
// HANDLERS
export type HandlePracticeClickProps = {

  practice: PracticeDto
  language: string | undefined
  router: AppRouterInstance
}


// USE EFFECT
export type UseLanguagePageCustomEffectProps = {

  language: string | undefined
  hasHydrated: boolean
  showAlert: (props: ShowAlertProps) => void
  setLoading: (props: setLoadingProps) => void
  setLanguage: (newLanguage: string) => void
  resetExcept: (keysToKeep?: string | string[] | undefined) => void
  dispatch: (action: { type: "SET_PRACTICES"; payload: { practices: PracticeDto[] } }) => void
}