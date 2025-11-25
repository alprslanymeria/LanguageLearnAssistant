// ZUSTAND
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
// TYPES
import { FlashcardSession, GlobalStoreState, ListeningSession, ReadingSession, SessionData, WritingSession } from "@/src/types/globalStore"
import { FlashcardSessionRowInput, ListeningSessinRowInput, ReadingSessionRowInput, WritingSessionRowInput } from "@/src/types/actions"

const defaultFlashcardSession: FlashcardSession = {

  type: "flashcard",
  data: {
    FShuffledWords: [],
    FShowYesAndNoButtons: true,
    FShowNextAndCloseButton: false,
    FIsFullDeckSvgShow: false,
    FWordIndex: 0,
    FQuestion: "",
    FAnswer: "",
  },
  rows: [],
}

const defaultReadingSession: ReadingSession = {
  type: "reading",
  data: {
    RShowTranslation: false,
    RSelectedText: "",
    RInputText: "",
    RTranslatedText: "",
  },
  rows: [],
}

const defaultWritingSession: WritingSession = {
  type: "writing",
  data: {
    WShowTranslation: false,
    WSelectedText: "",
    WInputText: "",
    WTranslatedText: "",
  },
  rows: [],
}

const defaultListeningSession: ListeningSession = {
  type: "listening",
  data: {
    LShuffledVideos: [],
    LShowNextButton: false,
    LShowCalculateButton: true,
    LShowRightAnswer: false,
    LVideoEnded: false,
    LCurrentVideo: null,
    LCurrentIndex: 0,
    LTextHeardByUser: "",
    LRightAnswer: "",
  },
  rows: [],
}

export const GlobalStore = create<GlobalStoreState>()(
    persist(
      (set, get) => ({

        Language: null,
        Practice: null,
        OldSessions: null,
        OldSessionId: null,          
        CreateItems: null,
        SelectedItemId: null,
        SelectedItem: null,
        HasHydrated: false,
        SessionData: defaultFlashcardSession,

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

        setCreateItems: (newItems) => set((state) => ({
            CreateItems: newItems
        })),

        setSelectedItemId: (newSelectedItemId) => set((state) => ({
            SelectedItemId: newSelectedItemId
        })),

        setSelectedItem: (newSelectedItem) => set((state) => ({
            SelectedItem: newSelectedItem
        })),

        setHasHydrated: (newHasHydrated) => set((state) => ({
            HasHydrated: newHasHydrated
        })),

        setSessionData: (newSessionData) => set((state) => ({
            SessionData: newSessionData
        })),

        // FLASHCARD
        updateFlashcardSession: (update: { data?: Partial<FlashcardSession["data"]>, rows?: FlashcardSessionRowInput[] }) =>
        set((state) => {
            if (state.SessionData?.type !== "flashcard") return state
            return {
            SessionData: {
                ...state.SessionData,
                data: { ...state.SessionData.data, ...update.data },
                rows: update.rows ?? state.SessionData.rows,
            },
            }
        }),

        // READING
        updateReadingSession: (update: {data?: Partial<ReadingSession["data"]>, rows?: ReadingSessionRowInput[] }) =>
        set((state) => {
            if (state.SessionData?.type !== "reading") return state
            return {
            SessionData: {
                ...state.SessionData,
                data: { ...state.SessionData.data, ...update.data },
                rows: update.rows ?? state.SessionData.rows,
            },
            }
        }),

        // WRITING
        updateWritingSession: (update: { data?: Partial<WritingSession["data"]>, rows?: WritingSessionRowInput[]}) =>
        set((state) => {
            if (state.SessionData?.type !== "writing") return state
            return {
            SessionData: {
                ...state.SessionData,
                data: { ...state.SessionData.data, ...update.data },
                rows: update.rows ?? state.SessionData.rows,
            },
            }
        }),

        // LISTENING
        updateListeningSession: (update: {data?: Partial<ListeningSession["data"]>, rows?: ListeningSessinRowInput[]}) =>
        set((state) => {
            if (state.SessionData?.type !== "listening") return state
            return {
            SessionData: {
                ...state.SessionData,
                data: { ...state.SessionData.data, ...update.data },
                rows: update.rows ?? state.SessionData.rows,
            },
            }
        }),

        resetExcept: (keysToKeep?: string | string[]) => {
            
            const currentState = get()

            const keys = Array.isArray(keysToKeep)
                ? keysToKeep
                : keysToKeep
                ? [keysToKeep]
                : []

            const resetState = Object.fromEntries(

                Object.entries(currentState).map(([key, value]) => {
                
                    const isFunction = typeof value === "function"
                    const keep = keys.includes(key)

                    if (key === "SessionData") {
                        
                        let defaultSession: SessionData = defaultFlashcardSession

                        switch (currentState.Practice) {
                        case "reading":
                            defaultSession = defaultReadingSession
                            break
                        case "writing":
                            defaultSession = defaultWritingSession
                            break
                        case "listening":
                            defaultSession = defaultListeningSession
                            break
                        }

                        return [key, defaultSession]
                    }
                    
                    return [
                            key,
                            isFunction || keep || key === "HasHydrated" 
                                ? value
                                : null
                            ]
                })
            )

            set(resetState)
        }
        
      }),
      {
        name: 'global-store',
        storage: createJSONStorage(() => sessionStorage),
        onRehydrateStorage: () => (state) => {

            state?.setHasHydrated(true)
        }
      }
    )
  )