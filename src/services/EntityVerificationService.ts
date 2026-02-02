// IMPORTS
import { inject, injectable } from "inversify"
import type { CreateWritingData, IWritingRepository } from "@/src/infrastructure/persistence/contracts/IWritingRepository"
import type { CreateReadingData, IReadingRepository } from "@/src/infrastructure/persistence/contracts/IReadingRepository"
import type { CreateFlashcardData, IFlashcardRepository } from "@/src/infrastructure/persistence/contracts/IFlashcardRepository"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { TYPES } from "@/src/di/type"
import { IEntityVerificationService } from "@/src/services/IEntityVerificationService"
import { Flashcard, Reading, Writing } from "@/src/generated/prisma/client"
import type { ILanguageRepository } from "@/src/infrastructure/persistence/contracts/ILanguageRepository"
import type { IPracticeRepository } from "@/src/infrastructure/persistence/contracts/IPracticeRepository"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { NoLanguageFound, NoPracticeFound } from "@/src/exceptions/NotFound"

@injectable()
export class EntityVerificationService implements IEntityVerificationService {
    
    private readonly logger : ILogger
    private readonly languageRepository: ILanguageRepository
    private readonly practiceRepository: IPracticeRepository
    private readonly flashcardRepository : IFlashcardRepository
    private readonly readingRepository : IReadingRepository
    private readonly writingRepository : IWritingRepository
    
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.LanguageRepository) languageRepository: ILanguageRepository,
        @inject(TYPES.PracticeRepository) practiceRepository: IPracticeRepository,
        @inject(TYPES.FlashcardRepository) flashcardRepository : IFlashcardRepository,
        @inject(TYPES.ReadingRepository) readingRepository : IReadingRepository,
        @inject(TYPES.WritingRepository) writingRepository : IWritingRepository

    ) {

        this.logger = logger
        this.languageRepository = languageRepository
        this.practiceRepository = practiceRepository
        this.flashcardRepository = flashcardRepository
        this.readingRepository = readingRepository
        this.writingRepository = writingRepository
    }

    async verifyOrCreateFlashcardAsync(practiceId: number, userId: string, languageId: number): Promise<ServiceResult<Flashcard>> {
        
        const flashcard = await this.flashcardRepository.getByPracticeIdUserIdLanguageIdAsync(practiceId, userId, languageId)

        if (flashcard) return ServiceResult.success(flashcard)

        this.logger.info(`EntityVerificationService: Flashcard with Practice ID ${practiceId}, User ID ${userId}, and Language ID ${languageId} not found. Creating new flashcard for User ${userId} and Language ${languageId}.`)

        const newFlashcard : CreateFlashcardData = {

            userId,
            languageId,
            practiceId
        }

        const createdFlashcardId = await this.flashcardRepository.createAsync(newFlashcard)

        this.logger.info(`EntityVerificationService: Successfully created flashcard for User ${userId} and Language ${languageId}.`)

        const createdFlashcard = await this.flashcardRepository.getByIdAsync(createdFlashcardId)

        return ServiceResult.success(createdFlashcard!)
    }

    async verifyOrCreateReadingAsync(practiceId: number, userId: string, languageId: number): Promise<ServiceResult<Reading>> {
        
        const reading = await this.readingRepository.getByPracticeIdUserIdLanguageIdAsync(practiceId, userId, languageId)

        if (reading) return ServiceResult.success(reading)

        this.logger.info(`EntityVerificationService: Reading with Practice ID ${practiceId}, User ID ${userId}, and Language ID ${languageId} not found. Creating new reading for User ${userId} and Language ${languageId}.`)
        
        const newReading : CreateReadingData = {

            userId,
            languageId,
            practiceId
        }

        const createdReadingId = await this.readingRepository.createAsync(newReading)

        this.logger.info(`EntityVerificationService: Successfully created reading for User ${userId} and Language ${languageId}.`)

        const createdReading = await this.readingRepository.getByIdAsync(createdReadingId)

        return ServiceResult.success(createdReading!)
        
    }

    async verifyOrCreateWritingAsync(practiceId: number, userId: string, languageId: number): Promise<ServiceResult<Writing>> {
        
        const writing = await this.writingRepository.getByPracticeIdUserIdLanguageIdAsync(practiceId, userId, languageId)

        if (writing) return ServiceResult.success(writing)

        this.logger.info(`EntityVerificationService: Writing with Practice ID ${practiceId}, User ID ${userId}, and Language ID ${languageId} not found. Creating new writing for User ${userId} and Language ${languageId}.`)
        
        const newWriting : CreateWritingData = {

            userId,
            languageId,
            practiceId
        }

        const createdWritingId = await this.writingRepository.createAsync(newWriting)

        this.logger.info(`EntityVerificationService: Successfully created writing for User ${userId} and Language ${languageId}.`)

        const createdWriting = await this.writingRepository.getByIdAsync(createdWritingId)

        return ServiceResult.success(createdWriting!)
    }
}