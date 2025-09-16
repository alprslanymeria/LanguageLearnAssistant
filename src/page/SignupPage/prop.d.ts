// TYPES
import { ShowAlertProps } from "@/src/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/providers/LoadingProvider/prop"
import { Language } from "@prisma/client"
import { ReadonlyURLSearchParams } from "next/navigation"
import { FormEvent } from "react"

// REDUCER
export type State = {

  languages: Language[]
  authError: string | null
}

export type Action =
  | { type: "SET_LANGUAGES"; payload: {languages: Language[]} }
  | { type: "SET_AUTH_ERROR"; payload: {authError: string}}


// HANDLERS
export type HandleSubmitProps = {

  e: FormEvent<HTMLFormElement>
  setLoading: (props: setLoadingProps) => void

}

// USE EFFECTS
export type UseSignupPageCustomEffectProps = {

  searchParams: ReadonlyURLSearchParams | null
  hasHydrated: boolean
  setLoading: (props: setLoadingProps) => void
  showAlert: (props: ShowAlertProps) => void
  resetExcept: (keysToKeep?: string | string[] | undefined) => void
  dispatch: (action: Action) => void

}