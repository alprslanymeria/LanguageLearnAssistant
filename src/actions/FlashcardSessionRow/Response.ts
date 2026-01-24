// IMPORTS
import { FlashcardCategory } from "@/src/generated/prisma/client"

export type FlashcardSessionRowDto = {

    flashcardOldSessionId: string
    question: string
    answer: string
    status: boolean
}

export type FlashcardRowsResponse = {

    item: FlashcardCategory
    contents: FlashcardSessionRowDto[]
    total: number
}