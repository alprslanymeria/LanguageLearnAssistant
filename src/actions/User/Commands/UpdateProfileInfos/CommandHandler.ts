// IMPORTS
import { inject, injectable } from "inversify"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import { UpdateProfileInfosCommand } from "./Command"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IFileStorageHelper } from "@/src/services/IFileStorageHelper"
import { TYPES } from "@/src/di/type"
import type { IUserRepository } from "@/src/infrastructure/persistence/contracts/IUserRepository"
import { UserNotFound } from "@/src/exceptions/NotFound"


@injectable()
export class UpdateProfileInfosHandler implements ICommandHandler<UpdateProfileInfosCommand> {

    // FIELDS
    private readonly logger : ILogger
    private readonly userRepository : IUserRepository
    private readonly fileStorageHelper : IFileStorageHelper

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.UserRepository) userRepository : IUserRepository,
        @inject(TYPES.FileStorageHelper) fileStorageHelper : IFileStorageHelper
        
    ) {
        
        this.logger = logger
        this.userRepository = userRepository
        this.fileStorageHelper = fileStorageHelper
    }

    async Handle(request: UpdateProfileInfosCommand): Promise<void> {
        
        // FORM DATA'S
        const userId = request.formData.get("userId")?.toString()!
        const name = request.formData.get("name")?.toString()!
        const nativeLanguageId = Number(request.formData.get("nativeLanguageId"))
        const imageFile = request.formData.get("profileImage") as File

        // LOG MESSAGE
        this.logger.info(`UpdateProfileInfosHandler: Updating profile infos for User ID ${userId}`)

        const existingUser = await this.userRepository.getByIdAsync(userId)

        if(!existingUser) {

            this.logger.error(`UpdateProfileInfosHandler: User not found with ID ${userId}`)
            throw new UserNotFound()
        }

        // STORE OLD FILE URLS FOR DELETION
        const oldImageUrl = existingUser.image
        var newImageUrl

        // UPDATE IMAGE IF NEW FILE PROVIDED
        if(imageFile && imageFile.size > 0) {

            this.logger.info(`UpdateProfileInfosHandler: Processing new profile image for User ID ${userId}`)

            newImageUrl = await this.fileStorageHelper.uploadFileToStorageAsync(

                imageFile,
                userId,
                `profile`
            )
        }

        const data = {

            name: name,
            nativeLanguageId: nativeLanguageId,
            image: newImageUrl
        }

        await this.userRepository.updateAsync(userId, data)

        // DELETE OLD FILES FROM STORAGE IF URLS CHANGED
        if(imageFile && oldImageUrl?.toLowerCase() != newImageUrl?.toLowerCase()) {

            await this.fileStorageHelper.deleteFileFromStorageAsync(oldImageUrl!)
        }

        this.logger.info(`UpdateProfileInfosHandler: Successfully updated profile infos for User ID ${userId}`)

        return
    }
}