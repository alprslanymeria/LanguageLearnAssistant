"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { SaveFlashcardOldSessionRequest } from "@/src/actions/FlashcardOldSession/Request"
import { FlashcardCategoryNotFound, FlashcardNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { FlashcardOldSessionWithTotalCount } from "@/src/actions/FlashcardOldSession/Response"
import { getFOSWithPagingQuery } from "@/src/actions/FlashcardOldSession/Queries/GetFOSWithPaging/QueryFactory"
import { createFOSCommandFactory } from "@/src/actions/FlashcardOldSession/Commands/CreateFOS/CommandFactory"

/// <summary>
/// GET FLASHCARD OLD SESSIONS WITH PAGING
/// </summary>
export async function GetFOSWithPaging(userId: string, language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<FlashcardOldSessionWithTotalCount>>> {

    return executeQuery<PagedResult<FlashcardOldSessionWithTotalCount>>(
        "GetFOSWithPaging",
        () => getFOSWithPagingQuery(userId, language, request)
    )
}

/// <summary>
/// CREATE FLASHCARD OLD SESSION
/// </summary>
export async function CreateFOS(request: SaveFlashcardOldSessionRequest) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "CreateFOS",
        () => createFOSCommandFactory(request),
        HttpStatusCode.Created,
        { expectedErrors: [FlashcardNotFound, FlashcardCategoryNotFound], silentErrors: [FlashcardNotFound, FlashcardCategoryNotFound] }
    )
}