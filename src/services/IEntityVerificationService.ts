// IMPORTS
import { Flashcard, Reading, Writing } from "@/src/generated/prisma/client"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export interface IEntityVerificationService  {


    verifyOrCreateFlashcardAsync(practiceId: number, userId: string, languageId: number): Promise<ServiceResult<Flashcard>>

    verifyOrCreateReadingAsync(practiceId: number, userId: string, languageId: number): Promise<ServiceResult<Reading>>

    verifyOrCreateWritingAsync(practiceId: number, userId: string, languageId: number): Promise<ServiceResult<Writing>>
}