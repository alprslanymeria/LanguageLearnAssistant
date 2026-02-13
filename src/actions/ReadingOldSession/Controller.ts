"use server"

// TYPES
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { SaveReadingOldSessionRequest } from "./Request"
import { ReadingOldSessionWithTotalCount } from "./Response"
// UTILS
import { backendFetch, backendFetchBase } from "@/src/infrastructure/common/backendFetch"


export async function GetROSWithPaging(language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<ReadingOldSessionWithTotalCount>>> {

    return await backendFetch<PagedResult<ReadingOldSessionWithTotalCount>>(`/api/v1/ReadingOldSession?language=${language}&page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET",
    })
}

export async function CreateROS(request: SaveReadingOldSessionRequest) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/ReadingOldSession`, {

        method: "POST",
        body: JSON.stringify(request)
    })
}