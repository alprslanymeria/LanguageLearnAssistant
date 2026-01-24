// IMPORTS
import { injectable } from 'inversify'
import { ICacheStrategy } from '@/src/infrastructure/caching/ICacheStrategy'
import { CacheEntry, CacheType } from '@/src/infrastructure/caching/Cache'

@injectable()
export class MemoryCacheStrategy implements ICacheStrategy {

    // FIELDS
    type: CacheType = 'memory'
    private readonly cache: Map<string, CacheEntry<unknown>> = new Map()
    private cleanupInterval: NodeJS.Timeout | null = null

    // CTOR
    constructor(
        
        cleanupIntervalMs: number = 60000
    
    ) {
        this.startCleanup(cleanupIntervalMs)
    }

    // UTILS
    private startCleanup(intervalMs: number): void {

        this.cleanupInterval = setInterval(() => {

            this.removeExpiredEntries()
        }, intervalMs)
    }

    private removeExpiredEntries(): void {

        const now = Date.now()
        
        for (const [key, entry] of this.cache.entries()) {

            if (entry.expiresAt <= now) this.cache.delete(key)
        }
    }

    private isExpired(entry: CacheEntry<unknown>): boolean {

        return entry.expiresAt <= Date.now()
    }

    // INTERFACE IMPLEMENTATION
    async get<T>(key: string): Promise<T | null> {

        const entry = this.cache.get(key)

        if (!entry) return null

        if (this.isExpired(entry)) {

            this.cache.delete(key)
            return null
        }

        return entry.value as T
    }

    async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {

        const entry: CacheEntry<T> = {
            value,
            expiresAt: Date.now() + ttlSeconds * 1000
        }

        this.cache.set(key, entry)
    }

    async delete(keys: string | string[]): Promise<void> {

        const keysArray = Array.isArray(keys) ? keys : [keys]
        
        keysArray.forEach(key => this.cache.delete(key))
    }

    async deleteByPrefix(prefix: string): Promise<void> {

        for (const key of this.cache.keys()) {

            if (key.startsWith(prefix)) this.cache.delete(key)
        }
    }

    async exists(key: string): Promise<boolean> {

        const entry = this.cache.get(key)
        
        if (!entry) return false
        
        if (this.isExpired(entry)) {

            this.cache.delete(key)
            return false
        }

        return true
    }

    async clear(): Promise<void> {

        this.cache.clear()
    }

    destroy(): void {

        if (this.cleanupInterval) {

            clearInterval(this.cleanupInterval)
            this.cleanupInterval = null
        }

        this.cache.clear()
    }
}