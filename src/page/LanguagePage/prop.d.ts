// TYPES
import { ShowAlertProps } from "@/src/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/providers/LoadingProvider/prop"
import { Practice } from "@prisma/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"


// REDUCER
export type State = {
  
  practices: Practice[]
}

export type Action =
  | { type: "SET_PRACTICES", payload: {practices: Practice[]} }

  
// HANDLERS
export type HandlePracticeClickProps = {

  practice: Practice
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
  dispatch: (action: { type: "SET_PRACTICES"; payload: { practices: Practice[] } }) => void
}