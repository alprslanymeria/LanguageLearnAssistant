// TYPES
import { Language } from "@prisma/client"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { LanguageDto } from "@/src/actions/Language/Response"

// REDUCER
export type State = {
  
  languages: LanguageDto[]
}

export type Action =
  | { type: "SET_LANGUAGES", payload: {languages: LanguageDto[]} }

// USE EFFECT
export type UseHomePageCustomEffect = {

  hasHydrated: boolean
  showAlert: (props: ShowAlertProps) => void
  setLoading: (props: setLoadingProps) => void
  resetExcept: (keysToKeep?: string | string[]) => void
  dispatch: (action: { type: "SET_LANGUAGES"; payload: { languages: LanguageDto[]}}) => void
  
}