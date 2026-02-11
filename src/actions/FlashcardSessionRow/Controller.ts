"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { SaveFlashcardRowsRequest } from "@/src/actions/FlashcardSessionRow/Request"
import { FlashcardOldSessionNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { FlashcardRowsResponse } from "@/src/actions/FlashcardSessionRow/Response"
import { getFWordsByIdWithPagingQuery } from "@/src/actions/FlashcardSessionRow/Queries/GetFRowsByIdWithPaging/QueryFactory"
import { createFRowsCommandFactory } from "@/src/actions/FlashcardSessionRow/Commands/CreateFRows/CommandFactory"

/// <summary>
/// GET FLASHCARD ROWS BY ID WITH PAGING
/// </summary>
export async function GetFRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<SerializedServiceResult<FlashcardRowsResponse>> {

    return executeQuery<FlashcardRowsResponse>(
        "GetFRowsByIdWithPaging",
        () => getFWordsByIdWithPagingQuery(oldSessionId, request),
        { expectedErrors: [FlashcardOldSessionNotFound], silentErrors: [FlashcardOldSessionNotFound] }
    )
}

/// <summary>
/// CREATE FLASHCARD ROWS
/// </summary>
export async function CreateFRows(request: SaveFlashcardRowsRequest) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "CreateFRows",
        () => createFRowsCommandFactory(request),
        HttpStatusCode.Created,
        { expectedErrors: [FlashcardOldSessionNotFound], silentErrors: [FlashcardOldSessionNotFound] }
    )
}