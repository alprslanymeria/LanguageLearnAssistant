// IMPORTS
import { FlashcardCategoryWithDeckWords } from "@/src/actions/FlashcardCategory/Response"

export type FlashcardSessionRowDto = {

    id: number
    flashcardOldSessionId: string
    question: string
    answer: string
    status: boolean
}


export type FlashcardRowsResponse = {

    item: FlashcardCategoryWithDeckWords
    contents: FlashcardSessionRowDto[]
    total: number
}