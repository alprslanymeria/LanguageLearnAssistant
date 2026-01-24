// IMPORTS
import { Container } from "inversify"
import { Redis } from "ioredis"
import { IContainerModule } from "@/src/di/IContainerModule"
import { TYPES } from "@/src/di/type"
import { CacheConfig } from "@/src/infrastructure/caching/CacheConfig"
import { CacheOptions } from "@/src/infrastructure/caching/Cache"
import { CacheService } from "@/src/infrastructure/caching/CacheService"
import { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import { ICacheStrategy } from "@/src/infrastructure/caching/ICacheStrategy"
import { MemoryCacheStrategy } from "@/src/infrastructure/caching/MemoryCacheStrategy"
import { RedisCacheStrategy } from "@/src/infrastructure/caching/RedisCacheStrategy"
import { CacheBehavior } from "@/src/infrastructure/caching/CacheBehavior"
import { ICacheFactory } from "@/src/infrastructure/caching/ICacheFactory"
import { CacheFactory } from "@/src/infrastructure/caching/CacheFactory"

export class CachingModule implements IContainerModule {

    register(container: Container): void {

        container.bind<CacheOptions>(TYPES.CacheConfig).toConstantValue(CacheConfig.load())
        container.bind<ICacheStrategy>(TYPES.CacheStrategy).to(MemoryCacheStrategy)
        container.bind<ICacheStrategy>(TYPES.CacheStrategy).to(RedisCacheStrategy)
        container.bind<ICacheFactory>(TYPES.CacheFactory).to(CacheFactory)
        container.bind<ICacheService>(TYPES.CacheService).to(CacheService)
        container.bind(TYPES.CacheBehavior).to(CacheBehavior).inSingletonScope()
        container.bind<Redis>(TYPES.RedisClient).toDynamicValue(() => {

            return new Redis(process.env.REDIS_URL!)

        }).inSingletonScope()
    }
}