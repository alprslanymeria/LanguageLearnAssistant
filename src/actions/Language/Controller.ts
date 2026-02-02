"use server"

// IMPORTS
import container from "@/src/di/container"
import { TYPES } from "@/src/di/type"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { createGetLanguagesQuery } from "@/src/actions/Language/Queries/GetLanguages/QueryFactory"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { SerializedServiceResult, ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { LanguageDto } from "@/src/actions/Language/Response"
import { handleErrorSerialized } from "@/src/infrastructure/common/ErrorHandler"

export async function GetLanguages() : Promise<SerializedServiceResult<LanguageDto[]>> {

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

        return ServiceResult.success<LanguageDto[]>(languages).toPlain()       

    } catch (error) {

        return handleErrorSerialized<LanguageDto[]>({
            actionName: "GetLanguages",
            logger,
            error
        })
    }
}