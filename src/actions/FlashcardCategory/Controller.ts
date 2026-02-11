"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand, executeFormDataCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { FlashcardCategoryNotFound, NoLanguageFound, NoPracticeFound } from "@/src/exceptions/NotFound"
import { FlashcardResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { FlashcardCategoryWithDeckWords, FlashcardCategoryWithLanguageId, FlashcardCategoryWithLanguageIds, FlashcardCategoryWithTotalCount } from "@/src/actions/FlashcardCategory/Response"
import { getFlashcardCategoryByIdQuery } from "@/src/actions/FlashcardCategory/Queries/GetFlashcardCategoryById/QueryFactory"
import { getAllFCategoriesWithPagingQuery } from "@/src/actions/FlashcardCategory/Queries/GetAllFCategoriesWithPaging/QueryFactory"
import { getFCategoryCreateItemsQuery } from "@/src/actions/FlashcardCategory/Queries/GetFCategoryCreateItems/QueryFactory"
import { getAllFCategories } from "./Queries/GetAllFCategories/QueryFactory"
import { deleteFCategoryItemByIdCommandFactory } from "@/src/actions/FlashcardCategory/Commands/DeleteFCategoryItemById/CommandFactory"
import { createFlashcardCategoryCommandFactory } from "@/src/actions/FlashcardCategory/Commands/CreateFlashcardCategory/CommandFactory"
import { createFlashcardCategoryCommandValidator } from "@/src/actions/FlashcardCategory/Commands/CreateFlashcardCategory/CommandValidator"
import { updateFlashcardCategoryCommandFactory } from "@/src/actions/FlashcardCategory/Commands/UpdateFlashcardCategory/CommandFactory"
import { UpdateFlashcardCategoryCommandValidator } from "@/src/actions/FlashcardCategory/Commands/UpdateFlashcardCategory/CommandValidator"

/// <summary>
/// GET FLASHCARD CATEGORY BY ID
/// </summary>
export async function GetFlashcardCategoryById(id: number) : Promise<SerializedServiceResult<FlashcardCategoryWithLanguageId>> {

    return executeQuery<FlashcardCategoryWithLanguageId>(
        "GetFlashcardCategoryById",
        () => getFlashcardCategoryByIdQuery(id),
        { expectedErrors: [FlashcardCategoryNotFound] }
    )
}

/// <summary>
/// GET ALL FLASHCARD CATEGORIES WITH PAGING
/// </summary>
export async function GetAllFCategoriesWithPaging(userId: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<FlashcardCategoryWithTotalCount>>> {

    return executeQuery<PagedResult<FlashcardCategoryWithTotalCount>>(
        "GetAllFCategoriesWithPaging",
        () => getAllFCategoriesWithPagingQuery(userId, request)
    )
}

/// <summary>
/// GET FLASHCARD CATEGORY CREATE ITEMS
/// </summary>
export async function GetFCategoryCreateItems(userId: string, language: string, practice: string) : Promise<SerializedServiceResult<FlashcardCategoryWithDeckWords[]>> {

    return executeQuery<FlashcardCategoryWithDeckWords[]>(
        "GetFCategoryCreateItems",
        () => getFCategoryCreateItemsQuery(userId, language, practice),
        { expectedErrors: [NoLanguageFound, NoPracticeFound], silentErrors: [NoLanguageFound, NoPracticeFound] }
    )
}

/// <summary>
/// GET ALL FLASHCARD CATEGORIES
/// </summary>
export async function GetAllFCategories(userId: string) : Promise<SerializedServiceResult<FlashcardCategoryWithLanguageIds>> {

    return executeQuery<FlashcardCategoryWithLanguageIds>(
        "GetAllFCategories",
        () => getAllFCategories(userId)
    )
}

/// <summary>
/// DELETE FLASHCARD CATEGORY ITEM BY ID
/// </summary>
export async function DeleteFCategoryItemById(id: number) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "DeleteFCategoryItemById",
        () => deleteFCategoryItemByIdCommandFactory(id),
        HttpStatusCode.NoContent,
        { expectedErrors: [FlashcardCategoryNotFound] }
    )
}

/// <summary>
/// CREATE FLASHCARD CATEGORY
/// </summary>
export async function CreateFlashcardCategory(formData: FormData) : Promise<SerializedServiceResultBase> {

    return executeFormDataCommand(
        "CreateFlashcardCategory",
        formData,
        createFlashcardCategoryCommandValidator,
        createFlashcardCategoryCommandFactory,
        HttpStatusCode.Created,
        { expectedErrors: [NoPracticeFound, FlashcardResultNotSuccess], silentErrors: [NoPracticeFound, FlashcardResultNotSuccess] }
    )
}

/// <summary>
/// UPDATE FLASHCARD CATEGORY
/// </summary>
export async function UpdateFlashcardCategory(formData: FormData) : Promise<SerializedServiceResultBase> {

    return executeFormDataCommand(
        "UpdateFlashcardCategory",
        formData,
        UpdateFlashcardCategoryCommandValidator,
        updateFlashcardCategoryCommandFactory,
        HttpStatusCode.OK,
        { expectedErrors: [NoPracticeFound, FlashcardCategoryNotFound, FlashcardResultNotSuccess], silentErrors: [NoPracticeFound, FlashcardResultNotSuccess] }
    )
}