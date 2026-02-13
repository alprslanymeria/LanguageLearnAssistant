"use server"

// TYPES
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { SaveListeningOldSessionRequest } from "./Request"
import { ListeningOldSessionWithTotalCount } from "./Response"
// UTILS
import { backendFetch, backendFetchBase } from "@/src/infrastructure/common/backendFetch"


export async function GetLOSWithPaging(language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<ListeningOldSessionWithTotalCount>>> {

    return await backendFetch<PagedResult<ListeningOldSessionWithTotalCount>>(`/api/v1/ListeningOldSession?language=${language}&page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET",
    })
}

export async function CreateLOS(request: SaveListeningOldSessionRequest) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/ListeningOldSession`, {

        method: "POST",
        body: JSON.stringify(request)
    })
}