"use server"

import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { PracticeDto } from "@/src/actions/Practice/Response"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { getPracticesByLanguageQuery } from "@/src/actions/Practice/Queries/GetPracticesByLanguage/QueryFactory"
import { GetPracticesByLanguageQueryValidator } from "@/src/actions/Practice/Queries/GetPracticesByLanguage/QueryValidator"
import { NoLanguageFound } from "@/src/exceptions/NotFound"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function GetPracticesByLanguage(language: string) : Promise<SerializedServiceResult<PracticeDto[]>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetPracticesByLanguage: Fetching practices for language:", {language})

        // QUERY
        const query = getPracticesByLanguageQuery(language)

        // ZOD VALIDATION
        const validatedQuery = await GetPracticesByLanguageQueryValidator.parseAsync(query)

        // SEND QUERY TO BUS
        const practices = await queryBus.send(validatedQuery)

        return ServiceResult.success<PracticeDto[]>(practices as PracticeDto[]).toPlain()

    } catch (error) {

        return handleErrorSerialized<PracticeDto[]>({

            actionName: "GetPracticesByLanguage",
            logger,
            error,
            expectedErrors: [NoLanguageFound],
            silentErrors: [NoLanguageFound]
        })

    }
}