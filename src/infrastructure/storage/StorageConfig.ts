// IMPORTS
import { StorageOptions } from "@/src/infrastructure/storage/Storage"

export class StorageConfig {

  static load(): StorageOptions {

    return {

        type: process.env.STORAGE_TYPE as 'local' | 'gcloud',
        bucketName: process.env.GCS_BUCKET_NAME,
        basePath: process.env.LOCAL_STORAGE_PATH
    }
  }
}
