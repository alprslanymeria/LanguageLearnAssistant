// FACADE DESIGN PATTERN INTERFACE FOR CACHING
export interface ICacheService {
    
    getOrSet<T>(key: string, fetcher: () => Promise<T>, ttlSeconds?: number): Promise<T>
    invalidate(keys: string | string[]): Promise<void>
    invalidateByPrefix(prefix: string): Promise<void>
    withInvalidation<T>(keysToInvalidate: string | string[], action: () => Promise<T>): Promise<T>
}