export const CacheKeys = {

    languages: {

        all: () => ({
            
            key: "languages:all", 
            ttl: 120
        })
    },

    practice: {

        byLanguage: (language: string) => ({

            key: `practices:byLanguage:language:${language}`,
            ttl: 60
        })
    },

    user: {

        compareLanguage: (userId: string, languageId: number) => ({
            
            key: `compare_language:${userId}:${languageId}`,
            ttl: 60
        }),

        profile: (userId: string) => ({

            key: `profile_infos:${userId}`,
            ttl: 60
        })
    },

    readingBook: {

        paging: (userId: string, page: number, limit: number) => ({

            key: `get_all_rbooks_with_paging:${userId}:page:${page}limit:${limit}`,
            ttl: 60
        })
    },

    writingBook: {

        paging: (userId: string, page: number, limit: number) => ({

            key: `get_all_wbooks_with_paging:${userId}:page:${page}limit:${limit}`,
            ttl: 60
        })
    },

    flashcardCategory: {

        all: (userId: string) => ({

            key: `get_all_fcategories:${userId}`,
            ttl: 60
        }),

        paging: (userId: string, page: number, limit: number) => ({

            key: `get_all_fcategories_with_paging:${userId}:page:${page}limit:${limit}`,
            ttl: 60
        })
    },

    deckWord: {

        paging: (userId: string, page: number, limit: number) => ({

            key: `get_all_fwords_with_paging:${userId}:page:${page}limit:${limit}`,
            ttl: 60
        })
    },

    readingOldSessions: {

        paging: (userId: string, languageId: number, practiceId: number, page: number, limit: number) => ({

            key: `get_all_reading_oldSessions_with_paging:${userId}:languageId:${languageId}:practiceId:${practiceId}:page:${page}:limit:${limit}`,
            ttl: 60
        })
    },

    writingOldSessions: {

        paging: (userId: string, languageId: number, practiceId: number, page: number, limit: number) => ({

            key: `get_all_writing_oldSessions_with_paging:${userId}:languageId:${languageId}:practiceId:${practiceId}:page:${page}:limit:${limit}`,
            ttl: 60
        })
    },

    flashcardOldSessions: {

        paging: (userId: string, languageId: number, practiceId: number, page: number, limit: number) => ({

            key: `get_all_flashcard_oldSessions_with_paging:${userId}:languageId:${languageId}:practiceId:${practiceId}:page:${page}:limit:${limit}`,
            ttl: 60
        })
    },

    listeningOldSessions: {

        paging: (userId: string, languageId: number, practiceId: number, page: number, limit: number) => ({

            key: `get_all_listening_oldSessions_with_paging:${userId}:languageId:${languageId}:practiceId:${practiceId}:page:${page}:limit:${limit}`,
            ttl: 60
        })
    },

    rows: {

        reading: (userId: string, langId: number, pracId: number, sessionId: string, page: number, limit: number) => ({

            key: `get_reading_rows:userId:${userId}:langId:${langId}:pracId:${pracId}:sessionId:${sessionId}:page:${page}:limit:${limit}`,
            ttl: 60
        }),

        writing: (userId: string, langId: number, pracId: number, sessionId: string, page: number, limit: number) => ({

            key: `get_writing_rows:userId:${userId}:langId:${langId}:pracId:${pracId}:sessionId:${sessionId}:page:${page}:limit:${limit}`,
            ttl: 60
        }),

        flashcard: (userId: string, langId: number, pracId: number, sessionId: string, page: number, limit: number) => ({

            key: `get_flashcard_rows:userId:${userId}:langId:${langId}:pracId:${pracId}:sessionId:${sessionId}:page:${page}:limit:${limit}`,
            ttl: 60
        }),

        listening: (userId: string, langId: number, pracId: number, sessionId: string, page: number, limit: number) => ({

            key: `get_listening_rows:userId:${userId}:langId:${langId}:pracId:${pracId}:sessionId:${sessionId}:page:${page}:limit:${limit}`,
            ttl: 60
        })
    },

    createItems: {

        reading: (userId: string, langId: number, pracId: number) => ({

            key: `reading:userId:${userId}:langId:${langId}:pracId:${pracId}`,
            ttl: 60
        }),

        writing: (userId: string, langId: number, pracId: number) => ({

            key: `writing:userId:${userId}:langId:${langId}:pracId:${pracId}`,
            ttl: 60
        }),

        listening: (userId: string, langId: number, pracId: number) => ({

            key: `listening:userId:${userId}:langId:${langId}:pracId:${pracId}`,
            ttl: 60
        }),

        flashcard: (userId: string, langId: number, pracId: number) => ({

            key: `flashcard:userId:${userId}:langId:${langId}:pracId:${pracId}`,
            ttl: 60
        })
    }
}