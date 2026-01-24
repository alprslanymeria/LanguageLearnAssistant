// ENUM
export type LoadingSource = 
  "page" | "EmailHandleLogout" | "MenuHandleLogout" | "HandleStartClick" | "HandleCloseClick" | "ListeningCalculateRate" | "ListeningCloseAndSave" |
  "HandleDelete" | "ReadingHandleTranslate" | "ReadingCalculateRate" | "ReadingCloseAndSave" | "WritingHandleTranslate" | "WritingCalculateRate" | "WritingCloseAndSave" |
  "ChooseHandler" | "LoginHandleSubmit" | "SignupHandleSubmit" | "HandleSave"


export type setLoadingProps = {
    value: boolean
    source?: LoadingSource
}

export interface LoadingContextProps {

  isLoading: boolean
  loadingSource: LoadingSource | null
  setLoading: (props: setLoadingProps) => void
}

// FUNCTIONS
export type LoadingProviderProps = {
    children: ReactNode
}

