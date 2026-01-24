export type FlashcardCategoryDto = {

    flashcardId: number,
    name: string
}

export type FlashcardCategoryWithLanguageId = {

    flashcardId: number,
    name: string,
    languageId: number
}

export type FlashcardCategoryWithTotalCount = {

    flashcardCategoryDtos: FlashcardCategoryDto[],
    totalCount: number
}