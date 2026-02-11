import 'server-only'

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
import { ICacheFactory } from "@/src/infrastructure/caching/ICacheFactory"
import { CacheFactory } from "@/src/infrastructure/caching/CacheFactory"

export class CachingModule implements IContainerModule {

    register(container: Container): void {

        const cacheConfig = CacheConfig.load()

        container.bind<CacheOptions>(TYPES.CacheConfig).toConstantValue(cacheConfig)

       
        // REGISTER ALL STRATEGIES, THE FACTORY WILL SELECT THE RIGHT ONE BASED ON CONFIG
        container.bind<ICacheStrategy>(TYPES.CacheStrategy).to(MemoryCacheStrategy).inSingletonScope()
        

        if(cacheConfig.type === "redis") {

            container.bind<Redis>(TYPES.RedisClient).toDynamicValue(() => {

                return new Redis(process.env.REDIS_URL!, {

                    // IF NECESSEARY I CAN IMPLEMENT HERE BU I AM PASSING FOR NOW
                    // retryStrategy: (times) => {

                        
                    // }
                })

            }).inSingletonScope()

            container.bind<ICacheStrategy>(TYPES.CacheStrategy).to(RedisCacheStrategy).inSingletonScope()
        }

        container.bind<ICacheFactory>(TYPES.CacheFactory).to(CacheFactory).inSingletonScope()
        container.bind<ICacheService>(TYPES.CacheService).to(CacheService).inSingletonScope()
        
    }
}