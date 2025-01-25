export interface GlobalStoreState {
    OldSessions: any[];
    Data: any[];
    Selected: number;
    SessionData: Record<string, any>;
    setOldSessions: (newOldSessions: any[]) => void;
    setData: (newData: any[]) => void;
    setSelected: (newSelected: number) => void;
    setSessionData: (newSessionData: Record<string, any>) => void;
    addOldSession: (session: any) => void;
    addData: (dataItem: any) => void;
    updateSessionData: (key: string, value: any) => void;
    resetStore: () => void;
  }