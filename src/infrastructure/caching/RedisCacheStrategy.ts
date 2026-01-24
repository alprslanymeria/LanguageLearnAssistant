// IMPORTS
import Redis from 'ioredis'
import { inject, injectable } from 'inversify'
import { TYPES } from '@/src/di/type'
import { ICacheStrategy } from '@/src/infrastructure/caching/ICacheStrategy'
import { CacheType } from '@/src/infrastructure/caching/Cache'

@injectable()
export class RedisCacheStrategy implements ICacheStrategy {

    // FIELDS
    type: CacheType = 'redis'
    
    // CTOR
    constructor(
        
        @inject(TYPES.RedisClient) 
        private readonly redis: Redis
    
    ) {}

    // INTERFACE IMPLEMENTATION
    async get<T>(key: string): Promise<T | null> {

        const cached = await this.redis.get(key)
        
        if (!cached) return null
        
        return JSON.parse(cached) as T
    }

    async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {

        await this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds)
    }

    async delete(keys: string | string[]): Promise<void> {

        const keysArray = Array.isArray(keys) ? keys : [keys]
        
        if (keysArray.length > 0) {
            await this.redis.del(...keysArray)
        }
    }

    async deleteByPrefix(prefix: string): Promise<void> {

        let cursor = '0'

        do {
            const [nextCursor, keys] = await this.redis.scan(
                cursor,
                'MATCH',
                `${prefix}*`,
                'COUNT',
                '100'
            )

            cursor = nextCursor

            if (keys.length > 0) await this.redis.del(...keys)
            
        } while (cursor !== '0')
    }

    async exists(key: string): Promise<boolean> {

        const result = await this.redis.exists(key)
        return result === 1
    }

    async clear(): Promise<void> {
        
        await this.redis.flushdb()
    }
}