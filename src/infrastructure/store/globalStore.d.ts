// TYPES
import { DeckVideo, DeckWord, FlashcardOldSession, ListeningOldSession, ReadingBook, ReadingOldSession, WritingBook, WritingOldSession } from "@prisma/client"


export type FlashcardCategoryWithDeckWords = {

  id: number
  name: string
  flashcardId: number
  deckWords: DeckWord[]
}

export type ListeningCategoryWithDeckVideos = {

  id: number
  name: string
  listeningId: number
  deckVideos: DeckVideo[]
}

type FlashcardSession = {

  type: "flashcard"
  data: {
    FShuffledWords: DeckWord[]
    FShowYesAndNoButtons: boolean
    FShowNextAndCloseButton: boolean
    FIsFullDeckSvgShow: boolean
    FWordIndex: number
    FQuestion: string
    FAnswer: string
  }
  rows: FlashcardSessionRowInput[]
}

type ReadingSession = {

  type: "reading"
  data: {
    RShowTranslation: boolean
    RSelectedText: string
    RInputText: string
    RTranslatedText: string
  }
  rows: ReadingSessionRowInput[]
}

type WritingSession = {

  type: "writing"
  data: {
    WShowTranslation: boolean
    WSelectedText: string
    WInputText: string
    WTranslatedText: string
  }
  rows: WritingSessionRowInput[]
}

type ListeningSession = {

  type: "listening"
  data: {
    LShuffledVideos: DeckVideo[],
    LShowNextButton: boolean,
    LShowCalculateButton: boolean,
    LShowRightAnswer: boolean,
    LVideoEnded: boolean,
    LCurrentVideo: any,
    LCurrentIndex: number,
    LTextHeardByUser: string,
    LRightAnswer: string
  }
  rows: ListeningSessinRowInput[]
}

type SessionData = 
  | FlashcardSession
  | ReadingSession
  | WritingSession
  | ListeningSession

export interface GlobalStoreState {

  Language: string | null
  Practice: string | null
  OldSessions: (FlashcardOldSession | ReadingOldSession | WritingOldSession | ListeningOldSession)[] | null
  OldSessionId: string | null
  CreateItems: (FlashcardCategoryWithDeckWords | ReadingBook | WritingBook | ListeningCategoryWithDeckVideos)[] | null
  SelectedItemId: number | null
  SelectedItem: FlashcardCategoryWithDeckWords | ReadingBook | WritingBook | ListeningCategoryWithDeckVideos | null
  HasHydrated: boolean
  SessionData: SessionData
  setLanguage: (newLanguage: string) => void
  setPractice: (newPractice: string) => void
  setOldSessions: (newOldSessions: (FlashcardOldSession | ReadingOldSession | WritingOldSession | ListeningOldSession)[]) => void
  setOldSessionId: (newOldSessionId: string) => void
  setCreateItems: (newItems: (FlashcardCategoryWithDeckWords | ReadingBook | WritingBook | ListeningCategoryWithDeckVideos)[]) => void
  setSelectedItemId: (newSelectedItemId: number) => void
  setSelectedItem: (newSelectedItem: FlashcardCategoryWithDeckWords | ReadingBook | WritingBook | ListeningCategoryWithDeckVideos) => void
  setHasHydrated: (state: boolean) => void
  setSessionData: (newSessionData: SessionData) => void
  updateFlashcardSession: (update: { data?: Partial<FlashcardSession["data"]>, rows?: FlashcardSessionRowInput[] }) => void
  updateReadingSession: (update: {data?: Partial<ReadingSession["data"]>, rows?: ReadingSessionRowInput[] }) => void
  updateWritingSession: (update: { data?: Partial<WritingSession["data"]>, rows?: WritingSessionRowInput[]}) => void
  updateListeningSession: (update: {data?: Partial<ListeningSession["data"]>, rows?: ListeningSessinRowInput[]}) => void
  resetExcept: (keysToKeep?: string | string[]) => void
}