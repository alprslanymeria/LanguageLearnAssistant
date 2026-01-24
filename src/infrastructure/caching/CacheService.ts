// IMPORTS
import { inject, injectable } from 'inversify'
import { ICacheService } from '@/src/infrastructure/caching/ICacheService'
import { ICacheStrategy } from '@/src/infrastructure/caching/ICacheStrategy'
import type { ICacheFactory } from '@/src/infrastructure/caching/ICacheFactory'
import { TYPES } from '@/src/di/type'

@injectable()
export class CacheService implements ICacheService {

    // FILEDS
    private readonly cacheStrategy: ICacheStrategy

    // CTOR
    constructor(

        @inject(TYPES.CacheFactory)
        private readonly cacheFactory: ICacheFactory,
        private readonly defaultTtl: number = 60

    ) {

        this.cacheStrategy = this.cacheFactory.createStrategy('redis')
    }

    // INTERFACE IMPLEMENTATION
    async getOrSet<T>(

        key: string,
        fetcher: () => Promise<T>,
        ttlSeconds: number = this.defaultTtl

    ): Promise<T> {

        const cached = await this.cacheStrategy.get<T>(key)

        if (cached !== null) {
            return cached
        }

        const freshData = await fetcher()
        await this.cacheStrategy.set(key, freshData, ttlSeconds)

        return freshData
    }

    async invalidate(keys: string | string[]): Promise<void> {

        await this.cacheStrategy.delete(keys)
    }

    async invalidateByPrefix(prefix: string): Promise<void> {

        await this.cacheStrategy.deleteByPrefix(prefix)
    }

    async withInvalidation<T>(

        keysToInvalidate: string | string[],
        action: () => Promise<T>

    ): Promise<T> {

        const result = await action()
        await this.invalidate(keysToInvalidate)
        
        return result
    }
}