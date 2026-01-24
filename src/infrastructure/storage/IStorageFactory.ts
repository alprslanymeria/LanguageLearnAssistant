// IMPORTS
import { IStorageStrategy } from "@/src/infrastructure/storage/IStorageStrategy"
import { StorageType } from "@/src/infrastructure/storage/Storage"

export interface IStorageFactory {

    createStrategy(type: StorageType): IStorageStrategy
}