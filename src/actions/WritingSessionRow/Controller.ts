"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { SaveWritingRowsRequest } from "@/src/actions/WritingSessionRow/Request"
import { WritingOldSessionNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { WritingRowsResponse } from "@/src/actions/WritingSessionRow/Response"
import { getWRowsByIdWithPagingQuery } from "@/src/actions/WritingSessionRow/Queries/GetWRowsByIdWithPaging/QueryFactory"
import { createWRowsCommandFactory } from "@/src/actions/WritingSessionRow/Commands/CreateWRows/CommandFactory"

/// <summary>
/// GET WRITING ROWS BY ID WITH PAGING
/// </summary>
export async function GetWRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<SerializedServiceResult<WritingRowsResponse>> {

    return executeQuery<WritingRowsResponse>(
        "GetWRowsByIdWithPaging",
        () => getWRowsByIdWithPagingQuery(oldSessionId, request),
        { expectedErrors: [WritingOldSessionNotFound], silentErrors: [WritingOldSessionNotFound] }
    )
}

/// <summary>
/// CREATE WRITING ROWS
/// </summary>
export async function CreateWRows(request: SaveWritingRowsRequest) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "CreateWRows",
        () => createWRowsCommandFactory(request),
        HttpStatusCode.Created,
        { expectedErrors: [WritingOldSessionNotFound], silentErrors: [WritingOldSessionNotFound] }
    )
}