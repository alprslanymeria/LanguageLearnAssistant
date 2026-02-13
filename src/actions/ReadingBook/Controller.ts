"use server"

// TYPES
import { ReadingBookDto, ReadingBookWithLanguageId, ReadingBookWithTotalCount } from "./Response"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
// UTILS
import { backendFetch, backendFetchBase, backendFetchForm } from "@/src/infrastructure/common/backendFetch"


export async function GetReadingBookById(id: number) : Promise<SerializedServiceResult<ReadingBookWithLanguageId>> {

    return await backendFetch<ReadingBookWithLanguageId>(`/api/v1/ReadingBook/${id}`, {

        method: "GET"
    })
}

export async function GetAllRBooksWithPaging(request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<ReadingBookWithTotalCount>>> {

    return await backendFetch<PagedResult<ReadingBookWithTotalCount>>(`/api/v1/ReadingBook?page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET"
    })
}

export async function GetRBookCreateItems(language: string, practice: string) : Promise<SerializedServiceResult<ReadingBookDto[]>> {

    return await backendFetch<ReadingBookDto[]>(`/api/v1/ReadingBook/create-items?language=${language}&practice=${practice}`, {

        method: "GET"
    })
}

export async function CreateReadingBook(formData: FormData) : Promise<SerializedServiceResultBase> {

    return await backendFetchForm(`/api/v1/ReadingBook`, {

        method: "POST",
        body: formData
    })
}

export async function UpdateReadingBook(formData: FormData) : Promise<SerializedServiceResultBase> {

    return await backendFetchForm(`/api/v1/ReadingBook`, {

        method: "PUT",
        body: formData
    })
}

export async function DeleteRBookItemById(id: number) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/ReadingBook/${id}`, {

        method: "DELETE"
    })
}