// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CreateReadingBookCommand } from "./Command"
import type { CreateReadingBookData, IReadingBookRepository } from "@/src/infrastructure/persistence/contracts/IReadingBookRepository"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import type { IEntityVerificationService } from "@/src/services/IEntityVerificationService"
import type { IImageProcessingService } from "@/src/services/IImageProcessingService"
import type { IFileStorageHelper } from "@/src/services/IFileStorageHelper"
import { ReadingResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"


@injectable()
export class CreateReadingBookCommandHandler implements ICommandHandler<CreateReadingBookCommand, number> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly readingBookRepository : IReadingBookRepository
    private readonly cacheService : ICacheService
    private readonly entityVerificationService : IEntityVerificationService
    private readonly imageProcessingService : IImageProcessingService
    private readonly fileStorageHelper : IFileStorageHelper

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingBookRepository) readingBookRepository : IReadingBookRepository,
        @inject(TYPES.CacheService) cacheService : ICacheService,
        @inject(TYPES.EntityVerificationService) entityVerificationService : IEntityVerificationService,
        @inject(TYPES.ImageProcessingService) imageProcessingService : IImageProcessingService,
        @inject(TYPES.FileStorageHelper) fileStorageHelper : IFileStorageHelper
    
    ) {
        
        this.logger = logger;
        this.readingBookRepository = readingBookRepository;
        this.cacheService = cacheService;
        this.entityVerificationService = entityVerificationService;
        this.imageProcessingService = imageProcessingService;
        this.fileStorageHelper = fileStorageHelper;
    }

    async Handle(request: CreateReadingBookCommand): Promise<number> {
        
        // LOG MESSAGE
        this.logger.info(`CreateReadingBookCommandHandler: Creating reading book with name  ${request.request.name}`)
    
        const readingResult = await this.entityVerificationService.verifyOrCreateReadingAsync(

            request.request.readingId,
            request.request.userId,
            request.request.languageId
        )

        // FAST FAIL
        if (!readingResult.isSuccess) throw new ReadingResultNotSuccess()

        // UPLOAD FILES TO STORAGE
        this.logger.info(`CreateReadingBookCommandHandler: Uploading cover image for reading book with name  ${request.request.name}`)

        const imageUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

            request.request.imageFile,
            request.request.userId,
            `rbooks`
        )

        const sourceUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

            request.request.sourceFile,
            request.request.userId,
            `rbooks`
        )

        // EXTRACT LEFT SIDE COLOR FROM IMAGE
        this.logger.info(`CreateReadingBookCommandHandler: Processing cover image for reading book with name  ${request.request.name}`)

        const leftSideColor = await this.imageProcessingService.extractLeftSideColorAsync(request.request.imageFile)

        const data : CreateReadingBookData = {

            name : request.request.name,
            readingId : readingResult.data!.id,
            imageUrl : imageUrl,
            sourceUrl : sourceUrl,
            leftColor : leftSideColor
        }

        const readingBookId = await this.readingBookRepository.createAsync(data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.readingBook.prefix)

        this.logger.info(`CreateReadingBookCommandHandler: Successfully created reading book with name  ${request.request.name}`)

        return readingBookId
    
    }
}