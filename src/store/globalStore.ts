import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { GlobalStoreState } from "../types/globalStore"

export const GlobalStore = create<GlobalStoreState>()(
    persist(
      (set) => ({
        OldSessions: [],
        Data: [],
        Selected: 0,
        SessionData: {},

        setOldSessions: (newOldSessions) => set((state) => ({
            OldSessions: newOldSessions
        })),

        setData: (newData) => set((state) => ({
            Data: newData
        })),

        setSelected: (newSelected) => set((state) => ({
            Selected: newSelected
        })),

        setSessionData: (newSessionData) => set((state) => ({
            SessionData: newSessionData
        })),

        addOldSession: (session) => set((state) => ({
            OldSessions: [...state.OldSessions, session]
        })),

        addData: (dataItem) => set((state) => ({
            Data: [...state.Data, dataItem]
        })),

        updateSessionData: (key, value) => set((state) => ({
            SessionData: {
            ...state.SessionData,
            [key]: value
            }
        })),

        resetStore: () => set({
            OldSessions: [],
            Data: [],
            Selected: 0,
            SessionData: {}
        })
  
      }),
      {
        name: 'global-store',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )