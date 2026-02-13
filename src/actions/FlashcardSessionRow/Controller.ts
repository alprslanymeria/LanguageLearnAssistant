"use server"

// TYPES
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { SaveFlashcardRowsRequest } from "./Request"
import { FlashcardRowsResponse } from "./Response"
// UTILS
import { backendFetch, backendFetchBase } from "@/src/infrastructure/common/backendFetch"


export async function GetFRowsByIdWithPaging(oldSessionId: string, request: PagedRequest) : Promise<SerializedServiceResult<FlashcardRowsResponse>> {

    return await backendFetch<FlashcardRowsResponse>(`/api/v1/FlashcardSessionRow/${oldSessionId}?page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET",
    })
}

export async function CreateFRows(request: SaveFlashcardRowsRequest) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/FlashcardSessionRow`, {

        method: "POST",
        body: JSON.stringify(request)
    })
}