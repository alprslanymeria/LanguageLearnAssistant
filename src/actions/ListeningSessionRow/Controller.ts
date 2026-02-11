"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { SaveListeningRowsRequest } from "@/src/actions/ListeningSessionRow/Request"
import { ListeningOldSessionNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { ListeningRowsResponse } from "@/src/actions/ListeningSessionRow/Response"
import { getLRowsByIdWithPagingQuery } from "@/src/actions/ListeningSessionRow/Queries/GetLRowsByIdWithPaging/QueryFactory"
import { createLRowsCommandFactory } from "@/src/actions/ListeningSessionRow/Commands/CreateLRows/CommandFactory"

/// <summary>
/// GET LISTENING ROWS BY ID WITH PAGING
/// </summary>
export async function GetLRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<SerializedServiceResult<ListeningRowsResponse>> {

    return executeQuery<ListeningRowsResponse>(
        "GetLRowsByIdWithPaging",
        () => getLRowsByIdWithPagingQuery(oldSessionId, request),
        { expectedErrors: [ListeningOldSessionNotFound], silentErrors: [ListeningOldSessionNotFound] }
    )
}

/// <summary>
/// CREATE LISTENING ROWS
/// </summary>
export async function CreateLRows(request: SaveListeningRowsRequest) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "CreateLRows",
        () => createLRowsCommandFactory(request),
        HttpStatusCode.Created,
        { expectedErrors: [ListeningOldSessionNotFound], silentErrors: [ListeningOldSessionNotFound] }
    )
}