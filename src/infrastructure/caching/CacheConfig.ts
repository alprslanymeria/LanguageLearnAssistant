// IMPORTS
import { CacheOptions } from "@/src/infrastructure/caching/Cache"

export class CacheConfig {

  static load(): CacheOptions {

    return {

        type: process.env.CACHE_TYPE as 'redis' | 'memory',
        defaultTtl: Number(process.env.CACHE_DEFAULT_TTL ?? 60),
    }
  }
}