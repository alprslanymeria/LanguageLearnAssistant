// IMPORTS
import { ReadingBookDto } from "@/src/actions/ReadingBook/Response"

export type ReadingSessionRowDto = {

    id: number
    readingOldSessionId: string
    selectedSentence: string
    answer: string
    answerTranslate: string
    similarity: number
}

export type ReadingRowsResponse = {

    item: ReadingBookDto
    contents: ReadingSessionRowDto[]
    total: number
}