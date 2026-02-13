"use server"

// TYPES
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { TranslateTextRequest } from "./Request"
import { TranslateTextResponse } from "./Response"
// UTILS
import { backendFetch } from "@/src/infrastructure/common/backendFetch"

export async function TranslateText(request: TranslateTextRequest) : Promise<SerializedServiceResult<TranslateTextResponse>> {

    return await backendFetch<TranslateTextResponse>("/api/v1/Translate", {

        method: "POST",
        body: JSON.stringify(request),
    })
}