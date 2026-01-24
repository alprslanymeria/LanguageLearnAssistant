// IMPORT

import { IStoragePath } from "./Storage"

export class StoragePaths {

    // USER FILES
    static user = {

        prefix: "users",

        avatar: (userId: string, filename: string): IStoragePath => ({
            path: `${StoragePaths.user.prefix}/${userId}/avatar/${filename}`,
            contentType: 'image/jpeg'
        }),

        document: (userId: string, filename: string): IStoragePath => ({
            path: `${StoragePaths.user.prefix}/${userId}/documents/${filename}`,
            contentType: 'application/pdf'
        })
    }

    // LANGUAGE FILES
    static language = {

        prefix: "languages",

        flag: (languageId: number, filename: string): IStoragePath => ({
            path: `${StoragePaths.language.prefix}/${languageId}/flag/${filename}`,
            contentType: 'image/png'
        }),

        audio: (languageId: number, filename: string): IStoragePath => ({
            path: `${StoragePaths.language.prefix}/${languageId}/audio/${filename}`,
            contentType: 'audio/mpeg'
        })
    }

    // READING BOOK FILES
    static readingBook = {

        prefix: "reading-books",

        cover: (bookId: number, filename: string): IStoragePath => ({
            path: `${StoragePaths.readingBook.prefix}/${bookId}/cover/${filename}`,
            contentType: 'image/jpeg'
        }),

        content: (bookId: number, filename: string): IStoragePath => ({
            path: `${StoragePaths.readingBook.prefix}/${bookId}/content/${filename}`,
            contentType: 'application/pdf'
        })
    }

    // FLASHCARD FILES
    static flashcard = {

        prefix: "flashcards",

        image: (categoryId: number, filename: string): IStoragePath => ({
            path: `${StoragePaths.flashcard.prefix}/${categoryId}/images/${filename}`,
            contentType: 'image/jpeg'
        }),

        audio: (categoryId: number, filename: string): IStoragePath => ({
            path: `${StoragePaths.flashcard.prefix}/${categoryId}/audio/${filename}`,
            contentType: 'audio/mpeg'
        })
    }

    // TEMP FILES
    static temp = {

        prefix: "temp",

        file: (sessionId: string, filename: string): IStoragePath => ({
            path: `${StoragePaths.temp.prefix}/${sessionId}/${filename}`,
            contentType: 'application/octet-stream'
        })
    }
}
