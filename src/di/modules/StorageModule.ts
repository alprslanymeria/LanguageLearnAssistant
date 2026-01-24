// IMPORTS
import { Container } from "inversify"
import { Storage } from "@google-cloud/storage"
import { IContainerModule } from "@/src/di/IContainerModule"
import { TYPES } from "@/src/di/type"
import { StorageOptions } from "@/src/infrastructure/storage/Storage"
import { StorageConfig } from "@/src/infrastructure/storage/StorageConfig"
import { IStorageStrategy } from "@/src/infrastructure/storage/IStorageStrategy"
import { LocalStorageStrategy } from "@/src/infrastructure/storage/LocalStorageStrategy"
import { IStorageFactory } from "@/src/infrastructure/storage/IStorageFactory"
import { StorageFactory } from "@/src/infrastructure/storage/StorageFactory"
import { GoogleCloudStorageStrategy } from "@/src/infrastructure/storage/GoogleCloudStorageStrategy"
import { IStorageService } from "@/src/infrastructure/storage/IStorageService"
import { StorageService } from "@/src/infrastructure/storage/StorageService"

export class StorageModule implements IContainerModule {

    register(container: Container): void {

        container.bind(TYPES.BucketName).toConstantValue(process.env.GCS_BUCKET_NAME || 'create-items')
        container.bind(TYPES.LocalStorageBasePath).toConstantValue(process.env.LOCAL_STORAGE_PATH || './uploads')
        container.bind<StorageOptions>(TYPES.StorageConfig).toConstantValue(StorageConfig.load())
        container.bind<IStorageStrategy>(TYPES.StorageStrategy).to(LocalStorageStrategy)
        container.bind<IStorageStrategy>(TYPES.StorageStrategy).to(GoogleCloudStorageStrategy)
        container.bind<IStorageFactory>(TYPES.StorageFactory).to(StorageFactory)
        container.bind<IStorageService>(TYPES.StorageService).to(StorageService)
        container.bind<Storage>(TYPES.GoogleCloudClient).toDynamicValue(() => {

            return new Storage({
                projectId: process.env.GCP_PROJECT_ID,
                keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS
            })

        }).inSingletonScope()
    }
}