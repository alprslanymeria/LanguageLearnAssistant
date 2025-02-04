import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { GlobalStoreState } from "../types/globalStore"

export const GlobalStore = create<GlobalStoreState>()(
    persist(
      (set) => ({
        OldSessions: [],
        OldSessionId: "",
        Items: [],
        SelectedItemId: 0,
        SessionData: {
            index: 0,
            sessionWords: [],
            selectedText: "",
            inputText: "",
            translatedText: "",
            showTranslation: false,
            sessionSentences: [],
            row: []
        },

        setOldSessions: (newOldSessions) => set((state) => ({
            OldSessions: newOldSessions
        })),

        setOldSessionId: (newOldSessionId) => set((state) => ({
            OldSessionId: newOldSessionId
        })),

        setItems: (newItems) => set((state) => ({
            Items: newItems
        })),

        setSelectedItemId: (newSelectedItemId) => set((state) => ({
            SelectedItemId: newSelectedItemId
        })),

        setSessionData: (newSessionData) => set((state) => ({
            SessionData: newSessionData
        })),

        addOldSession: (session) => set((state) => ({
            OldSessions: [...state.OldSessions, session]
        })),

        addItem: (dataItem) => set((state) => ({
            Items: [...state.Items, dataItem]
        })),

        updateSessionData: (key, value) => set((state) => ({
            SessionData: {
            ...state.SessionData,
            [key]: value
            }
        })),

        resetStore: () => set({
            OldSessions: [],
            Items: [],
            SelectedItemId: 0,
            SessionData: {}
        })
  
      }),
      {
        name: 'global-store',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )