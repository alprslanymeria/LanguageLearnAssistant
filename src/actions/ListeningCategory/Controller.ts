"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { ListeningCategoryDto, ListeningCategoryWithDeckVideos } from "./Response"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { getLCategoryCreateItemsQuery } from "./Queries/GetLCategoryCreateItems/QueryFactory"
import { GetLCategoryCreateItemsQueryValidator } from "./Queries/GetLCategoryCreateItems/QueryValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { NoLanguageFound, NoPracticeFound } from "@/src/exceptions/NotFound"

export async function GetLCategoryCreateItems(userId: string, language: string, practice: string) : Promise<ServiceResult<ListeningCategoryWithDeckVideos[]>> {

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

        return ServiceResult.success<ListeningCategoryWithDeckVideos[]>(listeningCategories as ListeningCategoryWithDeckVideos[])
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            logger.error(`GetLCategoryCreateItems: Validation error - ${error.message}`)
            // SHOW TO USER
            return ServiceResult.failOne<ListeningCategoryWithDeckVideos[]>(error.message, HttpStatusCode.NotFound)
        }

        if(error instanceof NoLanguageFound) {

            logger.error(`GetLCategoryCreateItems: No language found error - ${error.message}`)
            return ServiceResult.failOne<ListeningCategoryWithDeckVideos[]>(error.message, HttpStatusCode.NotFound)
        }

        if(error instanceof NoPracticeFound) {

            logger.error(`GetLCategoryCreateItems: No practice found error - ${error.message}`)
            return ServiceResult.failOne<ListeningCategoryWithDeckVideos[]>(error.message, HttpStatusCode.NotFound)
        }

        logger.error(`GetLCategoryCreateItems: FAIL`, {error})
        return ServiceResult.failOne<ListeningCategoryWithDeckVideos[]>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}