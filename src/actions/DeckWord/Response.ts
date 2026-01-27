export type DeckWordDto = {

    id: number,
    categoryId: number,
    question: string,
    answer: string
}

export type DeckWordWithLanguageId = {

    flashcardCategoryId: number,
    question: string,
    answer: string,
    languageId: number
}

export type DeckWordWithTotalCount = {

    deckWordDtos: DeckWordDto[],
    totalCount: number
}