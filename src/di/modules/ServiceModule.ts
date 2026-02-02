import 'server-only'

// IMPORTS
import { Container } from "inversify"
import { IContainerModule } from "@/src/di/IContainerModule"
import { TYPES } from "@/src/di/type"
import { EntityVerificationService } from "@/src/services/EntityVerificationService"
import { IEntityVerificationService } from "@/src/services/IEntityVerificationService"
import { IImageProcessingService } from "@/src/services/IImageProcessingService"
import { ImageProcessingService } from "@/src/services/ImageProcessingService"
import { FileStorageHelper } from "@/src/services/FileStorageHelper"
import { IFileStorageHelper } from "@/src/services/IFileStorageHelper"
import { InitialDataService } from '@/src/services/InitialDataService'

export class ServiceModule implements IContainerModule {

    register(container: Container): void {
        
        container.bind<IEntityVerificationService>(TYPES.EntityVerificationService).to(EntityVerificationService)
        container.bind<IImageProcessingService>(TYPES.ImageProcessingService).to(ImageProcessingService)
        container.bind<IFileStorageHelper>(TYPES.FileStorageHelper).to(FileStorageHelper)
        container.bind<InitialDataService>(TYPES.InitialDataService).to(InitialDataService)
    }
}