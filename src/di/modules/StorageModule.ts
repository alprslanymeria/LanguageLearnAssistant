import 'server-only'

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

        const storageConfig = StorageConfig.load()

        container.bind(TYPES.LocalStorageBasePath).toConstantValue(process.env.LOCAL_STORAGE_PATH || './uploads')
        container.bind<StorageOptions>(TYPES.StorageConfig).toConstantValue(storageConfig)
        
        
        // REGISTER ALL STRATEGIES, THE FACTORY WILL SELECT THE RIGHT ONE BASED ON CONFIG
        container.bind<IStorageStrategy>(TYPES.StorageStrategy).to(LocalStorageStrategy).inSingletonScope()


        if(storageConfig.type === "gcloud") {

            container.bind(TYPES.BucketName).toConstantValue(process.env.GCS_BUCKET_NAME || 'create-items')
                    
            container.bind<Storage>(TYPES.GoogleCloudClient).toDynamicValue(() => {

                return new Storage({
                    projectId: process.env.GCP_PROJECT_ID,
                    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS
                })

            }).inSingletonScope()

            container.bind<IStorageStrategy>(TYPES.StorageStrategy).to(GoogleCloudStorageStrategy).inSingletonScope()
        }

        container.bind<IStorageFactory>(TYPES.StorageFactory).to(StorageFactory).inSingletonScope()
        container.bind<IStorageService>(TYPES.StorageService).to(StorageService).inSingletonScope()

    }
}