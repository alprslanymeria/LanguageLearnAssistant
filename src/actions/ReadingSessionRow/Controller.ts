"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { SaveReadingRowsRequest } from "@/src/actions/ReadingSessionRow/Request"
import { ReadingOldSessionNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { ReadingRowsResponse } from "@/src/actions/ReadingSessionRow/Response"
import { getRRowsByIdWithPagingQuery } from "@/src/actions/ReadingSessionRow/Queries/GetRRowsByIdWithPaging/QueryFactory"
import { createRRowsCommandFactory } from "@/src/actions/ReadingSessionRow/Commands/CreateRRows/CommandFactory"

/// <summary>
/// GET READING ROWS BY ID WITH PAGING
/// </summary>
export async function GetRRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<SerializedServiceResult<ReadingRowsResponse>> {

    return executeQuery<ReadingRowsResponse>(
        "GetRRowsByIdWithPaging",
        () => getRRowsByIdWithPagingQuery(oldSessionId, request),
        { expectedErrors: [ReadingOldSessionNotFound], silentErrors: [ReadingOldSessionNotFound] }
    )
}

/// <summary>
/// CREATE READING ROWS
/// </summary>
export async function CreateRRows(request: SaveReadingRowsRequest) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "CreateRRows",
        () => createRRowsCommandFactory(request),
        HttpStatusCode.Created,
        { expectedErrors: [ReadingOldSessionNotFound], silentErrors: [ReadingOldSessionNotFound] }
    )
}