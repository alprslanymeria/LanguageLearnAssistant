// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IReadingBookRepository } from "@/src/infrastructure/persistence/contracts/IReadingBookRepository"
import { ReadingBookDto } from "@/src/actions/ReadingBook/Response"
import { GetRBookCreateItemsQuery } from "./Query"
import { PracticeRepository } from "@/src/infrastructure/persistence/repositories/PracticeRepository"
import { LanguageRepository } from "@/src/infrastructure/persistence/repositories/LanguageRepository"
import { NoLanguageFound, NoPracticeFound } from "@/src/exceptions/NotFound"


@injectable()
export class GetRBookCreateItemsQueryHandler implements IQueryHandler<GetRBookCreateItemsQuery, ReadingBookDto[]> {

    // FIELDS
    private readonly logger : ILogger
    private readonly readingBookRepository : IReadingBookRepository
    private readonly languageRepository : LanguageRepository
    private readonly practiceRepository : PracticeRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingBookRepository) readingBookRepository : IReadingBookRepository,
        @inject(TYPES.LanguageRepository) languageRepository : LanguageRepository,
        @inject(TYPES.PracticeRepository) practiceRepository : PracticeRepository

    ) {

        this.logger = logger
        this.readingBookRepository = readingBookRepository
        this.languageRepository = languageRepository
        this.practiceRepository = practiceRepository
        
    }
    
    async Handle(request: GetRBookCreateItemsQuery): Promise<ReadingBookDto[]> {
        
        // LOG MESSAGE
        this.logger.info(`GetRBookCreateItemsQueryHandler: Fetching reading books for creating reading sessions`)

        // CHECK IF LANGUAGE EXISTS
        const languageExists = await this.languageRepository.existsByNameAsync(request.language)

        if(!languageExists) {

            this.logger.info(`GetRBookCreateItemsQueryHandler: No language found with name ${request.language}`)

            throw new NoLanguageFound()
        }

        // CHECK IF PRACTICE EXISTS
        const practiceExists = await this.practiceRepository.existsByNameAndLanguageIdAsync(request.practice, languageExists.id)

        if(!practiceExists) {

            this.logger.info(`GetRBookCreateItemsQueryHandler: No practice found with name ${request.practice} for language ${request.language}`)
            
            throw new NoPracticeFound()
        }

        const readingBooks = await this.readingBookRepository.getRBookCreateItemsAsync(request.userId, languageExists.id, practiceExists.id)
    
        const result : ReadingBookDto[] = readingBooks.map(rb => ({

            id: rb.id,
            readingId: rb.readingId,
            name: rb.name,
            imageUrl: rb.imageUrl,
            sourceUrl: rb.sourceUrl,
            leftColor: rb.leftColor
        }))

        return result
    }
}