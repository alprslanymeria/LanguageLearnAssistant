"use server"

import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { ListeningCategoryWithDeckVideos } from "./Response"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { getLCategoryCreateItemsQuery } from "./Queries/GetLCategoryCreateItems/QueryFactory"
import { GetLCategoryCreateItemsQueryValidator } from "./Queries/GetLCategoryCreateItems/QueryValidator"
import { NoLanguageFound, NoPracticeFound } from "@/src/exceptions/NotFound"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function GetLCategoryCreateItems(userId: string, language: string, practice: string) : Promise<SerializedServiceResult<ListeningCategoryWithDeckVideos[]>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info(`GetLCategoryCreateItems: Fetching listening categories for creating listening items for user ${userId}`)

        // QUERY
        const query = getLCategoryCreateItemsQuery(userId, language, practice)

        // ZOD VALIDATION
        const validatedQuery = await GetLCategoryCreateItemsQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const listeningCategories = await queryBus.send(validatedQuery)

        return ServiceResult.success<ListeningCategoryWithDeckVideos[]>(listeningCategories as ListeningCategoryWithDeckVideos[]).toPlain()
        
    } catch (error) {
        
        return handleErrorSerialized<ListeningCategoryWithDeckVideos[]>({
            actionName: "GetLCategoryCreateItems",
            logger,
            error,
            expectedErrors: [NoLanguageFound, NoPracticeFound],
            silentErrors: [NoLanguageFound, NoPracticeFound]    
        })
    }
}