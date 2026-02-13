"use server"

// TYPES
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { SaveWritingRowsRequest } from "./Request"
import { WritingRowsResponse } from "./Response"
// UTILS
import { backendFetch, backendFetchBase } from "@/src/infrastructure/common/backendFetch"


export async function GetWRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<SerializedServiceResult<WritingRowsResponse>> {

    return await backendFetch<WritingRowsResponse>(`/api/v1/WritingSessionRow/${oldSessionId}?page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET",
    })
}

export async function CreateWRows(request: SaveWritingRowsRequest) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/WritingSessionRow`, {

        method: "POST",
        body: JSON.stringify(request)
    })
}