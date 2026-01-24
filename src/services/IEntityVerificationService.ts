// IMPORTS
import { Flashcard, Reading, Writing } from "@/src/generated/prisma/client"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export interface IEntityVerificationService  {


    verifyOrCreateFlashcardAsync(flashcardId: number, userId: string, languageId: number): Promise<ServiceResult<Flashcard>>

    verifyOrCreateReadingAsync(readingId: number, userId: string, languageId: number): Promise<ServiceResult<Reading>>

    verifyOrCreateWritingAsync(writingId: number, userId: string, languageId: number): Promise<ServiceResult<Writing>>
}