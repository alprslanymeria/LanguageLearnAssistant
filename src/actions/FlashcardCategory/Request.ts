export type CreateFlashcardCategoryRequest = {

    flashcardId: number,
    name: string,
    userId: string,
    languageId: number
}

export type UpdateFlashcardCategoryRequest = {

    id: number,
    flashcardId: number,
    name: string,
    userId: string
    languageId: number
}