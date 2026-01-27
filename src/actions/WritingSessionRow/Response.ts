// IMPORTS
import { WritingBookDto } from "@/src/actions/WritingBook/Response"

export type WritingSessionRowDto = {

    id: number
    writingOldSessionId: string
    selectedSentence: string
    answer: string
    answerTranslate: string
    similarity: number
}

export type WritingRowsResponse = {

    item: WritingBookDto
    contents: WritingSessionRowDto[]
    total: number
}