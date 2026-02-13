export type WritingRowItemRequest = {

    selectedSentence: string
    answer: string
    answerTranslate: string
    similarity: number
}

export type SaveWritingRowsRequest = {

    writingOldSessionId: string
    rows: WritingRowItemRequest[]
}