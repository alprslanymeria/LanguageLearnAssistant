import { z } from "zod"

// CompareLanguageIdSchema
export const CompareLanguageIdSchema = z.object({

    userId: z.string(),
    languageId: z.number()
})


// GetItemByIdSchema
export const GetItemByIdSchema = z.object({

    itemId: z.string(),
    table: z.string()
})
            

// DeleteByIdSchema
export const DeleteyIdSchema = z.object({

    itemId: z.number(),
    table: z.string()
})


// ReadingAddOrUpdateSchema
export const ReadingAddOrUpdateSchema = z.object({

    languageId: z.number(),
    inputOne: z.string(),
    fileOne: z.instanceof(File),
    fileTwo: z.instanceof(File),

    userId: z.string(),
    itemId: z.number(),
    table: z.string(),
    type: z.string()
})


// WritingAddOrUpdateSchema
export const WritingAddOrUpdateSchema = z.object({

    languageId: z.number(),
    inputOne: z.string(),
    fileOne: z.instanceof(File),
    fileTwo: z.instanceof(File),

    userId: z.string(),
    itemId: z.number(),
    table: z.string(),
    type: z.string()
})


// DeckWordAddOrUpdateSchema
export const DeckWordAddOrUpdateSchema = z.object({

    languageId: z.number(),
    inputOne: z.string(),

    userId: z.string(),
    itemId: z.number(),
    table: z.string(),
    type: z.string()

})

// FlashcardCategoryAddOrUpdateSchema
export const FlashcardCategoryAddOrUpdateSchema = z.object({

    languageId: z.number(),
    inputOne: z.string(),

    userId: z.string(),
    itemId: z.number(),
    table: z.string(),
    type: z.string()
})


// GetAllRBooksSchema
export const GetAllRBooksSchema = z.object({

    userId: z.string(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)
})


// GetAllWBooksSchema
export const GetAllWBooksSchema = z.object({

    userId: z.string(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)
})

// GetAllFCategoriesSchema
export const GetAllFCategoriesSchema = z.object({

    userId: z.string()
})


// GetAllFCategoriesWithPagingSchema
export const GetAllFCategoriesWithPagingSchema = z.object({

    userId: z.string(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)
})


// GetAllFWordsSchema
export const GetAllFWordsSchema = z.object({

    userId: z.string(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)
})


// GetOldSessionsSchema
export const GetOldSessionsSchema = z.object({

    userId: z.string(),
    language: z.string(),
    practice: z.string(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)
})


// GetPracticesSchema
export const GetPracticesSchema = z.object({

    language: z.string()
})


// CalculateRateSchema
export const CalculateRateSchema = z.object({

    inputOne: z.string(),
    inputTwo: z.string()
})


// TranslateTextSchema
export const TranslateTextSchema = z.object({

    userId: z.string(),
    language: z.string(),
    practice: z.string(),
    selectedText: z.string()
})


// GetProfileInfosSchema
export const GetProfileInfosSchema = z.object({

    userId: z.string()
})


// SaveProfileInfosSchema
export const SaveProfileInfosSchema = z.object({

    userId: z.string(),
    name: z.string(),
    image: z.instanceof(File),
    nativeLanguageId: z.number()
})

// GetRowsByIdSchema
export const GetRowsByIdSchema = z.object({

    userId: z.string(),
    language: z.string(),
    practice: z.string(),
    oldSessionId: z.string(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)
})

// GetCreateItemsSchema
export const GetCreateItemsSchema = z.object({

    userId: z.string(),
    language: z.string(),
    practice: z.string()
})

// SignInSchema
export const SignInSchema = z.object({

    email: z.email("Invalid email address")
                .min(1, "Email is required"),
    password: z
                .string()
                .min(8, "Password must be at least 8 characters long")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})

export const SignupSchema = z.object({

    name: z.string(),
    email: z.email("Invalid email address")
                .min(1, "Email is required"),
    password: z
                .string()
                .min(8, "Password must be at least 8 characters long")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    nativeLanguageId: z.number()
})