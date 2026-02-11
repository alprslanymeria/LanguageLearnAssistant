"use server"

// IMPORTS
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { executeQuery } from "@/src/infrastructure/mediatR/ActionHelper"
import { LanguageDto } from "@/src/actions/Language/Response"
import { createGetLanguagesQuery } from "@/src/actions/Language/Queries/GetLanguages/QueryFactory"

/// <summary>
/// GET LANGUAGES
/// </summary>
export async function GetLanguages() : Promise<SerializedServiceResult<LanguageDto[]>> {

    return executeQuery<LanguageDto[]>(
        "GetLanguages",
        () => createGetLanguagesQuery()
    )
}