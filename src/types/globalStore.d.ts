export interface GlobalStoreState {
    OldSessions: any[];
    OldSessionId: string;
    Items: any[];
    SelectedItemId: number;
    SessionData: Record<string, any>;
    setOldSessions: (newOldSessions: any[]) => void;
    setOldSessionId: (newOldSessionId: string) => void;
    setItems: (newItems: any[]) => void;
    setSelectedItemId: (newSelectedItemId: number) => void;
    setSessionData: (newSessionData: Record<string, any>) => void;
    addOldSession: (session: any) => void;
    addItem: (dataItem: any) => void;
    updateSessionData: (key: string, value: any) => void;
    resetStore: () => void;
  }