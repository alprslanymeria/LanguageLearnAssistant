import {redis} from "@/src/lib/redis"


// GET OR SET CACHE
export async function getOrSetCache<T> (

  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 60

): Promise<T> {

    //CHECK
    const cached = await redis.get(key)

    // IF CACHED RETURN
    if (cached) return JSON.parse(cached) as T

    // IF NOT FETCH FROM DATABASE WITH PRISMA
    const freshData = await fetcher()

    // AND SET DATA TO REDIS
    await redis.set(key, JSON.stringify(freshData), "EX", ttlSeconds)

    return freshData
}


// INVALIDATE CACHE
export async function invalidateCache(keys: string | string[]) {

  if ( Array.isArray(keys) ) {

    await redis.del(...keys)

  } 
  else await redis.del(keys)

}

// WITH CACHE INVALIDATION
export async function withCacheInvalidation<T>(

  keysToInvalidate: string | string[],
  action: () => Promise<T>

): Promise<T> {

    // CREATE / UPDATE OR DELETE ACTION
    const result = await action()
  
    // DELETE KEYS
    await invalidateCache(keysToInvalidate)

    return result
}


// PREFIX-BASED INVALIDATION
export async function invalidateCacheByPrefix(prefix: string) {

  let cursor = "0"

  do {

    const [nextCursor, keys] = await redis.scan(cursor, "MATCH", `${prefix}*`, "COUNT", "100")
    
    cursor = nextCursor

    if (keys.length > 0) await redis.del(...keys)

  } while (cursor !== "0")

}