"use server"

// TYPES
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { SaveWritingOldSessionRequest } from "./Request"
import { WritingOldSessionWithTotalCount } from "./Response"
// UTILS
import { backendFetch, backendFetchBase } from "@/src/infrastructure/common/backendFetch"


export async function GetWOSWithPaging(language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<WritingOldSessionWithTotalCount>>> {

    return await backendFetch<PagedResult<WritingOldSessionWithTotalCount>>(`/api/v1/WritingOldSession?language=${language}&page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET",
    })
}

export async function CreateWOS(request: SaveWritingOldSessionRequest) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/WritingOldSession`, {

        method: "POST",
        body: JSON.stringify(request)
    })
}