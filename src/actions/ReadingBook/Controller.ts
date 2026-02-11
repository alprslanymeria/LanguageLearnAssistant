"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand, executeFormDataCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { NoLanguageFound, NoPracticeFound, ReadingBookNotFound } from "@/src/exceptions/NotFound"
import { ReadingResultNotSuccess } from "@/src/exceptions/NotSuccess"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { ReadingBookDto, ReadingBookWithLanguageId, ReadingBookWithTotalCount } from "@/src/actions/ReadingBook/Response"
import { getReadingBookByIdQuery } from "@/src/actions/ReadingBook/Queries/GetReadingBookById/QueryFactory"
import { getAllRBooksWithPagingQuery } from "@/src/actions/ReadingBook/Queries/GetAllRBooksWithPaging/QueryFactory"
import { getRBookCreateItemsQuery } from "@/src/actions/ReadingBook/Queries/GetRBookCreateItems/QueryFactory"
import { deleteRBookItemByIdCommandFactory } from "@/src/actions/ReadingBook/Commands/DeleteRBookItemById/CommandFactory"
import { createReadingBookCommandFactory } from "@/src/actions/ReadingBook/Commands/CreateReadingBook/CommandFactory"
import { CreateReadingBookCommandValidator } from "@/src/actions/ReadingBook/Commands/CreateReadingBook/CommandValidator"
import { updateReadingBookCommandFactory } from "@/src/actions/ReadingBook/Commands/UpdateReadingBook/CommandFactory"
import { UpdateReadingBookCommandValidator } from "@/src/actions/ReadingBook/Commands/UpdateReadingBook/CommandValidator"

/// <summary>
/// GET READING BOOK BY ID
/// </summary>
export async function GetReadingBookById(id: number) : Promise<SerializedServiceResult<ReadingBookWithLanguageId>> {

    return executeQuery<ReadingBookWithLanguageId>(
        "GetReadingBookById",
        () => getReadingBookByIdQuery(id),
        { expectedErrors: [ReadingBookNotFound] }
    )
}

/// <summary>
/// GET ALL READING BOOKS WITH PAGING
/// </summary>
export async function GetAllRBooksWithPaging(userId: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<ReadingBookWithTotalCount>>> {

    return executeQuery<PagedResult<ReadingBookWithTotalCount>>(
        "GetAllRBooksWithPaging",
        () => getAllRBooksWithPagingQuery(userId, request)
    )
}

/// <summary>
/// GET READING BOOK CREATE ITEMS
/// </summary>
export async function GetRBookCreateItems(userId: string, language: string, practice: string) : Promise<SerializedServiceResult<ReadingBookDto[]>> {

    return executeQuery<ReadingBookDto[]>(
        "GetRBookCreateItems",
        () => getRBookCreateItemsQuery(userId, language, practice),
        { expectedErrors: [NoLanguageFound, NoPracticeFound], silentErrors: [NoLanguageFound, NoPracticeFound] }
    )
}

/// <summary>
/// DELETE READING BOOK ITEM BY ID
/// </summary>
export async function DeleteRBookItemById(id : number) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "DeleteRBookItemById",
        () => deleteRBookItemByIdCommandFactory(id),
        HttpStatusCode.NoContent,
        { expectedErrors: [ReadingBookNotFound] }
    )
}

/// <summary>
/// CREATE READING BOOK
/// </summary>
export async function CreateReadingBook(formData: FormData) : Promise<SerializedServiceResultBase> {

    return executeFormDataCommand(
        "CreateReadingBook",
        formData,
        CreateReadingBookCommandValidator,
        createReadingBookCommandFactory,
        HttpStatusCode.Created,
        { expectedErrors: [NoPracticeFound, ReadingResultNotSuccess], silentErrors: [NoPracticeFound, ReadingResultNotSuccess] }
    )
}

/// <summary>
/// UPDATE READING BOOK
/// </summary>
export async function UpdateReadingBook(formData: FormData) : Promise<SerializedServiceResultBase> {

    return executeFormDataCommand(
        "UpdateReadingBook",
        formData,
        UpdateReadingBookCommandValidator,
        updateReadingBookCommandFactory,
        HttpStatusCode.OK,
        { expectedErrors: [NoPracticeFound, ReadingBookNotFound, ReadingResultNotSuccess], silentErrors: [NoPracticeFound, ReadingResultNotSuccess] }
    )
}