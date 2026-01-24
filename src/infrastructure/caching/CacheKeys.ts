// IMPORT
import { ICacheKey } from "@/src/infrastructure/caching/Cache"

export class CacheKeys {

    static readonly DEFAULT_TTL = 60

    // LANGUAGE CACHE KEYS
    static language = {

        prefix: "language:",

        All: (): ICacheKey => ({
            key: `${CacheKeys.language.prefix}:all`,
            ttl: CacheKeys.DEFAULT_TTL
        }),

        ById: (id: number): ICacheKey => ({
            key: `${CacheKeys.language.prefix}:id:${id}`,
            ttl: CacheKeys.DEFAULT_TTL
        })
    }

    // PRACTICE CACHE KEYS
    static practice = {

        prefix: "practice:",
        
        ByLanguage: (language: string): ICacheKey => ({
            key: `${CacheKeys.practice.prefix}:language:${language}`,
            ttl: CacheKeys.DEFAULT_TTL
        }),

        ById: (id: number): ICacheKey => ({
            key: `${CacheKeys.practice.prefix}:id:${id}`,
            ttl: CacheKeys.DEFAULT_TTL
        }),

        All: () : ICacheKey => ({
            key: `${CacheKeys.practice.prefix}:all`,
            ttl: CacheKeys.DEFAULT_TTL
        })
    }

    // DECK WORD CACHE KEYS
    static deckWord = {

        prefix: "deckWord:",

        Paged: (page: number , pageSize: number) : ICacheKey => ({
            key: `${CacheKeys.deckWord.prefix}:all:${page}:${pageSize}`,
            ttl: CacheKeys.DEFAULT_TTL
        }),

        ById: (id: number): ICacheKey => ({
            key: `${CacheKeys.deckWord.prefix}:id:${id}`,
            ttl: CacheKeys.DEFAULT_TTL
        })
    }

    // FLASHCARD CATEGORY CACHE KEYS
    static flashcardCategory = {

        prefix: "flashcardCategory:",
        
        Paged: (page: number , pageSize: number): ICacheKey => ({
            key: `${CacheKeys.flashcardCategory.prefix}:all:${page}:${pageSize}`,
            ttl: CacheKeys.DEFAULT_TTL
        }),

        ById: (id: number): ICacheKey => ({
            key: `${CacheKeys.flashcardCategory.prefix}:id:${id}`,
            ttl: CacheKeys.DEFAULT_TTL
        }),

        CreateItems: (userId: string , language: string , practice: string): ICacheKey => ({
            key: `${CacheKeys.flashcardCategory.prefix}:createItems:${userId}:${language}:${practice}`,
            ttl: CacheKeys.DEFAULT_TTL
        })
    }

    // READING BOOK CACHE KEYS
    static readingBook = {

        prefix: "readingBook:",

        Paged: (page: number , pageSize: number): ICacheKey => ({
            key: `${CacheKeys.readingBook.prefix}:all:${page}:${pageSize}`,
            ttl: CacheKeys.DEFAULT_TTL
        }),

        ById: (id: number): ICacheKey => ({
            key: `${CacheKeys.readingBook.prefix}:id:${id}`,
            ttl: CacheKeys.DEFAULT_TTL
        }),

        CreateItems: (userId: string , language: string , practice: string): ICacheKey => ({
            key: `${CacheKeys.readingBook.prefix}:createItems:${userId}:${language}:${practice}`,
            ttl: CacheKeys.DEFAULT_TTL
        })
    }

    // WRITING BOOK CACHE KEYS
    static writingBook = {

        prefix: "writingBook:",

        Paged: (page: number , pageSize: number): ICacheKey => ({
            key: `${CacheKeys.writingBook.prefix}:all:${page}:${pageSize}`,
            ttl: CacheKeys.DEFAULT_TTL
        }),

        ById: (id: number): ICacheKey => ({
            key: `${CacheKeys.writingBook.prefix}:id:${id}`,
            ttl: CacheKeys.DEFAULT_TTL
        }),

        CreateItems: (userId: string , language: string , practice: string): ICacheKey => ({
            key: `${CacheKeys.writingBook.prefix}:createItems:${userId}:${language}:${practice}`,
            ttl: CacheKeys.DEFAULT_TTL
        })
    }
}