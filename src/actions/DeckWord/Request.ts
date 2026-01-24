// IMPORTS
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"

export type CreateDeckWordRequest = {

    flashcardCategoryId: number,
    question: string,
    answer: string
}

export type UpdateDeckWordRequest = {

    id: number,
    flashcardCategoryId: number,
    question: string,
    answer: string
}