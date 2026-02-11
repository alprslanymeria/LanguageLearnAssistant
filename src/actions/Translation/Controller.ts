"use server"

// IMPORTS
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { executeQuery } from "@/src/infrastructure/mediatR/ActionHelper"
import { TranslateTextRequest } from "@/src/actions/Translation/Request"
import { TranslateTextResponse } from "@/src/actions/Translation/Response"
import { translateTextQuery } from "@/src/actions/Translation/Queries/TranslateText/QueryFactory"
import { InvalidPracticeType, UncertainTargetLanguage } from "@/src/exceptions/invalid"

/// <summary>
/// TRANSLATE TEXT
/// </summary>
export async function TranslateText(userId: string, request: TranslateTextRequest) : Promise<SerializedServiceResult<TranslateTextResponse>> {

    return executeQuery<TranslateTextResponse>(
        "TranslateText",
        () => translateTextQuery(userId, request),
        { expectedErrors: [InvalidPracticeType, UncertainTargetLanguage] }
    )
}