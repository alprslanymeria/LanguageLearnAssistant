// TYPES
import { ShowAlertProps } from "@/src/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/providers/LoadingProvider/prop"

// REDUCER
export type State = {

  dropdownOpen: boolean
}

export type Action =
  | { type: "TOGGLE_DROPDOWN" }


// HANDLERS
export type HandleLogoutProps = {

  userId: string | undefined
  pathName: string
  resetExcept: (keysToKeep?: string | string[] | undefined) => void
  showAlert: (props: ShowAlertProps) => void
  setLoading: (props: setLoadingProps) => void
  dispatch: (action: {
                          type: "TOGGLE_DROPDOWN"
                      }) => void
}

export type HandleDropdownClickProps = {

  dispatch: (action: {
                          type: "TOGGLE_DROPDOWN"
                      }) => void
}