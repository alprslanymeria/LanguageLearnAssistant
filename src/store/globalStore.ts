import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { GlobalStoreState } from "../types/globalStore"

export const GlobalStore = create<GlobalStoreState>()(
    persist(
      (set) => ({
        Language: "",
        Practice: "",
        OldSessions: [],
        OldSessionId: "",
        Items: [],
        SelectedItemId: 0,
        SessionData: {
            // Flashcard
            wordIndex: 0,
            // Reading || Writing
            selectedText: "",
            inputText: "",
            translatedText: "",
            showTranslation: false,
            // Listening
            lastPlayTime: 0,
            lastPauseTime: 0,
            subtitleJson: null,
            textHeardByUser: "",
            extractedText: "",
            showAnswer: false,
            sentences: [{sentenceStart: 0, sentenceEnd: 0}],
            sentenceIndex: 0,
            // All
            rows: []
        },

        setLanguage: (newLanguage) => set((state) => ({
            Language: newLanguage
        })),

        setPractice: (newPractice) => set((state) => ({
            Practice: newPractice
        })),

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
            Language: "",
            Practice: "",
            OldSessions: [],
            OldSessionId: "",
            Items: [],
            SelectedItemId: 0,
            SessionData: {}
        })
  
      }),
      {
        name: 'global-store',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )