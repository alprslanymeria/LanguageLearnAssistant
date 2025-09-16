// TYPES
import { FormEvent } from "react"
import { ReadonlyURLSearchParams } from "next/navigation"
import { setLoadingProps } from "@/src/providers/LoadingProvider/prop"

// REDUCER
export type State = {

  authError: string | null
}

export type Action =
  | { type: "SET_AUTH_ERROR", payload: {authError: string}}


// HANDLERS
export type HandleSubmitProps = {
  
  e: FormEvent<HTMLFormElement>
  setLoading: (props: setLoadingProps) => void
}

// USE EFFECTS
export type useLoginPageCustomEffectProps = {
  
  searchParams: ReadonlyURLSearchParams | null
  hasHydrated: boolean
  resetExcept: (keysToKeep?: string | string[] | undefined) => void
  dispatch: (action: {
                          type: "SET_AUTH_ERROR";
                          payload: {
                              authError: string;
                          };
                      }) => void
}