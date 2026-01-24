// IMPORTS
import { CacheType } from "@/src/infrastructure/caching/Cache"
import { ICacheStrategy } from "@/src/infrastructure/caching/ICacheStrategy"

export interface ICacheFactory {

    createStrategy(type: CacheType): ICacheStrategy
}