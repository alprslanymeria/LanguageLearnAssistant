// IMPORTS
import { WritingBook } from "@/src/generated/prisma/client"

export type WritingSessionRowDto = {

    writingOldSessionId: string
    selectedSentence: string
    answer: string
    answerTranslate: string
    similarity: number
}

export type WritingRowsResponse = {

    item: WritingBook
    contents: WritingSessionRowDto[]
    total: number
}