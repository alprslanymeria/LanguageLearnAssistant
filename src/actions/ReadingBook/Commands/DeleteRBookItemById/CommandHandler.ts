// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { DeleteRBookItemByIdCommand } from "./Command"
import type { IReadingBookRepository } from "@/src/infrastructure/persistence/contracts/IReadingBookRepository"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import type { IFileStorageHelper } from "@/src/services/IFileStorageHelper"
import { ReadingBookNotFound } from "@/src/exceptions/NotFound"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"
import { file } from "zod"


@injectable()
export class DeleteRBookItemByIdCommandHandler implements ICommandHandler<DeleteRBookItemByIdCommand> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly readingBookRepository : IReadingBookRepository
    private readonly cacheService: ICacheService
    private readonly fileStorageHelper: IFileStorageHelper
    

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingBookRepository) readingBookRepository : IReadingBookRepository,
        @inject(TYPES.CacheService) cacheService: ICacheService,
        @inject(TYPES.FileStorageHelper) fileStorageHelper: IFileStorageHelper
    
    ) {
        
        this.logger = logger;
        this.readingBookRepository = readingBookRepository;
        this.cacheService = cacheService;
        this.fileStorageHelper = fileStorageHelper;
    }
    
    async Handle(request: DeleteRBookItemByIdCommand): Promise<void> {
        
        // LOG MESSAGE
        this.logger.info(`DeleteRBookItemByIdCommandHandler: Deleting reading book item with Id ${request.id}`)

        const readingBook = await this.readingBookRepository.getByIdAsync(request.id)

        // FAST FAIL
        if(!readingBook) {

            this.logger.warn(`DeleteRBookItemByIdCommandHandler: Reading book item with Id ${request.id} not found!`)
            throw new ReadingBookNotFound()
        }

        // STORE FILE PATHS BEFORE DELETION
        const imageUrl = readingBook.imageUrl
        const sourceUrl = readingBook.sourceUrl

        await this.readingBookRepository.deleteAsync(request.id)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.readingBook.prefix)

        this.logger.info(`DeleteRBookItemByIdCommandHandler: Successfully deleted reading book item with Id ${request.id}`)

        // DELETE FILES FROM STORAGE AFTER DATABASE DELETION
        await this.fileStorageHelper.deleteFileFromStorageAsync(imageUrl)
        await this.fileStorageHelper.deleteFileFromStorageAsync(sourceUrl)

        return
    }
}
