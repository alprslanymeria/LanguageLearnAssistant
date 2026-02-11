"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand, executeFormDataCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { NoLanguageFound, NoPracticeFound, WritingBookNotFound } from "@/src/exceptions/NotFound"
import { WritingResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { WritingBookDto, WritingBookWithLanguageId, WritingBookWithTotalCount } from "@/src/actions/WritingBook/Response"
import { getWritingBookByIdQuery } from "@/src/actions/WritingBook/Queries/GetWritingBookById/QueryFactory"
import { getAllWBooksWithPagingQuery } from "@/src/actions/WritingBook/Queries/GetAllWBooksWithPaging/QueryFactory"
import { getWBookCreateItemsQuery } from "@/src/actions/WritingBook/Queries/GetWBookCreateItems/QueryFactory"
import { deleteWBookItemByIdCommandFactory } from "@/src/actions/WritingBook/Commands/DeleteWBookItemById/CommandFactory"
import { createWritingBookCommandFactory } from "@/src/actions/WritingBook/Commands/CreateWritingBook/CommandFactory"
import { CreateWritingBookCommandValidator } from "@/src/actions/WritingBook/Commands/CreateWritingBook/CommandValidator"
import { updateWritingBookCommandFactory } from "@/src/actions/WritingBook/Commands/UpdateWritingBook/CommandFactory"
import { UpdateWritingBookCommandValidator } from "@/src/actions/WritingBook/Commands/UpdateWritingBook/CommandValidator"

/// <summary>
/// GET WRITING BOOK BY ID
/// </summary>
export async function GetWritingBookById(id: number) : Promise<SerializedServiceResult<WritingBookWithLanguageId>> {

    return executeQuery<WritingBookWithLanguageId>(
        "GetWritingBookById",
        () => getWritingBookByIdQuery(id),
        { expectedErrors: [WritingBookNotFound] }
    )
}

/// <summary>
/// GET ALL WRITING BOOKS WITH PAGING
/// </summary>
export async function GetAllWBooksWithPaging(userId: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<WritingBookWithTotalCount>>> {

    return executeQuery<PagedResult<WritingBookWithTotalCount>>(
        "GetAllWBooksWithPaging",
        () => getAllWBooksWithPagingQuery(userId, request)
    )
}

/// <summary>
/// GET WRITING BOOK CREATE ITEMS
/// </summary>
export async function GetWBookCreateItems(userId: string, language: string, practice: string) : Promise<SerializedServiceResult<WritingBookDto[]>> {

    return executeQuery<WritingBookDto[]>(
        "GetWBookCreateItems",
        () => getWBookCreateItemsQuery(userId, language, practice),
        { expectedErrors: [NoLanguageFound, NoPracticeFound], silentErrors: [NoLanguageFound, NoPracticeFound] }
    )
}

/// <summary>
/// DELETE WRITING BOOK ITEM BY ID
/// </summary>
export async function DeleteWBookItemById(id: number) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "DeleteWBookItemById",
        () => deleteWBookItemByIdCommandFactory(id),
        HttpStatusCode.NoContent,
        { expectedErrors: [WritingBookNotFound] }
    )
}

/// <summary>
/// CREATE WRITING BOOK
/// </summary>
export async function CreateWritingBook(formData: FormData) : Promise<SerializedServiceResultBase> {

    return executeFormDataCommand(
        "CreateWritingBook",
        formData,
        CreateWritingBookCommandValidator,
        createWritingBookCommandFactory,
        HttpStatusCode.Created,
        { expectedErrors: [NoPracticeFound, WritingResultNotSuccess], silentErrors: [NoPracticeFound, WritingResultNotSuccess] }
    )
}

/// <summary>
/// UPDATE WRITING BOOK
/// </summary>
export async function UpdateWritingBook(formData: FormData) : Promise<SerializedServiceResultBase> {

    return executeFormDataCommand(
        "UpdateWritingBook",
        formData,
        UpdateWritingBookCommandValidator,
        updateWritingBookCommandFactory,
        HttpStatusCode.OK,
        { expectedErrors: [NoPracticeFound, WritingBookNotFound, WritingResultNotSuccess], silentErrors: [NoPracticeFound, WritingResultNotSuccess] }
    )
}