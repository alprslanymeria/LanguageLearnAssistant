"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { CompareLanguageIdRequest } from "@/src/actions/User/Request"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { compareLanguageIdQuery } from "@/src/actions/User/Queries/CompareLanguageId/QueryFactory"
import { CompareLanguageIdQueryValidator } from "@/src/actions/User/Queries/CompareLanguageId/QueryValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { UserNotFound } from "@/src/exceptions/NotFound"

export async function CompareLanguageId(request: CompareLanguageIdRequest) : Promise<ServiceResult<boolean>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus) 

    try {

        // LOG INFO
        logger.info(`CompareLanguageId: Comparing language ID ${request.languageId} for User ID ${request.userId}`)

        // QUERY
        const query = compareLanguageIdQuery(request)

        // ZOD VALIDATION
        const validatedQuery = await CompareLanguageIdQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const result = await queryBus.send(validatedQuery)

        return ServiceResult.success<boolean>(result as boolean)
        
    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("CompareLanguageId: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<boolean>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof UserNotFound) {

            logger.error(`CompareLanguageId: User not found!`, {userId: request.userId})
            return ServiceResult.failOne<boolean>("USER NOT FOUND", HttpStatusCode.NotFound)
        }

        logger.error("CompareLanguageId: INTERNAL SERVER ERROR!", {error})
        return ServiceResult.failOne<boolean>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}