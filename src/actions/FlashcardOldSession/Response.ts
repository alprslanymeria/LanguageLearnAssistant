export type FlashcardOldSessionDto = {

    flashcardId: number
    flashcardCategoryId: number
    rate: number
    createdAt: Date
}

export type FlashcardOldSessionWithTotalCount = {

    flashcardOldSessionDtos: FlashcardOldSessionDto[]
    totalCount: number
}