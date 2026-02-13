"use server"

// TYPES
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { ListeningCategoryWithDeckVideos } from "./Response"
// UTILS
import { backendFetch } from "@/src/infrastructure/common/backendFetch"


export async function GetLCategoryCreateItems(language: string, practice: string) : Promise<SerializedServiceResult<ListeningCategoryWithDeckVideos[]>> {

    return await backendFetch<ListeningCategoryWithDeckVideos[]>(`/api/v1/ListeningCategory/create-items?language=${language}&practice=${practice}`, {

        method: "GET"
    })
}