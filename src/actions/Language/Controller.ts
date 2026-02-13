"use server"

// TYPES
import { LanguageDto } from "@/src/actions/Language/Response"
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"
// UTILS
import { backendFetch } from "@/src/infrastructure/common/backendFetch"


export async function GetLanguages(): Promise<SerializedServiceResult<LanguageDto[]>> {

    return await backendFetch<LanguageDto[]>("/api/v1/Language")
}
