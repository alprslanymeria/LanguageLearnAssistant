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
import type { IPracticeRepository } from "@/src/infrastructure/persistence/contracts/IPracticeRepository"
import { NoPracticeFound } from "@/src/exceptions/NotFound"


@injectable()
export class CreateWritingBookCommandHandler implements ICommandHandler<CreateWritingBookCommand, number> {
    
    // FIELDS
    private readonly logger : ILogger
    private readonly writingBookRepository : IWritingBookRepository
    private readonly cacheService : ICacheService
    private readonly practiceRepository : IPracticeRepository
    private readonly entityVerificationService : IEntityVerificationService
    private readonly imageProcessingService : IImageProcessingService
    private readonly fileStorageHelper : IFileStorageHelper

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.WritingBookRepository) writingBookRepository : IWritingBookRepository,
        @inject(TYPES.CacheService) cacheService : ICacheService,
        @inject(TYPES.PracticeRepository) practiceRepository : IPracticeRepository,
        @inject(TYPES.EntityVerificationService) entityVerificationService : IEntityVerificationService,
        @inject(TYPES.ImageProcessingService) imageProcessingService : IImageProcessingService,
        @inject(TYPES.FileStorageHelper) fileStorageHelper : IFileStorageHelper
    
    ) {
        
        this.logger = logger;
        this.writingBookRepository = writingBookRepository;
        this.cacheService = cacheService;
        this.practiceRepository = practiceRepository;
        this.entityVerificationService = entityVerificationService;
        this.imageProcessingService = imageProcessingService;
        this.fileStorageHelper = fileStorageHelper;
    }

    async Handle(request: CreateWritingBookCommand): Promise<number> {

        // FORM DATA'S
        const name = request.formData.get("name")?.toString()!
        const userId = request.formData.get("userId")?.toString()!
        const languageId = Number(request.formData.get("languageId"))
        const imageFile = request.formData.get("imageFile") as File
        const sourceFile = request.formData.get("sourceFile") as File
        
        // LOG MESSAGE
        this.logger.info(`CreateWritingBookCommandHandler: Creating writing book with name  ${name}`)

        const practice = await this.practiceRepository.existsByLanguageIdAsync(languageId)
        
        if (!practice) throw new NoPracticeFound()

        const writingResult = await this.entityVerificationService.verifyOrCreateWritingAsync(

            practice.id,
            userId,
            languageId
        )

        // FAST FAIL
        if (!writingResult.isSuccess) throw new WritingResultNotSuccess()

        // UPLOAD FILES TO STORAGE
        this.logger.info(`CreateWritingBookCommandHandler: Uploading files to storage for writing book with name  ${name}`)

        const imageUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

            imageFile,
            userId,
            `wbooks`
        )


        const sourceUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

            sourceFile,
            userId,
            `wbooks`
        )

        // EXTRACT LEFT SIDE COLOR FROM IMAGE
        const leftSideColor = await this.imageProcessingService.extractLeftSideColorAsync(imageFile)

        const data : CreateWritingBookData = {

            name: name,
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