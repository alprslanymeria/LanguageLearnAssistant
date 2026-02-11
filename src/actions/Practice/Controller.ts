"use server"

// IMPORTS
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { executeQuery } from "@/src/infrastructure/mediatR/ActionHelper"
import { PracticeDto } from "@/src/actions/Practice/Response"
import { getPracticesByLanguageQuery } from "@/src/actions/Practice/Queries/GetPracticesByLanguage/QueryFactory"
import { NoLanguageFound } from "@/src/exceptions/NotFound"

/// <summary>
/// GET PRACTICES BY LANGUAGE
/// </summary>
export async function GetPracticesByLanguage(language: string) : Promise<SerializedServiceResult<PracticeDto[]>> {

    return executeQuery<PracticeDto[]>(
        "GetPracticesByLanguage",
        () => getPracticesByLanguageQuery(language),
        { expectedErrors: [NoLanguageFound], silentErrors: [NoLanguageFound] }
    )
}