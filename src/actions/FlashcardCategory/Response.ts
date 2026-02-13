// IMPORTS
import { DeckWordDto } from "@/src/actions/DeckWord/Response"

export type FlashcardCategoryDto = {

    id: number,
    flashcardId: number,
    name: string
}

export type FlashcardCategoryWithDeckWords = {

    id: number
    name: string
    flashcardId: number
    deckWords: DeckWordDto[]
}

export type FlashcardCategoryWithLanguageId = {

    id: number,
    flashcardId: number,
    name: string,
    languageId: number
}

export type FlashcardCategoryWithTotalCount = {

    flashcardCategoryDtos: FlashcardCategoryDto[],
    totalCount: number
}

export type FlashcardCategoryWithLanguageIds = {

    flashcardCategoryDtos: FlashcardCategoryWithLanguageId[],
    totalCount: number
}