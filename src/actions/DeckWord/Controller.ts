"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand, executeFormDataCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { DeckWordNotFound, FlashcardCategoryNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { DeckWordWithLanguageId, DeckWordWithTotalCount } from "@/src/actions/DeckWord/Response"
import { getDeckWordByIdQuery } from "@/src/actions/DeckWord/Queries/GetDeckWordById/QueryFactory"
import { getAllDWordsWithPagingQuery } from "@/src/actions/DeckWord/Queries/GetAllDWordsWithPaging/QueryFactory"
import { createDeleteDWordItemByIdCommandFactory } from "@/src/actions/DeckWord/Commands/DeleteDWordItemById/CommandFactory"
import { createDeckWordFactory } from "@/src/actions/DeckWord/Commands/CreateDeckWord/CommandFactory"
import { CreateDeckWordCommandValidator } from "@/src/actions/DeckWord/Commands/CreateDeckWord/CommandValidator"
import { updateDeckWordCommandFactory } from "@/src/actions/DeckWord/Commands/UpdateDeckWord/CommandFactory"
import { UpdateDeckWordCommandValidator } from "@/src/actions/DeckWord/Commands/UpdateDeckWord/CommandValidator"

/// <summary>
/// GET DECK WORD BY ID
/// </summary>
export async function GetDeckWordById(id: number) : Promise<SerializedServiceResult<DeckWordWithLanguageId>> {

    return executeQuery<DeckWordWithLanguageId>(
        "GetDeckWordById",
        () => getDeckWordByIdQuery(id),
        { expectedErrors: [DeckWordNotFound] }
    )
}

/// <summary>
/// GET ALL DECK WORDS WITH PAGING
/// </summary>
export async function GetAllDWordsWithPaging(userId: string, request: PagedRequest): Promise<SerializedServiceResult<PagedResult<DeckWordWithTotalCount>>> {

    return executeQuery<PagedResult<DeckWordWithTotalCount>>(
        "GetAllDWordsWithPaging",
        () => getAllDWordsWithPagingQuery(userId, request)
    )
}

/// <summary>
/// DELETE DECK WORD ITEM BY ID
/// </summary>
export async function DeleteDWordItemById(id: number) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "DeleteDWordItemById",
        () => createDeleteDWordItemByIdCommandFactory(id),
        HttpStatusCode.NoContent,
        { expectedErrors: [DeckWordNotFound] }
    )
}

/// <summary>
/// CREATE DECK WORD
/// </summary>
export async function CreateDeckWord(formData: FormData) : Promise<SerializedServiceResultBase> {

    return executeFormDataCommand(
        "CreateDeckWord",
        formData,
        CreateDeckWordCommandValidator,
        createDeckWordFactory,
        HttpStatusCode.Created,
        { expectedErrors: [FlashcardCategoryNotFound], silentErrors: [FlashcardCategoryNotFound] }
    )
}

/// <summary>
/// UPDATE DECK WORD
/// </summary>
export async function UpdateDeckWord(formData: FormData) : Promise<SerializedServiceResultBase> {

    return executeFormDataCommand(
        "UpdateDeckWord",
        formData,
        UpdateDeckWordCommandValidator,
        updateDeckWordCommandFactory,
        HttpStatusCode.OK,
        { expectedErrors: [DeckWordNotFound] }
    )
}