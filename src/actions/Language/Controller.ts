// IMPORTS
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { createGetLanguagesQuery } from "@/src/actions/Language/Queries/GetLanguages/QueryFactory"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { ServiceResult, ServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { LanguageDto } from "@/src/actions/Language/Response"
import { NoLanguageFound } from "@/src/exceptions/NotFound"

export async function GetLanguages() : Promise<ServiceResult<LanguageDto[]>> {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const queryBus = container.get<QueryBus>(TYPES.QueryBus)

    try {

        // LOG INFO
        logger.info("GetLanguages: Request received")

        // QUERY
        const query = createGetLanguagesQuery()

        // SEND QUERY TO BUS
        const languages = await queryBus.send<LanguageDto[]>(query)

        return ServiceResult.success<LanguageDto[]>(languages)        

    } catch (error) {

        if(error instanceof NoLanguageFound) {

            logger.error("GetLanguages: NO LANGUAGE FOUND", {error})
            // SHOW TO USER
            return ServiceResultBase.failOne(error.message, HttpStatusCode.NotFound)
        }

        logger.error("GetLanguages: FAIL", {error})
        return ServiceResultBase.failOne("SERVER ERROR!", HttpStatusCode.InternalServerError)
    }
}