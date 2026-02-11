"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { SaveListeningOldSessionRequest } from "@/src/actions/ListeningOldSession/Request"
import { ListeningCategoryNotFound, ListeningNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { ListeningOldSessionWithTotalCount } from "@/src/actions/ListeningOldSession/Response"
import { getLOSWithPagingQuery } from "@/src/actions/ListeningOldSession/Queries/GetLOSWithPaging/QueryFactory"
import { createLOSCommandFactory } from "@/src/actions/ListeningOldSession/Commands/CreateLOS/CommandFactory"

/// <summary>
/// GET LISTENING OLD SESSIONS WITH PAGING
/// </summary>
export async function GetLOSWithPaging(userId: string, language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<ListeningOldSessionWithTotalCount>>> {

    return executeQuery<PagedResult<ListeningOldSessionWithTotalCount>>(
        "GetLOSWithPaging",
        () => getLOSWithPagingQuery(userId, language, request)
    )
}

/// <summary>
/// CREATE LISTENING OLD SESSION
/// </summary>
export async function CreateLOS(request: SaveListeningOldSessionRequest) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "CreateLOS",
        () => createLOSCommandFactory(request),
        HttpStatusCode.Created,
        { expectedErrors: [ListeningNotFound, ListeningCategoryNotFound], silentErrors: [ListeningNotFound, ListeningCategoryNotFound] }
    )
}