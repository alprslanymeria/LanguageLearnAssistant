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
import type { IPracticeRepository } from "@/src/infrastructure/persistence/contracts/IPracticeRepository"
import { NoPracticeFound } from "@/src/exceptions/NotFound"


@injectable()
export class CreateReadingBookCommandHandler implements ICommandHandler<CreateReadingBookCommand, number> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly readingBookRepository : IReadingBookRepository
    private readonly cacheService : ICacheService
    private readonly practiceRepository : IPracticeRepository
    private readonly entityVerificationService : IEntityVerificationService
    private readonly imageProcessingService : IImageProcessingService
    private readonly fileStorageHelper : IFileStorageHelper

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.ReadingBookRepository) readingBookRepository : IReadingBookRepository,
        @inject(TYPES.CacheService) cacheService : ICacheService,
        @inject(TYPES.PracticeRepository) practiceRepository : IPracticeRepository,
        @inject(TYPES.EntityVerificationService) entityVerificationService : IEntityVerificationService,
        @inject(TYPES.ImageProcessingService) imageProcessingService : IImageProcessingService,
        @inject(TYPES.FileStorageHelper) fileStorageHelper : IFileStorageHelper
    
    ) {
        
        this.logger = logger;
        this.readingBookRepository = readingBookRepository;
        this.cacheService = cacheService;
        this.practiceRepository = practiceRepository;
        this.entityVerificationService = entityVerificationService;
        this.imageProcessingService = imageProcessingService;
        this.fileStorageHelper = fileStorageHelper;
    }

    async Handle(request: CreateReadingBookCommand): Promise<number> {

        // FORM DATA'S
        const name = request.formData.get("name")?.toString()!
        const userId = request.formData.get("userId")?.toString()!
        const languageId = Number(request.formData.get("languageId"))
        const imageFile = request.formData.get("imageFile") as File
        const sourceFile = request.formData.get("sourceFile") as File
        
        // LOG MESSAGE
        this.logger.info(`CreateReadingBookCommandHandler: Creating reading book with name  ${name}`)

        const practice = await this.practiceRepository.existsByLanguageIdAsync(languageId)
        
        if (!practice) throw new NoPracticeFound()
    
        const readingResult = await this.entityVerificationService.verifyOrCreateReadingAsync(

            practice.id,
            userId,
            languageId
        )

        // FAST FAIL
        if (!readingResult.isSuccess) throw new ReadingResultNotSuccess()

        // UPLOAD FILES TO STORAGE
        this.logger.info(`CreateReadingBookCommandHandler: Uploading cover image for reading book with name  ${name}`)

        const imageUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

            imageFile,
            userId,
            `rbooks`
        )

        const sourceUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

            sourceFile,
            userId,
            `rbooks`
        )

        // EXTRACT LEFT SIDE COLOR FROM IMAGE
        this.logger.info(`CreateReadingBookCommandHandler: Processing cover image for reading book with name  ${name}`)

        const leftSideColor = await this.imageProcessingService.extractLeftSideColorAsync(imageFile)

        const data : CreateReadingBookData = {

            name : name,
            readingId : readingResult.data!.id,
            imageUrl : imageUrl,
            sourceUrl : sourceUrl,
            leftColor : leftSideColor
        }

        const readingBookId = await this.readingBookRepository.createAsync(data)

        // CACHE INVALIDATION
        await this.cacheService.invalidateByPrefix(CacheKeys.readingBook.prefix)

        this.logger.info(`CreateReadingBookCommandHandler: Successfully created reading book with name  ${name}`)

        return readingBookId
    
    }
}