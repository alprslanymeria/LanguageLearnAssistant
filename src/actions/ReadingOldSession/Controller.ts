"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { SaveReadingOldSessionRequest } from "@/src/actions/ReadingOldSession/Request"
import { ReadingBookNotFound, ReadingNotFound } from "@/src/exceptions/NotFound"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { ReadingOldSessionWithTotalCount } from "@/src/actions/ReadingOldSession/Response"
import { getROSWithPagingQuery } from "@/src/actions/ReadingOldSession/Queries/GetROSWithPaging/QueryFactory"
import { createROSCommandFactory } from "@/src/actions/ReadingOldSession/Commands/CreateROS/CommandFactory"

/// <summary>
/// GET READING OLD SESSIONS WITH PAGING
/// </summary>
export async function GetROSWithPaging(userId: string, language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<ReadingOldSessionWithTotalCount>>> {

    return executeQuery<PagedResult<ReadingOldSessionWithTotalCount>>(
        "GetROSWithPaging",
        () => getROSWithPagingQuery(userId, language, request)
    )
}

/// <summary>
/// CREATE READING OLD SESSION
/// </summary>
export async function CreateROS(request: SaveReadingOldSessionRequest) : Promise<SerializedServiceResultBase> {

    return executeCommand(
        "CreateROS",
        () => createROSCommandFactory(request),
        HttpStatusCode.Created,
        { expectedErrors: [ReadingNotFound, ReadingBookNotFound], silentErrors: [ReadingNotFound, ReadingBookNotFound] }
    )
}