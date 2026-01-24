export type FlashcardRowItemRequest = {

    question: string
    answer: string
    status: boolean
}

export type SaveFlashcardRowsRequest = {

    flashcardOldSessionId: string
    rows: FlashcardRowItemRequest[]
}