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
import { NoLanguageFound } from "@/src/exceptions/NoLanguageFound"
import type { IPracticeRepository } from "@/src/infrastructure/persistence/contracts/IPracticeRepository"
import { NoPracticeFound } from "@/src/exceptions/NoPracticeFound"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

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

    async verifyOrCreateFlashcardAsync(flashcardId: number, userId: string, languageId: number): Promise<ServiceResult<Flashcard>> {
        
        const flashcard = await this.flashcardRepository.getByIdAsync(flashcardId)

        if (flashcard) return ServiceResult.success(flashcard)

        this.logger.info(`EntityVerificationService: Flashcard with ID ${flashcardId} not found. Creating new flashcard for User ${userId} and Language ${languageId}.`)

        const language = await this.languageRepository.getByIdAsync(languageId)

        if (!language) throw new NoLanguageFound()

        const practice = await this.practiceRepository.existsByLanguageIdAsync(languageId)

        if (!practice) throw new NoPracticeFound()

        const newFlashcard : CreateFlashcardData = {

            userId,
            languageId,
            practiceId: practice.id,
        }

        const createdFlashcardId = await this.flashcardRepository.createAsync(newFlashcard)

        this.logger.info(`EntityVerificationService: Successfully created flashcard for User ${userId} and Language ${languageId}.`)

        const createdFlashcard = await this.flashcardRepository.getByIdAsync(createdFlashcardId)

        return ServiceResult.success(createdFlashcard!)
    }

    async verifyOrCreateReadingAsync(readingId: number, userId: string, languageId: number): Promise<ServiceResult<Reading>> {
        
        const reading = await this.readingRepository.getByIdAsync(readingId)

        if (reading) return ServiceResult.success(reading)

        this.logger.info(`EntityVerificationService: Reading with ID ${readingId} not found. Creating new reading for User ${userId} and Language ${languageId}.`)

        const language = await this.languageRepository.getByIdAsync(languageId)

        if (!language) throw new NoLanguageFound()

        const practice = await this.practiceRepository.existsByLanguageIdAsync(languageId)

        if (!practice) throw new NoPracticeFound()
        
        const newReading : CreateReadingData = {

            userId,
            languageId,
            practiceId: practice.id,
        }

        const createdReadingId = await this.readingRepository.createAsync(newReading)

        this.logger.info(`EntityVerificationService: Successfully created reading for User ${userId} and Language ${languageId}.`)

        const createdReading = await this.readingRepository.getByIdAsync(createdReadingId)

        return ServiceResult.success(createdReading!)
        
    }

    async verifyOrCreateWritingAsync(writingId: number, userId: string, languageId: number): Promise<ServiceResult<Writing>> {
        
        const writing = await this.writingRepository.getByIdAsync(writingId)

        if (writing) return ServiceResult.success(writing)

        this.logger.info(`EntityVerificationService: Writing with ID ${writingId} not found. Creating new writing for User ${userId} and Language ${languageId}.`)

        const language = await this.languageRepository.getByIdAsync(languageId)

        if (!language) throw new NoLanguageFound()

        const practice = await this.practiceRepository.existsByLanguageIdAsync(languageId)

        if (!practice) throw new NoPracticeFound()
        
        const newWriting : CreateWritingData = {

            userId,
            languageId,
            practiceId: practice.id,
        }

        const createdWritingId = await this.writingRepository.createAsync(newWriting)

        this.logger.info(`EntityVerificationService: Successfully created writing for User ${userId} and Language ${languageId}.`)

        const createdWriting = await this.writingRepository.getByIdAsync(createdWritingId)

        return ServiceResult.success(createdWriting!)
    }
}