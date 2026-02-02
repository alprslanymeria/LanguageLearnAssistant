"use server"

import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { TranslateTextRequest } from "@/src/actions/Translation/Request"
import { TranslateTextResponse } from "@/src/actions/Translation/Response"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { translateTextQuery } from "@/src/actions/Translation/Queries/TranslateText/QueryFactory"
import { TranslateTextQueryValidator } from "@/src/actions/Translation/Queries/TranslateText/QueryValidator"
import { InvalidPracticeType, UncertainTargetLanguage } from "@/src/exceptions/invalid"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function TranslateText(userId: string, request: TranslateTextRequest) : Promise<SerializedServiceResult<TranslateTextResponse>> {

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

        return ServiceResult.success<TranslateTextResponse>(translationResponse as TranslateTextResponse).toPlain()

    } catch (error) {
        
        return handleErrorSerialized<TranslateTextResponse>({

            actionName: "TranslateText",
            logger,
            error,
            expectedErrors: [InvalidPracticeType, UncertainTargetLanguage]
        })
    }

}