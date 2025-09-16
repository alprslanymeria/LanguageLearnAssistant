// TYPES
import { ShowAlertProps } from "@/src/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/providers/LoadingProvider/prop"
import { FlashcardCategoryWithDeckWords, ListeningCategoryWithDeckVideos } from "@/src/types/globalStore"
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
    
    item: FlashcardCategoryWithDeckWords | ReadingBook | WritingBook | ListeningCategoryWithDeckVideos
    setSelectedItemId: (newSelectedItemId: number) => void
}

// USE EFFECT
export type UseCreatePageCustomEffectProps = {

    userId: string | undefined
    language: string | null
    practice: string | null
    router: AppRouterInstance
    hasHydrated: boolean
    oldSessions: (FlashcardOldSession | ReadingOldSession | WritingOldSession | ListeningOldSession)[] | null
    createItems: (FlashcardCategoryWithDeckWords | ReadingBook | WritingBook | ListeningCategoryWithDeckVideos)[] | null
    setCreateItems: (newItems: (FlashcardCategoryWithDeckWords | ReadingBook | WritingBook | ListeningCategoryWithDeckVideos)[]) => void
    setLoading: (props: setLoadingProps) => void
    showAlert: (props: ShowAlertProps) => void
    resetExcept: (keysToKeep?: string | string[] | undefined) => void
}