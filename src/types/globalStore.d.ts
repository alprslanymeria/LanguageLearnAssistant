export interface GlobalStoreState {

    Language: string
    Practice: string
    OldSessions: any[]
    OldSessionId: string
    Items: any[]
    SelectedItemId: number
    SessionData: Record<string, any>
    setLanguage: (newLanguage: any) => void
    setPractice: (newPractice: any) => void
    setOldSessions: (newOldSessions: any[]) => void
    setOldSessionId: (newOldSessionId: string) => void
    setItems: (newItems: any[]) => void
    setSelectedItemId: (newSelectedItemId: number) => void
    setSessionData: (newSessionData: Record<string, any>) => void
    addOldSession: (session: any) => void
    addItem: (dataItem: any) => void
    updateSessionData: (key: string, value: any) => void
    resetStore: () => void

  }