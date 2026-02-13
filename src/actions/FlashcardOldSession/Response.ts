export type FlashcardOldSessionDto = {

    oldSessionId: string
    flashcardId: number
    flashcardCategoryId: number
    rate: number
    createdAt: Date
}

export type FlashcardOldSessionWithTotalCount = {

    flashcardOldSessionDtos: FlashcardOldSessionDto[]
    totalCount: number
}