"use server"

// TYPES
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { SaveReadingRowsRequest } from "./Request"
import { ReadingRowsResponse } from "./Response"
// UTILS
import { backendFetch, backendFetchBase } from "@/src/infrastructure/common/backendFetch"


export async function GetRRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<SerializedServiceResult<ReadingRowsResponse>> {

    return await backendFetch<ReadingRowsResponse>(`/api/v1/ReadingSessionRow/${oldSessionId}?page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET",
    })
}

export async function CreateRRows(request: SaveReadingRowsRequest) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/ReadingSessionRow`, {

        method: "POST",
        body: JSON.stringify(request)
    })
}