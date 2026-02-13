"use server"

// TYPES
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { SaveFlashcardOldSessionRequest } from "./Request"
import { FlashcardOldSessionWithTotalCount } from "./Response"
// UTILS
import { backendFetch, backendFetchBase } from "@/src/infrastructure/common/backendFetch"


export async function GetFOSWithPaging(language: string, request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<FlashcardOldSessionWithTotalCount>>> {

    return await backendFetch<PagedResult<FlashcardOldSessionWithTotalCount>>(`/api/v1/FlashcardOldSession?language=${language}&page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET",
    })
}

export async function CreateFOS(request: SaveFlashcardOldSessionRequest) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/FlashcardOldSession`, {

        method: "POST",
        body: JSON.stringify(request)
    })
}