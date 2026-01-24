// TYPES
import { Language } from "@prisma/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"

// EXTRA
type LanguageInfo = {

  name: string
  id: number
}

// COMPONENT PROPS
export type FlagComponentProps = {

  languages : Language[]
}

// REDUCER
export type State = {

  languageInfo: LanguageInfo
}

export type Action =
  | { type: "SET_LANGUAGE_INFO"; payload: {languageInfo: LanguageInfo} }


// HANDLERS
export type HandleFlagClickProps = {

  language: Language
  dispatch: (action: {
                        type: "SET_LANGUAGE_INFO"; payload: { languageInfo: LanguageInfo }
                    }) => void
}

export type HandleStartClickProps = {

  userId: string | undefined
  languageInfo: LanguageInfo
  router: AppRouterInstance
  showAlert: (props: ShowAlertProps) => void
  setLoading: (props: setLoadingProps) => void
}