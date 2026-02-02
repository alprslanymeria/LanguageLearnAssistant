// TYPES
import { FormEvent } from "react"
import { ReadonlyURLSearchParams } from "next/navigation"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

// REDUCER
export type State = {

  authError: string | null
}

export type Action =
  | { type: "SET_AUTH_ERROR", payload: {authError: string}}


// HANDLERS
export type HandleSubmitProps = {
  
  e: FormEvent<HTMLFormElement>
  router: AppRouterInstance
  dispatch: React.Dispatch<Action>
  setLoading: (props: setLoadingProps) => void
}

// USE EFFECTS
export type useLoginPageCustomEffectProps = {
  
  hasHydrated: boolean
  resetExcept: (keysToKeep?: string | string[] | undefined) => void
}