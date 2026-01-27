// TYPES
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { LanguageDto } from "@/src/actions/Language/Response"


// COMPONENT PROPS
export type FlagComponentProps = {

  languages : LanguageDto[]
}

// REDUCER
export type State = {

  languageName: string
}

export type Action =
  | { type: "SET_LANGUAGE_NAME"; payload: {languageName: string} }


// HANDLERS
export type HandleFlagClickProps = {

  language: LanguageDto
  dispatch: (action: {
                        type: "SET_LANGUAGE_NAME"; payload: { languageName: string }
                    }) => void
}

export type HandleStartClickProps = {

  userId: string | undefined
  languageName: string
  router: AppRouterInstance
  showAlert: (props: ShowAlertProps) => void
  setLoading: (props: setLoadingProps) => void
}