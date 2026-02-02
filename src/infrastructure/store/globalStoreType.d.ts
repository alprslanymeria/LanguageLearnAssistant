// TYPES

// READING
import { ReadingBookDto } from "@/src/actions/ReadingBook/Response"
import { ReadingOldSessionDto } from "@/src/actions/ReadingOldSession/Response"
import { ReadingRowItemRequest } from "@/src/actions/ReadingSessionRow/Request"
// WRITING
import { WritingBookDto } from "@/src/actions/WritingBook/Response"
import { WritingOldSessionDto } from "@/src/actions/WritingOldSession/Response"
import { WritingRowItemRequest } from "@/src/actions/WritingSessionRow/Request"
// FLASHCARD
import { DeckWordDto } from "@/src/actions/DeckWord/Response"
import { FlashcardCategoryWithDeckWords } from "@/src/actions/FlashcardCategory/Response"
import { FlashcardOldSessionDto } from "@/src/actions/FlashcardOldSession/Response"
import { FlashcardRowItemRequest } from "@/src/actions/FlashcardSessionRow/Request"
// LISTENING
import { DeckVideoDto } from "@/src/actions/DeckVideo/Response"
import { ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"
import { ListeningOldSessionDto } from "@/src/actions/ListeningOldSession/Response"
import { ListeningRowItemRequest } from "@/src/actions/ListeningSessionRow/Request"





type FlashcardSession = {

  type: "flashcard"
  data: {
    FShuffledWords: DeckWordDto[]
    FShowYesAndNoButtons: boolean
    FShowNextAndCloseButton: boolean
    FIsFullDeckSvgShow: boolean
    FWordIndex: number
    FQuestion: string
    FAnswer: string
  }
  rows: FlashcardRowItemRequest[]
}

type ReadingSession = {

  type: "reading"
  data: {
    RShowSelectTextButton: boolean
    RShowTranslation: boolean
    RSelectedText: string
    RInputText: string
    RTranslatedText: string
  }
  rows: ReadingRowItemRequest[]
}

type WritingSession = {

  type: "writing"
  data: {
    WShowSelectTextButton: boolean
    WShowTranslation: boolean
    WSelectedText: string
    WInputText: string
    WTranslatedText: string
  }
  rows: WritingRowItemRequest[]
}

type ListeningSession = {

  type: "listening"
  data: {
    LShuffledVideos: DeckVideoDto[],
    LShowNextButton: boolean,
    LShowCalculateButton: boolean,
    LShowRightAnswer: boolean,
    LVideoEnded: boolean,
    LCurrentVideo: any,
    LCurrentIndex: number,
    LTextHeardByUser: string,
    LRightAnswer: string
  }
  rows: ListeningRowItemRequest[]
}

type SessionData = 
  | FlashcardSession
  | ReadingSession
  | WritingSession
  | ListeningSession

export interface GlobalStoreState {

  Language: string | null
  Practice: string | null
  OldSessions: (FlashcardOldSessionDto | ReadingOldSessionDto | WritingOldSessionDto | ListeningOldSessionDto)[] | null
  OldSessionId: string | null
  CreateItems: (FlashcardCategoryWithDeckWords | ReadingBookDto | WritingBookDto | ListeningCategoryWithDeckVideos)[] | null
  SelectedItemId: number | null
  SelectedItem: FlashcardCategoryWithDeckWords | ReadingBookDto | WritingBookDto | ListeningCategoryWithDeckVideos | null
  HasHydrated: boolean
  SessionData: SessionData
  setLanguage: (newLanguage: string) => void
  setPractice: (newPractice: string) => void
  setOldSessions: (newOldSessions: (FlashcardOldSessionDto | ReadingOldSessionDto | WritingOldSessionDto | ListeningOldSessionDto)[]) => void
  setOldSessionId: (newOldSessionId: string) => void
  setCreateItems: (newItems: (FlashcardCategoryWithDeckWords | ReadingBookDto | WritingBookDto | ListeningCategoryWithDeckVideos)[]) => void
  setSelectedItemId: (newSelectedItemId: number) => void
  setSelectedItem: (newSelectedItem: FlashcardCategoryWithDeckWords | ReadingBookDto | WritingBookDto | ListeningCategoryWithDeckVideos) => void
  setHasHydrated: (state: boolean) => void
  setSessionData: (newSessionData: SessionData) => void
  updateFlashcardSession: (update: { data?: Partial<FlashcardSession["data"]>, rows?: FlashcardRowItemRequest[] }) => void
  updateReadingSession: (update: {data?: Partial<ReadingSession["data"]>, rows?: ReadingRowItemRequest[] }) => void
  updateWritingSession: (update: { data?: Partial<WritingSession["data"]>, rows?: WritingRowItemRequest[]}) => void
  updateListeningSession: (update: {data?: Partial<ListeningSession["data"]>, rows?: ListeningRowItemRequest[]}) => void
  resetExcept: (keysToKeep?: string | string[]) => void
}