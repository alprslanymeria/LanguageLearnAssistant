// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"

// REDUCER
export type State = {

  isOpen: boolean
}

export type Action =
  | { type: "TOGGLE_MENU" }


// HANDLERS
export type HandleIconClickProps = {

  dispatch: (action: { type: "TOGGLE_MENU" }) => void
}

export type HandleLogoutProps = {

  userId: string | undefined
  pathName: string | null
  showAlert: (props: ShowAlertProps) => void
  setLoading: (props: setLoadingProps) => void
  resetExcept: (fieldsToKeep?: any) => void
  dispatch: (action: { type: "TOGGLE_MENU" }) => void
}