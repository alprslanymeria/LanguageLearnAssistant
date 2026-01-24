// IMPORTS
import { ReadingBook } from "@/src/generated/prisma/client"

export type ReadingSessionRowDto = {

    readingOldSessionId: string
    selectedSentence: string
    answer: string
    answerTranslate: string
    similarity: number
}

export type ReadingRowsResponse = {

    item: ReadingBook
    contents: ReadingSessionRowDto[]
    total: number
}