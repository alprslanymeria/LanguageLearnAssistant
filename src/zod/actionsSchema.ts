import { z } from "zod"

// CompareLanguageIdSchema
export const CompareLanguageIdSchema = z.object({

    userId: z.string().nullable(),
    languageId: z.number().nullable()

}).refine(
            data => data.userId !== null
            &&      data.languageId !== null , {message: "Parameters can not be null!"})


// GetItemByIdSchema
export const GetItemByIdSchema = z.object({

    itemId: z.string().nullable(),
    table: z.string().nullable()

}).refine(
            data => data.itemId !== null
            &&      data.table !== null , {message: "Parameters can not be null!"})

            

// DeleteByIdSchema
export const DeleteyIdSchema = z.object({

    itemId: z.number().nullable(),
    table: z.string().nullable()

}).refine(
            data => data.itemId !== null
            &&      data.table !== null , {message: "Parameters can not be null!"})



// ReadingAddOrUpdateSchema
export const ReadingAddOrUpdateSchema = z.object({

    languageId: z.number().nullable(),
    inputOne: z.string().nullable(),
    fileOne: z.instanceof(File).nullable(),
    fileTwo: z.instanceof(File).nullable(),

    userId: z.string().nullable(),
    itemId: z.number().nullable(),
    table: z.string().nullable(),
    type: z.string().nullable()

}).refine(
            data => data.languageId !== null
            &&      data.inputOne !== null
            &&      data.fileOne !== null
            &&      data.fileTwo !== null
            &&      data.userId !== null
            &&      data.itemId !== null
            &&      data.table !== null
            &&      data.type !== null , {message: "Parameters can not be null!"})



// WritingAddOrUpdateSchema
export const WritingAddOrUpdateSchema = z.object({

    languageId: z.number().nullable(),
    inputOne: z.string().nullable(),
    fileOne: z.instanceof(File).nullable(),
    fileTwo: z.instanceof(File).nullable(),

    userId: z.string().nullable(),
    itemId: z.number().nullable(),
    table: z.string().nullable(),
    type: z.string().nullable()

}).refine(
            data => data.languageId !== null
            &&      data.inputOne !== null
            &&      data.fileOne !== null
            &&      data.fileTwo !== null
            &&      data.userId !== null
            &&      data.itemId !== null
            &&      data.table !== null
            &&      data.type !== null , {message: "Parameters can not be null!"})


// DeckWordAddOrUpdateSchema
export const DeckWordAddOrUpdateSchema = z.object({

    languageId: z.number().nullable(),
    inputOne: z.string().nullable(),

    userId: z.string().nullable(),
    itemId: z.number().nullable(),
    table: z.string().nullable(),
    type: z.string().nullable()

}).refine(
            data => data.languageId !== null
            &&      data.inputOne !== null
            &&      data.userId !== null
            &&      data.itemId !== null
            &&      data.table !== null
            &&      data.type !== null , {message: "Parameters can not be null!"})


// FlashcardCategoryAddOrUpdateSchema
export const FlashcardCategoryAddOrUpdateSchema = z.object({

    languageId: z.number().nullable(),
    inputOne: z.string().nullable(),

    userId: z.string().nullable(),
    itemId: z.number().nullable(),
    table: z.string().nullable(),
    type: z.string().nullable()

}).refine(
            data => data.languageId !== null
            &&      data.inputOne !== null
            &&      data.userId !== null
            &&      data.itemId !== null
            &&      data.table !== null
            &&      data.type !== null , {message: "Parameters can not be null!"})



// GetAllRBooksSchema
export const GetAllRBooksSchema = z.object({

    userId: z.string().nullable(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)

}).refine(
            data => data.userId !== null , {message: "Parameters can not be null!"})


// GetAllWBooksSchema
export const GetAllWBooksSchema = z.object({

    userId: z.string().nullable(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)

}).refine(
            data => data.userId !== null , {message: "Parameters can not be null!"})


// GetAllFCategoriesSchema
export const GetAllFCategoriesSchema = z.object({

    userId: z.string().nullable()

}).refine(
            data => data.userId !== null , {message: "Parameters can not be null!"})


// GetAllFCategoriesWithPagingSchema
export const GetAllFCategoriesWithPagingSchema = z.object({

    userId: z.string().nullable(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)

}).refine(
            data => data.userId !== null , {message: "Parameters can not be null!"})


// GetAllFWordsSchema
export const GetAllFWordsSchema = z.object({

    userId: z.string().nullable(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)

}).refine(
            data => data.userId !== null , {message: "Parameters can not be null!"})


// CreateLiveSessionSchema
export const CreateLiveSessionSchema = z.object({

    userId: z.string().nullable(),
    liveSessionId: z.string().nullable()

}).refine(
            data => data.userId !== null
            &&      data.liveSessionId !== null , {message: "Parameters can not be null!"})

            

// DeleteLiveSessionSchema
export const DeleteLiveSessionSchema = z.object({

    userId: z.string().nullable()

}).refine(
            data => data.userId !== null , {message: "Parameters can not be null!"})


// GetOldSessionsSchema
export const GetOldSessionsSchema = z.object({

    userId: z.string().nullable(),
    language: z.string().nullable(),
    practice: z.string().nullable(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)

}).refine(
            data => data.userId !== null
            &&      data.language !== null
            &&      data.practice !== null , {message: "Parameters can not be null!"})



// GetPracticesSchema
export const GetPracticesSchema = z.object({

    language: z.string().nullable()

}).refine(
            data => data.language !== null , {message: "Parameters can not be null!"})


// CalculateRateSchema
export const CalculateRateSchema = z.object({

    inputOne: z.string().nullable(),
    inputTwo: z.string().nullable()

}).refine(
            data => data.inputOne !== null 
        &&          data.inputTwo !== null , {message: "Parameters can not be null!"})


// TranslateTextSchema
export const TranslateTextSchema = z.object({

    userId: z.string().nullable(),
    language: z.string().nullable(),
    practice: z.string().nullable(),
    selectedText: z.string().nullable()

}).refine(
            data => data.userId !== null
            &&      data.language !== null
            &&      data.practice !== null 
            &&      data.selectedText !== null , {message: "Parameters can not be null!"})

// GetProfileInfosSchema
export const GetProfileInfosSchema = z.object({

    userId: z.string().nullable()

}).refine(
            data => data.userId !== null , {message: "Parameters can not be null!"})


// SaveProfileInfosSchema
export const SaveProfileInfosSchema = z.object({

    userId: z.string().nullable(),
    name: z.string().nullable(),
    image: z.instanceof(File).nullable(),
    nativeLanguageId: z.number().nullable()

}).refine(
            data => data.userId !== null
            &&      data.name !== null
            &&      data.image !== null 
            &&      data.nativeLanguageId !== null , {message: "Parameters can not be null!"})


// GetRowsByIdSchema
export const GetRowsByIdSchema = z.object({

    userId: z.string().nullable(),
    language: z.string().nullable(),
    practice: z.string().nullable(),
    oldSessionId: z.string().nullable(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(10)

}).refine(
            data => data.userId !== null
            &&      data.language !== null
            &&      data.practice !== null 
            &&      data.oldSessionId !== null , {message: "Parameters can not be null!"})


// GetCreateItemsSchema
export const GetCreateItemsSchema = z.object({

    userId: z.string().nullable(),
    language: z.string().nullable(),
    practice: z.string().nullable()

}).refine(
            data => data.userId !== null
            &&      data.language !== null
            &&      data.practice !== null , {message: "Parameters can not be null!"})
