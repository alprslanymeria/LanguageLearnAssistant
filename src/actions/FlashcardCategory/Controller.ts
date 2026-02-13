"use server"

// TYPES
import { FlashcardCategoryWithDeckWords, FlashcardCategoryWithLanguageId, FlashcardCategoryWithLanguageIds, FlashcardCategoryWithTotalCount } from "./Response"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
// UTILS
import { backendFetch, backendFetchBase, backendFetchForm } from "@/src/infrastructure/common/backendFetch"


export async function GetFlashcardCategoryById(id: number) : Promise<SerializedServiceResult<FlashcardCategoryWithLanguageId>> {

    return await backendFetch<FlashcardCategoryWithLanguageId>(`/api/v1/FlashcardCategory/${id}`, {

        method: "GET"
    })
}

export async function GetAllFCategoriesWithPaging(request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<FlashcardCategoryWithTotalCount>>> {

    return await backendFetch<PagedResult<FlashcardCategoryWithTotalCount>>(`/api/v1/FlashcardCategory?page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET"
    })
}

export async function GetFCategoryCreateItems(language: string, practice: string) : Promise<SerializedServiceResult<FlashcardCategoryWithDeckWords[]>> {

    return await backendFetch<FlashcardCategoryWithDeckWords[]>(`/api/v1/FlashcardCategory/create-items?language=${language}&practice=${practice}`, {

        method: "GET"
    })
}

export async function GetAllFCategories() : Promise<SerializedServiceResult<FlashcardCategoryWithLanguageIds>> {

    return await backendFetch<FlashcardCategoryWithLanguageIds>(`/api/v1/FlashcardCategory/all`, {

        method: "GET"
    })
}

export async function CreateFlashcardCategory(formData: FormData) : Promise<SerializedServiceResultBase> {

    return await backendFetchForm(`/api/v1/FlashcardCategory`, {

        method: "POST",
        body: formData
    })
}

export async function UpdateFlashcardCategory(formData: FormData) : Promise<SerializedServiceResultBase> {

    return await backendFetchForm(`/api/v1/FlashcardCategory`, {

        method: "PUT",
        body: formData
    })
}

export async function DeleteFCategoryItemById(id: number) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/FlashcardCategory/${id}`, {

        method: "DELETE"
    })
}