"use server"

// IMPORTS
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { executeQuery } from "@/src/infrastructure/mediatR/ActionHelper"
import { ListeningCategoryWithDeckVideos } from "./Response"
import { getLCategoryCreateItemsQuery } from "./Queries/GetLCategoryCreateItems/QueryFactory"
import { NoLanguageFound, NoPracticeFound } from "@/src/exceptions/NotFound"

/// <summary>
/// GET LISTENING CATEGORY CREATE ITEMS
/// </summary>
export async function GetLCategoryCreateItems(userId: string, language: string, practice: string) : Promise<SerializedServiceResult<ListeningCategoryWithDeckVideos[]>> {

    return executeQuery<ListeningCategoryWithDeckVideos[]>(
        "GetLCategoryCreateItems",
        () => getLCategoryCreateItemsQuery(userId, language, practice),
        { expectedErrors: [NoLanguageFound, NoPracticeFound], silentErrors: [NoLanguageFound, NoPracticeFound] }
    )
}