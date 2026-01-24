export type AlertType = "info" | "success" | "warning" | "error"

export type ShowAlertProps = {
    type: AlertType, 
    message: string, 
    title?: string, 
    duration?: number
}

export interface AlertContextProps {
  showAlert: (props: ShowAlertProps) => void
}


// FUNCTIONS
export type AlertProviderProps = {
    children: ReactNode
}