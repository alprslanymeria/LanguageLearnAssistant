// EXTRA
type AlertType = "info" | "success" | "warning" | "error"

// COMPONENT PROPS
export type AlertComponentProps = {

  type?: AlertType
  message: string
  title?: string
  duration?: number
  onClose?: () => void
}

// REDUCER
export type State = {

  visible: boolean
}

export type Action =
  | { type: "SET_VISIBLE" , payload: {visible: boolean}}


// USE EFFECTS 
export type UseAlertComponentCustomEffectProps = {

  duration?: number
  onClose?: () => void
  dispatch: (action: {
                        type: "SET_VISIBLE"; payload: { visible: boolean }
                      }) => void
}