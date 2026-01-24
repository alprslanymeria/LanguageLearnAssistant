// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { CreateWritingBookData, IWritingBookRepository } from "@/src/infrastructure/persistence/contracts/IWritingBookRepository"
import { CreateWritingBookCommand } from "./Command"
import type { IFileStorageHelper } from "@/src/services/IFileStorageHelper"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import type { IEntityVerificationService } from "@/src/services/IEntityVerificationService"
import type { IImageProcessingService } from "@/src/services/IImageProcessingService"
import { WritingResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { CacheKeys } from "@/src/infrastructure/caching/CacheKeys"


@injectable()
export class CreateWritingBookCommandHandler implements ICommandHandler<CreateWritingBookCommand, number> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly writingBookRepository : IWritingBookRepository
    private readonly cacheService : ICacheService
    private readonly entityVerificationService : IEntityVerificationService
    private readonly imageProcessingService : IImageProcessingService
    private readonly fileStorageHelper : IFileStorageHelper

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingBookRepository) writingBookRepository : IWritingBookRepository,
        @inject(TYPES.CacheService) cacheService : ICacheService,
        @inject(TYPES.EntityVerificationService) entityVerificationService : IEntityVerificationService,
        @inject(TYPES.ImageProcessingService) imageProcessingService : IImageProcessingService,
        @inject(TYPES.FileStorageHelper) fileStorageHelper : IFileStorageHelper
    
    ) {
        
        this.logger = logger;
        this.writingBookRepository = writingBookRepository;
        this.cacheService = cacheService;
        this.entityVerificationService = entityVerificationService;
        this.imageProcessingService = imageProcessingService;
        this.fileStorageHelper = fileStorageHelper;
    }

    async Handle(request: CreateWritingBookCommand): Promise<number> {
        
        // LOG MESSAGE
        this.logger.info(`CreateWritingBookCommandHandler: Creating writing book with name  ${request.request.name}`)

        const writingResult = await this.entityVerificationService.verifyOrCreateWritingAsync(

            request.request.writingId,
            request.request.userId,
            request.request.languageId
        )

        // FAST FAIL
        if (!writingResult.isSuccess) throw new WritingResultNotSuccess()

        // UPLOAD FILES TO STORAGE
        this.logger.info(`CreateWritingBookCommandHandler: Uploading files to storage for writing book with name  ${request.request.name}`)

        const imageUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

            request.request.imageFile,
            request.request.userId,
            `wbooks`
        )


        const sourceUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

            request.request.sourceFile,
            request.request.userId,
            `wbooks`
        )

        // EXTRACT LEFT SIDE COLOR FROM IMAGE
        const leftSideColor = await this.imageProcessingService.extractLeftSideColorAsync(request.request.imageFile)

        const data : CreateWritingBookData = {

            name: request.request.name,
            writingId: writingResult.data!.id,
            imageUrl: imageUrl,
            sourceUrl: sourceUrl,
            leftColor: leftSideColor
        }

        const writingBookId = await this.writingBookRepository.createAsync(data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.writingBook.prefix)

        this.logger.info(`CreateWritingBookCommandHandler: Successfully created writing book with Id ${writingBookId} for user!`)
        
        return writingBookId
    }
}