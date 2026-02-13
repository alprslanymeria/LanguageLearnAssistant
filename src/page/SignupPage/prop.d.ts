// TYPES
import { LanguageDto } from "@/src/actions/Language/Response"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ReadonlyURLSearchParams } from "next/navigation"
import { FormEvent } from "react"

// REDUCER
export type State = {

  languages: LanguageDto[]
  authError: string | null
}

export type Action =
  | { type: "SET_LANGUAGES"; payload: {languages: LanguageDto[]} }
  | { type: "SET_AUTH_ERROR"; payload: {authError: string}}


// HANDLERS
export type HandleSubmitProps = {

  e: FormEvent<HTMLFormElement>
  router: AppRouterInstance
  setLoading: (props: setLoadingProps) => void
  dispatch: (action: Action) => void
  refreshSession: () => Promise<void>
}

// USE EFFECTS
export type UseSignupPageCustomEffectProps = {

  hasHydrated: boolean
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void
  resetExcept: (keysToKeep?: string | string[] | undefined) => void
  dispatch: (action: Action) => void

}