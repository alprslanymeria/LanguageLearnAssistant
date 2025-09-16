// TYPES
import { Language } from "@prisma/client"
import { ShowAlertProps } from "@/src/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/providers/LoadingProvider/prop"

// REDUCER
export type State = {
  
  languages: Language[]
}

export type Action =
  | { type: "SET_LANGUAGES", payload: {languages: Language[]} }


// USE EFFECT
export type UseHomePageCustomEffect = {

  hasHydrated: boolean
  showAlert: (props: ShowAlertProps) => void
  setLoading: (props: setLoadingProps) => void
  resetExcept: (keysToKeep?: string | string[]) => void
  dispatch: (action: { type: "SET_LANGUAGES"; payload: { languages: Language[]}}) => void
}