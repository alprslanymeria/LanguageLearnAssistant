export type ReadingRowItemRequest = {

    selectedSentence: string
    answer: string
    answerTranslate: string
    similarity: number
}

export type SaveReadingRowsRequest = {

    readingOldSessionId: string
    rows: ReadingRowItemRequest[]
}