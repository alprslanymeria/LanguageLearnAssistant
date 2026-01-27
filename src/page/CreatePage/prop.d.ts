// TYPES
import { FlashcardOldSessionDto } from "@/src/actions/FlashcardOldSession/Response"
import { ListeningOldSessionDto } from "@/src/actions/ListeningOldSession/Response"
import { ReadingBookDto } from "@/src/actions/ReadingBook/Response"
import { ReadingOldSessionDto } from "@/src/actions/ReadingOldSession/Response"
import { WritingBookDto } from "@/src/actions/WritingBook/Response"
import { WritingOldSessionDto } from "@/src/actions/WritingOldSession/Response"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { FlashcardCategoryWithDeckWords, ListeningCategoryWithDeckVideos } from "@/src/infrastructure/store/globalStoreTypes"
import { FlashcardOldSession, ReadingOldSession, WritingOldSession, ListeningOldSession, ReadingBook, WritingBook } from "@prisma/client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

// HANDLERS
export type HandleChooseProps = {
    
    userId: string | undefined
    selectedItemId: number | null
    router: AppRouterInstance
    setOldSessionId: (newOldSessionId: string) => void
    showAlert: (props: ShowAlertProps) => void
    setLoading: (props: setLoadingProps) => void
}

export type HandleSvgClickProps = {
    
    item: FlashcardCategoryWithDeckWords | ReadingBookDto | WritingBookDto | ListeningCategoryWithDeckVideos
    setSelectedItemId: (newSelectedItemId: number) => void
}

// USE EFFECT
export type UseCreatePageCustomEffectProps = {

    userId: string | undefined
    language: string | null
    practice: string | null
    router: AppRouterInstance
    hasHydrated: boolean
    oldSessions: (FlashcardOldSessionDto | ReadingOldSessionDto | WritingOldSessionDto | ListeningOldSessionDto)[] | null
    createItems: (FlashcardCategoryWithDeckWords | ReadingBookDto | WritingBookDto | ListeningCategoryWithDeckVideos)[] | null
    setCreateItems: (newItems: (FlashcardCategoryWithDeckWords | ReadingBookDto | WritingBookDto | ListeningCategoryWithDeckVideos)[]) => void
    setLoading: (props: setLoadingProps) => void
    showAlert: (props: ShowAlertProps) => void
    resetExcept: (keysToKeep?: string | string[] | undefined) => void
}