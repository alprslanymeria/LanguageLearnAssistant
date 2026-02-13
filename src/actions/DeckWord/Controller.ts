"use server"

// TYPES
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { DeckWordWithLanguageId, DeckWordWithTotalCount } from "./Response"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
// UTILS
import { backendFetch, backendFetchBase, backendFetchForm } from "@/src/infrastructure/common/backendFetch"


export async function GetDeckWordById(id: number) : Promise<SerializedServiceResult<DeckWordWithLanguageId>> {

    return await backendFetch<DeckWordWithLanguageId>(`/api/v1/DeckWord/${id}`, {

        method: "GET"
    })
}

export async function GetAllDWordsWithPaging(request: PagedRequest): Promise<SerializedServiceResult<PagedResult<DeckWordWithTotalCount>>> {

    return await backendFetch<PagedResult<DeckWordWithTotalCount>>(`/api/v1/DeckWord?page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET"
    })
}

export async function CreateDeckWord(formData: FormData) : Promise<SerializedServiceResultBase> {

    return await backendFetchForm(`/api/v1/DeckWord`, {

        method: "POST",
        body: formData
    })
}

export async function UpdateDeckWord(formData: FormData) : Promise<SerializedServiceResultBase> {

    return await backendFetchForm(`/api/v1/DeckWord`, {

        method: "PUT",
        body: formData
    })
}

export async function DeleteDWordItemById(id: number) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/DeckWord/${id}`, {

        method: "DELETE"
    })
}