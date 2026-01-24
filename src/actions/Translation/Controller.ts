"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { TranslateTextRequest } from "@/src/actions/Translation/Request"
import { TranslateTextResponse } from "@/src/actions/Translation/Response"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { translateTextQuery } from "@/src/actions/Translation/Queries/TranslateText/QueryFactory"
import { TranslateTextQueryValidator } from "@/src/actions/Translation/Queries/TranslateText/QueryValidator"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { InvalidPracticeType, UncertainTargetLanguage } from "@/src/exceptions/invalid"

export async function TranslateTextQuery(userId: string, request: TranslateTextRequest) : Promise<ServiceResult<TranslateTextResponse>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)
    
    try {

        // LOG INFO
        logger.info("TranslateText: TranslateTextRequest data:", {request})

        // QUERY
        const query = translateTextQuery(userId, request)

        // ZOD VALIDATION
        const validatedQuery = await TranslateTextQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const translationResponse = await queryBus.send(validatedQuery)

        return ServiceResult.success<TranslateTextResponse>(translationResponse as TranslateTextResponse)

    } catch (error) {
        
        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("TranslateText: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<TranslateTextResponse>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof InvalidPracticeType) {

            logger.error("TranslateText: INVALID PRACTICE TYPE!", {error})
            return ServiceResult.failOne<TranslateTextResponse>(error.message, HttpStatusCode.BadRequest)
        }

        if(error instanceof UncertainTargetLanguage) {

            logger.error("TranslateText: UNCERTAIN TARGET LANGUAGE!", {error})
            return ServiceResult.failOne<TranslateTextResponse>(error.message, HttpStatusCode.BadRequest)
        }

        logger.error("TranslateText: FAIL", {error})
        return ServiceResult.failOne<TranslateTextResponse>("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }

}