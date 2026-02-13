"use server"

// TYPES
import { WritingBookDto, WritingBookWithLanguageId, WritingBookWithTotalCount } from "./Response"
import { PagedRequest } from "@/src/infrastructure/common/pagedRequest"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
// UTILS
import { backendFetch, backendFetchBase, backendFetchForm } from "@/src/infrastructure/common/backendFetch"


export async function GetWritingBookById(id: number) : Promise<SerializedServiceResult<WritingBookWithLanguageId>> {

    return await backendFetch<WritingBookWithLanguageId>(`/api/v1/WritingBook/${id}`, {

        method: "GET"
    })
}

export async function GetAllWBooksWithPaging(request: PagedRequest) : Promise<SerializedServiceResult<PagedResult<WritingBookWithTotalCount>>> {

    return await backendFetch<PagedResult<WritingBookWithTotalCount>>(`/api/v1/WritingBook?page=${request.page}&pageSize=${request.pageSize}`, {

        method: "GET"
    })
}

export async function GetWBookCreateItems(language: string, practice: string) : Promise<SerializedServiceResult<WritingBookDto[]>> {

    return await backendFetch<WritingBookDto[]>(`/api/v1/WritingBook/create-items?language=${language}&practice=${practice}`, {

        method: "GET"
    })
}

export async function CreateWritingBook(formData: FormData) : Promise<SerializedServiceResultBase> {

    return await backendFetchForm(`/api/v1/WritingBook`, {

        method: "POST",
        body: formData
    })
}

export async function UpdateWritingBook(formData: FormData) : Promise<SerializedServiceResultBase> {

    return await backendFetchForm(`/api/v1/WritingBook`, {

        method: "PUT",
        body: formData
    })
}

export async function DeleteWBookItemById(id: number) : Promise<SerializedServiceResultBase> {

    return await backendFetchBase(`/api/v1/WritingBook/${id}`, {

        method: "DELETE"
    })
}