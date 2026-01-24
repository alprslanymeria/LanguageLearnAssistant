// IMPORTS
import { CacheType } from "@/src/infrastructure/caching/Cache"

// STRATEGY DESIGN PATTERN INTERFACE FOR CACHING
export interface ICacheStrategy {
    
    type: CacheType
    get<T>(key: string): Promise<T | null>
    set<T>(key: string, value: T, ttlSeconds: number): Promise<void>
    delete(keys: string | string[]): Promise<void>
    deleteByPrefix(prefix: string): Promise<void>
    exists(key: string): Promise<boolean>
    clear(): Promise<void>
}