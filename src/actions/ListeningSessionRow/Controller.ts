"use server"

// TYPES
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { SaveListeningRowsRequest } from "./Request"
import { ListeningRowsResponse } from "./Response"
// UTILS
import { backendFetch, backendFetchBase } from "@/src/infrastructure/common/backendFetch"


export async function GetLRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<SerializedServiceResult<ListeningRowsResponse>> {

    return await backendFetch<ListeningRowsResponse>(`/api/v1/ListeningSessionRow/${oldSessionId}?page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET",
    })
}

export async function CreateLRows(request: SaveListeningRowsRequest) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/ListeningSessionRow`, {

        method: "POST",
        body: JSON.stringify(request)
    })
}