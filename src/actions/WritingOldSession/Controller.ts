"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { SaveWritingOldSessionRequest } from "@/src/actions/WritingOldSession/Request"
import { WritingBookNotFound, WritingNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { WritingOldSessionWithTotalCount } from "@/src/actions/WritingOldSession/Response"
import { getWOSWithPagingQuery } from "@/src/actions/WritingOldSession/Queries/GetWOSWithPaging/QueryFactory"
import { createWOSCommandFactory } from "@/src/actions/WritingOldSession/Commands/CreateWOS/CommandFactory"

/// <summary>
/// GET WRITING OLD SESSIONS WITH PAGING
/// </summary>
export async function GetWOSWithPaging(userId: string, language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<WritingOldSessionWithTotalCount>>> {

    return executeQuery<PagedResult<WritingOldSessionWithTotalCount>>(
        "GetWOSWithPaging",
        () => getWOSWithPagingQuery(userId, language, request)
    )
}

/// <summary>
/// CREATE WRITING OLD SESSION
/// </summary>
export async function CreateWOS(request: SaveWritingOldSessionRequest) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "CreateWOS",
        () => createWOSCommandFactory(request),
        HttpStatusCode.Created,
        { expectedErrors: [WritingNotFound, WritingBookNotFound], silentErrors: [WritingNotFound, WritingBookNotFound] }
    )
}