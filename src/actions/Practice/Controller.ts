"use server"

// TYPES
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { PracticeDto } from "./Response"
// UTILS
import { backendFetch } from "@/src/infrastructure/common/backendFetch"


export async function GetPracticesByLanguage(language: string) : Promise<SerializedServiceResult<PracticeDto[]>> {

    return await backendFetch<PracticeDto[]>(`/api/v1/Practice?language=${language}`, {

        method: "GET"
    })
}