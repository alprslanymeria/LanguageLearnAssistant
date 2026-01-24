export interface CacheEntry<T> {
    
    value: T
    expiresAt: number
}

export type CacheType = 'redis' | 'memory'

export interface CacheOptions {

    type: CacheType
    defaultTtl: number
}

export interface ICacheKey {

    key: string
    ttl: number
}

export interface ICacheableQuery {

    getCacheKey(): ICacheKey
}