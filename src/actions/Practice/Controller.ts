"use server"

import { ZodError } from "zod"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { PracticeDto } from "@/src/actions/Practice/Response"
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { getPracticesByLanguageQuery } from "@/src/actions/Practice/Queries/GetPracticesByLanguage/QueryFactory"
import { GetPracticesByLanguageQueryValidator } from "@/src/actions/Practice/Queries/GetPracticesByLanguage/QueryValidator"
import { NoLanguageFound } from "@/src/exceptions/NotFound"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"

export async function GetPracticesByLanguage(language: string) : Promise<ServiceResult<PracticeDto[]>> {

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

        return ServiceResult.success<PracticeDto[]>(practices as PracticeDto[])

    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("GetPracticesByLanguage: INVALID QUERY DATA!", {firstError})
            // SHOW TO USER
            return ServiceResult.failOne<PracticeDto[]>(firstError, HttpStatusCode.BadRequest)
        }

        if(error instanceof NoLanguageFound) {

            logger.error("GetPracticesByLanguage: No language found!", {error})
            return ServiceResult.failOne<PracticeDto[]>("No language found!", HttpStatusCode.NotFound)
        }

        logger.error("GetPracticesByLanguage: FAIL", {error})
        return ServiceResult.failOne<PracticeDto[]>("SERVER ERROR!" , HttpStatusCode.InternalServerError)
        
    }
}