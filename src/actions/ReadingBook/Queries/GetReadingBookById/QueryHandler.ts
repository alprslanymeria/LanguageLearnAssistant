// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import type { IReadingBookRepository } from "@/src/infrastructure/persistence/contracts/IReadingBookRepository"
import { ReadingBookWithLanguageId } from "@/src/actions/ReadingBook/Response"
import { GetReadingBookByIdQuery } from "./Query"
import { ReadingBookNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class GetReadingBookByIdQueryHandler implements IQueryHandler<GetReadingBookByIdQuery, ReadingBookWithLanguageId> {

    // FIELDS
    private readonly logger : ILogger
    private readonly readingBookRepository : IReadingBookRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingBookRepository) readingBookRepository : IReadingBookRepository

    ) {

        this.logger = logger
        this.readingBookRepository = readingBookRepository
        
    }
    
    async Handle(request: GetReadingBookByIdQuery): Promise<ReadingBookWithLanguageId> {

        const id = request.id
        
        this.logger.info(`GetReadingBookByIdQueryHandler: Fetching reading book with Id ${id}`)

        const readingBook =  await this.readingBookRepository.getReadingBookItemByIdAsync(id)

        if(!readingBook) {

            this.logger.info(`GetReadingBookByIdQueryHandler: No reading book found with Id ${id}`)
            throw new ReadingBookNotFound()
        }

        this.logger.info(`GetReadingBookByIdQueryHandler: Successfully fetched reading book with Id ${id}`)

        const response: ReadingBookWithLanguageId = {

            id: readingBook.id,
            readingId: readingBook.readingId,
            name: readingBook.name,
            imageUrl: readingBook.imageUrl,
            sourceUrl: readingBook.sourceUrl,
            leftColor: readingBook.leftColor,
            languageId: readingBook.reading.language.id
        }

        return response
    }
    
}